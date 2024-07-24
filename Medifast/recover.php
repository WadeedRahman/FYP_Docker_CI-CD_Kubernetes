<?php
session_start(); // Start the session
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once('database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['username']) && isset($data['email']) && isset($data['new_password']) && isset($data['confirm_password'])) {
        $username = $data['username'];
        $email = $data['email'];
        $newPassword = $data['new_password'];
        $confirmPassword = $data['confirm_password'];

        // Check if new password matches confirm password
        if ($newPassword !== $confirmPassword) {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'New password and confirm password do not match.']);
            exit;
        }

        $conn = connectDB();

        // Check if the username and email match with the users table
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE username = ? AND email = ?");
        $stmt->bind_param("ss", $username, $email);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            // Username and email match, update the password
            $hashedPassword = password_hash($newPassword, PASSWORD_DEFAULT); // Hash the new password

            $updateStmt = $conn->prepare("UPDATE users SET password = ? WHERE username = ?");
            $updateStmt->bind_param("ss", $hashedPassword, $username);
            $updateStmt->execute();

            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'message' => 'Password updated successfully.']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Username and/or email do not match.']);
        }
        $stmt->close();
        $conn->close();
    }
} else {
    echo "Nothing Posted";
}
?>
