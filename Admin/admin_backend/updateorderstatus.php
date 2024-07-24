<?php
include 'db.php';

header('Content-Type: application/json');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = connectDB();

    $order_id = $_POST['order_id'] ?? null;
    $order_status = $_POST['order_status'] ?? null;

    if (!$order_id || !$order_status) {
        echo json_encode(['success' => false, 'error' => 'Missing required parameters.']);
        exit;
    }

    // Log received data (remove or comment out these lines in production)
    // error_log("Received order_id: $order_id");
    // error_log("Received order_status: $order_status");

    // Check if order_id already exists in the database
    $sql_check = "SELECT * FROM orders WHERE order_id = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("i", $order_id);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();

    if ($result_check->num_rows > 0) {
        // Order exists, update the order_status
        $sql_update = "UPDATE orders SET order_status = ? WHERE order_id = ?";
        $stmt_update = $conn->prepare($sql_update);
        $stmt_update->bind_param("si", $order_status, $order_id);

        if ($stmt_update->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to update the order status.']);
        }

        $stmt_update->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Order ID does not exist.']);
    }

    $stmt_check->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
