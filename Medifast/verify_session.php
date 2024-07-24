<?php
session_start(); // Start the session
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once('database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['session_token'])) {
        $sessionToken = $data['session_token'];

        $conn = connectDB();

        $stmt = $conn->prepare("SELECT user_id FROM users WHERE session_token = ?");
        $stmt->bind_param("s", $sessionToken);
        $stmt->execute();
        $result = $stmt->get_result();
        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();

            // Set session variables
            $_SESSION['user_id'] = $row['user_id'];
            $_SESSION['session_token'] = $sessionToken;

            header('Content-Type: application/json');
            echo json_encode(['valid' => true, 'user_id' => $row['user_id']]);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['valid' => false, 'message' => 'Invalid session token.']);
        }
        $stmt->close();
        $conn->close();
    } else {
        header('Content-Type: application/json');
        echo json_encode(['valid' => false, 'message' => 'Session token not provided.']);
    }
} else {
    echo "Invalid request method.";
}
?>
