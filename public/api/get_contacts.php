<?php
session_start();
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");

if (file_exists(__DIR__ . '/db_config.php')) {
    require_once __DIR__ . '/db_config.php';
} else {
    $dbHost = getenv('DB_HOST') ?: 'db'; 
    $dbName = getenv('DB_NAME') ?: 'sicrs';
    $dbUser = getenv('DB_USER') ?: 'user';
    $dbPass = getenv('DB_PASSWORD') ?: 'password';
    $adminPassword = getenv('ADMIN_PASSWORD') ?: 'localdev';
}

// Лімітування: 3 спроби на 5 хвилин
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
    echo json_encode(["success" => false, "error" => "Забагато невдалих спроб. Зачекайте 5 хвилин."]);
    exit;
}

// Перевірка пароля адміна
if (empty($adminPassword) || $providedToken !== $adminPassword) {
    $_SESSION['login_attempts']++;
    http_response_code(401);
    echo json_encode(["success" => false, "error" => "Unauthorized"]);
    exit;
}

// Успішний вхід - скидаємо лічильник
$_SESSION['login_attempts'] = 0;

try {
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $stmt = $pdo->query("SELECT * FROM contacts ORDER BY created_at DESC");
    $contacts = $stmt->fetchAll(PDO::FETCH_ASSOC);

    echo json_encode(["success" => true, "data" => $contacts]);
} catch (PDOException $e) {
    error_log("DB Error: " . $e->getMessage());
    http_response_code(500);
    echo json_encode(["success" => false, "error" => "Database connection error"]);
}
