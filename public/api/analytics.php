<?php
// /public/api/analytics.php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

$json = file_get_contents('php://input');
$data = json_decode($json, true);

if (!$data || !isset($data['event'])) {
    http_response_code(400);
    echo json_encode(["error" => "Invalid payload"]);
    exit;
}

$event = $data['event'];
$payload = $data['data'] ?? [];
$url = $data['url'] ?? '';
$timestamp = $data['timestamp'] ?? '';
$visitorId = $data['visitorId'] ?? null;

// DB config fallback to environment (same pattern used in other endpoints)
if (file_exists(__DIR__ . '/db_config.php')) {
    require_once __DIR__ . '/db_config.php';
} else {
    $dbHost = getenv('DB_HOST') ?: 'db';
    $dbName = getenv('DB_NAME') ?: 'sicrs';
    $dbUser = getenv('DB_USER') ?: 'user';
    $dbPass = getenv('DB_PASSWORD') ?: 'password';
}

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->prepare("INSERT INTO analytics (event, data, url, timestamp, visitor_id) VALUES (:event, :data, :url, :timestamp, :visitor_id)");
    $stmt->execute([
        ':event' => $event,
        ':data' => json_encode($payload, JSON_UNESCAPED_UNICODE),
        ':url' => $url,
        ':timestamp' => $timestamp,
        ':visitor_id' => $visitorId,
    ]);

    http_response_code(201);
    echo json_encode(["success" => true, "id" => $pdo->lastInsertId()]);
} catch (PDOException $e) {
    error_log("Analytics DB Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["error" => "Database error"]);
}

?>
