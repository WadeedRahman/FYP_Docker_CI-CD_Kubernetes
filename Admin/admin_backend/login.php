<?php
header('Content-Type: application/json');

include 'db.php'; // Include your database connection file

$data = json_decode(file_get_contents('php://input'), true);

$adminname = $data['username']; // Changed to 'username' to match the frontend
$password = $data['password'];

$conn = connectDB(); // Assuming you have a connectDB function in db.php

if ($conn === false) {
    echo json_encode(['success' => false, 'error' => 'Database connection failed']);
    exit;
}

$sql = "SELECT * FROM adminlogin WHERE adminname = ?";
$stmt = $conn->prepare($sql);

if ($stmt === false) {
    echo json_encode(['success' => false, 'error' => 'SQL prepare failed']);
    exit;
}

$stmt->bind_param("s", $adminname);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    $user = $result->fetch_assoc();
    if (password_verify($password, $user['password'])) {
        // Password matches
        echo json_encode(['success' => true]);
    } else {
        // Invalid password
        echo json_encode(['success' => false, 'error' => 'Invalid username or password.']);
    }
} else {
    // No user found with that username
    echo json_encode(['success' => false, 'error' => 'Invalid username or password.']);
}

$stmt->close();
$conn->close();
?>
