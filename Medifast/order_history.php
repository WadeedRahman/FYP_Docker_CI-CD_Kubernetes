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

    if (isset($data['session_token'])) {
        $sessionToken = $data['session_token'];

        $conn = connectDB();

        if (!$conn) {
            echo json_encode(['success' => false, 'message' => 'Database connection error']);
            die();
        }

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

            $orderStmt = $conn->prepare("SELECT order_id, total_items, total_price, order_date, order_status FROM orders WHERE user_id = ?");
            if (!$orderStmt) {
                echo json_encode(['success' => false, 'message' => 'Prepare statement error: ' . $conn->error]);
                die();
            }

            $orderStmt->bind_param("i", $userId);
            $orderStmt->execute();
            $orderResult = $orderStmt->get_result();

            $orders = [];
            while ($orderRow = $orderResult->fetch_assoc()) {
                $orders[] = $orderRow;
            }

            if (empty($orders)) {
                echo json_encode(['success' => true, 'orders' => [], 'message' => 'No order history to show because you have not ordered anything yet.']);
            } else {
                echo json_encode(['success' => true, 'orders' => $orders]);
            }
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid session token.']);
        }

        $stmt->close();
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    }
} else {
    echo "Invalid request method.";
}
?>
