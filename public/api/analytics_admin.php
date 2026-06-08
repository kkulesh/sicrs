<?php
// /public/api/analytics_admin.php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}

// Use same db_config pattern as other endpoints
if (file_exists(__DIR__ . '/db_config.php')) {
    require_once __DIR__ . '/db_config.php';
} else {
    $dbHost = getenv('DB_HOST') ?: 'db';
    $dbName = getenv('DB_NAME') ?: 'sicrs';
    $dbUser = getenv('DB_USER') ?: 'user';
    $dbPass = getenv('DB_PASSWORD') ?: 'password';
    $adminPassword = getenv('ADMIN_PASSWORD') ?: 'localdev';
}

// Simple brute-force protection similar to other admin endpoints
if (!isset($_SESSION['login_attempts'])) {
    $_SESSION['login_attempts'] = 0;
    $_SESSION['first_attempt_time'] = time();
}

if (time() - $_SESSION['first_attempt_time'] > 300) {
    $_SESSION['login_attempts'] = 0;
    $_SESSION['first_attempt_time'] = time();
}

$providedToken = $_SERVER['HTTP_X_ADMIN_TOKEN'] ?? '';

if ($_SESSION['login_attempts'] >= 3) {
    http_response_code(429);
    echo json_encode(["success" => false, "error" => "Too many failed attempts. Try again later."]);
    exit;
}

if (empty($adminPassword) || $providedToken !== $adminPassword) {
    $_SESSION['login_attempts']++;
    http_response_code(401);
    echo json_encode(["success" => false, "error" => "Unauthorized"]);
    exit;
}

// Successful auth
$_SESSION['login_attempts'] = 0;

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $limit = isset($_GET['limit']) ? (int)$_GET['limit'] : 100;
    $offset = isset($_GET['offset']) ? (int)$_GET['offset'] : 0;
    $eventFilter = isset($_GET['event']) ? trim($_GET['event']) : '';

    if ($eventFilter !== '') {
        $stmt = $pdo->prepare("SELECT * FROM analytics WHERE event = :event ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
        $stmt->bindValue(':event', $eventFilter, PDO::PARAM_STR);
    } else {
        $stmt = $pdo->prepare("SELECT * FROM analytics ORDER BY created_at DESC LIMIT :limit OFFSET :offset");
    }

    $stmt->bindValue(':limit', $limit, PDO::PARAM_INT);
    $stmt->bindValue(':offset', $offset, PDO::PARAM_INT);
    $stmt->execute();
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "data" => $rows]);
} catch (PDOException $e) {
    error_log("Analytics Admin DB Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database connection error"]);
}

?>
