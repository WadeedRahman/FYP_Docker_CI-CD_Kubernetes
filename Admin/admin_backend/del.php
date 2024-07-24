<?php
header('Content-Type: application/json');

include 'db.php';

try {
    if ($_SERVER['REQUEST_METHOD'] == 'POST') {
        $conn = connectDB();

        if ($conn->connect_error) {
            throw new Exception('Database connection failed: ' . $conn->connect_error);
        }

        $product_id = $_POST['product_id'];
        $name = $_POST['name'];

        // Log received data
        error_log("Received product_id: $product_id");
        error_log("Received name: $name");

        // Start transaction
        $conn->begin_transaction();

        // Delete related entries in the cart table
        $sql_delete_cart = "DELETE FROM cart WHERE product_id = ?";
        $stmt_delete_cart = $conn->prepare($sql_delete_cart);
        if (!$stmt_delete_cart) {
            throw new Exception('Failed to prepare delete cart statement: ' . $conn->error);
        }
        $stmt_delete_cart->bind_param("i", $product_id);

        if (!$stmt_delete_cart->execute()) {
            throw new Exception('Failed to delete from cart: ' . $stmt_delete_cart->error);
        }

        $stmt_delete_cart->close();

        // Delete related entries in the order_items table
        $sql_delete_order_items = "DELETE FROM order_items WHERE product_id = ?";
        $stmt_delete_order_items = $conn->prepare($sql_delete_order_items);
        if (!$stmt_delete_order_items) {
            throw new Exception('Failed to prepare delete order_items statement: ' . $conn->error);
        }
        $stmt_delete_order_items->bind_param("i", $product_id);

        if (!$stmt_delete_order_items->execute()) {
            throw new Exception('Failed to delete from order_items: ' . $stmt_delete_order_items->error);
        }

        $stmt_delete_order_items->close();

        // Prepare and execute the SQL query to delete from products
        $sql = "DELETE FROM products WHERE product_id = ? AND name = ?";
        $stmt = $conn->prepare($sql);

        if (!$stmt) {
            throw new Exception('Failed to prepare delete product statement: ' . $conn->error);
        }

        $stmt->bind_param("is", $product_id, $name);

        if ($stmt->execute()) {
            $response = ['success' => true];
        } else {
            throw new Exception('Failed to execute delete product statement: ' . $stmt->error);
        }

        // Commit transaction
        $conn->commit();

        $stmt->close();
        $conn->close();
    } else {
        throw new Exception('Invalid request method.');
    }
} catch (Exception $e) {
    // Rollback transaction if an error occurs
    if ($conn) {
        $conn->rollback();
    }
    error_log('Error: ' . $e->getMessage());
    $response = ['success' => false, 'error' => $e->getMessage()];
}

// Clear the buffer and send the JSON response
echo json_encode($response);
?>
