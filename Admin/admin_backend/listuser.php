<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: http://localhost:8081");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Access-Control-Allow-Credentials: true");

include 'db.php';

$conn = connectDB();

$sql = "SELECT user_id, email, username, password FROM users";
$result = $conn->query($sql);

$users = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $users[] = $row;
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No users found']);
    exit;
}

$conn->close();

echo json_encode(['success' => true, 'users' => $users]);
?>
