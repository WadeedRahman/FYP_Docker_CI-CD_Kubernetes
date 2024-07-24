<?php
session_start(); // Start the session
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once('database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['username']) && isset($data['password'])) {
        $username = $data['username'];
        $password = $data['password'];

        $conn = connectDB();

        $stmt = $conn->prepare("SELECT user_id, password FROM users WHERE username = ?");
        $stmt->bind_param("s", $username);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $hashedPassword = $row['password'];
            if (password_verify($password, $hashedPassword)) {
                // Generate session token
                $sessionToken = uniqid();

                // Update session_token in database
                $updateStmt = $conn->prepare("UPDATE users SET session_token = ? WHERE user_id = ?");
                $updateStmt->bind_param("si", $sessionToken, $row['user_id']);
                $updateStmt->execute();

                // Set session variable
                $_SESSION['user_id'] = $row['user_id'];
                $_SESSION['session_token'] = $sessionToken;

                header('Content-Type: application/json');
                echo json_encode(['success' => true, 'message' => 'Login successful!', 'session_token' => $sessionToken,'username'=>$username ]); // Return session_token in response
            } else {
                header('Content-Type: application/json');
                echo json_encode(['success' => false, 'message' => 'Incorrect password.']);
            }
        } else {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'User not found.']);
        }
        $stmt->close();
        $conn->close();
    }
} else {
    echo "Nothing Posted";
}
?>
