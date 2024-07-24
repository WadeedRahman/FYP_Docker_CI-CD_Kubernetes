<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    http_response_code(204);
    exit;
}

include 'db.php'; // Include your database connection file

$data = json_decode(file_get_contents('php://input'), true);

$usernameOrEmail = $data['username'];
$password = $data['password'];

$conn = connectDB(); // Assuming you have a connectDB function in db.php

if ($conn === false) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

$sql = "SELECT * FROM adminlogin WHERE adminname = ? OR email = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'error' => 'SQL prepare failed: ' . $conn->error]);
    exit;
}

$stmt->bind_param("ss", $usernameOrEmail, $usernameOrEmail);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    $storedHash = $user['password'];
    if (password_verify($password, $storedHash)) {
        // Password matches
        echo json_encode(['success' => true]);
    } else {
        // Invalid password
        echo json_encode(['success' => false, 'error' => 'Invalid password.']);
    }
} else {
    // No user found with that username or email
    echo json_encode(['success' => false, 'error' => 'No user found with that username or email.']);
}

$stmt->close();
$conn->close();
?>
