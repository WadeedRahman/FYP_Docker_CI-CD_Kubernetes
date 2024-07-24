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
    if (isset($data['session_token'], $data['total_items'], $data['total_price'], $data['order_date'], $data['products']) && is_array($data['products'])) {
        $sessionToken = $data['session_token'];
        $totalItems = $data['total_items'];
        $totalPrice = $data['total_price'];
        $orderDateISO = $data['order_date'];
        $products = $data['products'];

        // Convert ISO 8601 to MySQL datetime format
        $orderDate = date('Y-m-d H:i:s', strtotime($orderDateISO));

        $conn = connectDB();

        if (!$conn) {
            // Handle database connection error
            echo json_encode(['success' => false, 'message' => 'Database connection error']);
            die();
        }

        // Verify session token and get user ID
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE session_token = ?");
        if (!$stmt) {
            // Handle statement preparation error
            echo json_encode(['success' => false, 'message' => 'Prepare statement error: ' . $conn->error]);
            die();
        }

        $stmt->bind_param("s", $sessionToken);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $userId = $row['user_id'];

            // Insert order into orders table
            $insertStmt = $conn->prepare("INSERT INTO orders (user_id, total_items, total_price, order_date) VALUES (?, ?, ?, ?)");
            if (!$insertStmt) {
                // Handle statement preparation error
                echo json_encode(['success' => false, 'message' => 'Prepare statement error: ' . $conn->error]);
                die();
            }

            $insertStmt->bind_param("iiis", $userId, $totalItems, $totalPrice, $orderDate);
            $insertStmt->execute();

            if ($insertStmt->affected_rows > 0) {
                $orderId = $insertStmt->insert_id; // Get the ID of the inserted order

                // Flag to indicate if any product quantity update fails
                $updateFailed = false;

                // Insert products into order_items table
                foreach ($products as $product) {
                    $productId = $product['product_id'];
                    $quantity = $product['quantity'];
                    $price = $product['price'];

                    // Begin a transaction
                    $conn->begin_transaction();

                    // Insert into order_items table
                    $productStmt = $conn->prepare("INSERT INTO order_items (order_id, product_id, quantity, price) VALUES (?, ?, ?, ?)");
                    if (!$productStmt) {
                        echo json_encode(['success' => false, 'message' => 'Prepare statement error: ' . $conn->error]);
                        die();
                    }

                    $productStmt->bind_param("iiid", $orderId, $productId, $quantity, $price);
                    $productStmt->execute();

                    // Update product quantity in products table
                    $updateStmt = $conn->prepare("UPDATE products SET quantity = quantity - ? WHERE product_id = ?");
                    if (!$updateStmt) {
                        echo json_encode(['success' => false, 'message' => 'Prepare statement error: ' . $conn->error]);
                        die();
                    }

                    $updateStmt->bind_param("ii", $quantity, $productId);
                    $updateStmt->execute();

                    if ($updateStmt->affected_rows === 0) {
                        $updateFailed = true;
                        $conn->rollback(); // Rollback transaction if update fails
                        break;
                    }

                    $productStmt->close(); // Close product statement
                    $updateStmt->close(); // Close update statement
                    $conn->commit(); // Commit transaction
                }

                if ($updateFailed) {
                    echo json_encode(['success' => false, 'message' => 'Failed to update product quantities.']);
                } else {
                    echo json_encode(['success' => true, 'message' => 'Order placed successfully.']);
                }
            } else {
                echo json_encode(['success' => false, 'message' => 'Failed to place order: ' . $conn->error]);
            }

            $insertStmt->close(); // Close order statement
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
