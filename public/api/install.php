<?php
// Одноразовий скрипт для встановлення бази даних на продакшн сервері

if (file_exists(__DIR__ . '/db_config.php')) {
    require_once __DIR__ . '/db_config.php';
} else {
    $dbHost = getenv('DB_HOST') ?: 'db'; 
    $dbName = getenv('DB_NAME') ?: 'sicrs';
    $dbUser = getenv('DB_USER') ?: 'user';
    $dbPass = getenv('DB_PASSWORD') ?: 'password';
}

try {
    // Підключення до бази
    $pdo = new PDO("mysql:host=$dbHost;dbname=$dbName;charset=utf8mb4", $dbUser, $dbPass);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Створення таблиці
    $sql = "CREATE TABLE IF NOT EXISTS contacts (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(255) NOT NULL,
      email VARCHAR(255) NOT NULL,
      phone VARCHAR(50),
      message TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    );";

    $pdo->exec($sql);
    
    echo "<div style='font-family: sans-serif; padding: 20px;'>";
    echo "<h2 style='color: green;'>✅ Таблиця 'contacts' успішно створена!</h2>";
    echo "<p>База даних готова до роботи з формою зворотного зв'язку.</p>";
    echo "<h3 style='color: red;'>⚠️ КРИТИЧНО ВАЖЛИВО:</h3>";
    echo "<p>Тепер зайдіть на FTP і <b>видаліть файл <code>install.php</code></b> з сервера, щоб ніхто інший не міг його запустити.</p>";
    echo "</div>";

} catch (PDOException $e) {
    echo "<div style='font-family: sans-serif; padding: 20px; color: red;'>";
    echo "<h2>❌ Помилка підключення або виконання:</h2>";
    echo "<p>" . htmlspecialchars($e->getMessage()) . "</p>";
    echo "</div>";
}
