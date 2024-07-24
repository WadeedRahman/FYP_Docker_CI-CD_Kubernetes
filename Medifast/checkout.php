<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once('database.php');

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);

    // Validate input data
    if (isset($data['session_token'], $data['first_name'], $data['last_name'], $data['email'], $data['address'], $data['city'])) {
        $sessionToken = $data['session_token'];
        $firstName = $data['first_name'];
        $lastName = $data['last_name'];
        $email = $data['email'];
        $address = $data['address'];
        $city = $data['city'];

        $conn = connectDB();

        if (!$conn) {
            echo json_encode(['success' => false, 'message' => 'Database connection error']);
            die();
        }

        // Verify session token and get user ID
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE session_token = ?");
        if (!$stmt) {
            echo json_encode(['success' => false, 'message' => 'Prepare statement error: ' . $conn->error]);
            die();
        }

        $stmt->bind_param("s", $sessionToken);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $userId = $row['user_id'];

            // Insert checkout details into the checkout_details table
            $insertStmt = $conn->prepare("INSERT INTO checkout_details (user_id, first_name, last_name, email, address, city) VALUES (?, ?, ?, ?, ?, ?)");
            if (!$insertStmt) {
                echo json_encode(['success' => false, 'message' => 'Prepare statement error: ' . $conn->error]);
                die();
            }

            $insertStmt->bind_param("ssssss", $userId, $firstName, $lastName, $email, $address, $city);
            $insertStmt->execute();

            if ($insertStmt->affected_rows > 0) {
                echo json_encode(['success' => true, 'message' => 'Checkout details saved successfully!']);
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to save checkout details: ' . $conn->error]);
            }

            $insertStmt->close(); // Close insert statement
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid session token.']);
        }

        $stmt->close(); // Close session token verification statement
        $conn->close(); // Close database connection
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    }
} else {
    echo "Invalid request method.";
}
?>
