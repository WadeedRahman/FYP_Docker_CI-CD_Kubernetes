<?php
session_start();
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once('database.php');

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    
    // Validate input data
    if (isset($data['session_token'], $data['product_id'], $data['quantity'])) {
        $sessionToken = $data['session_token'];
        $productId = $data['product_id'];
        $quantity = $data['quantity'];
        
        $conn = connectDB();

        // Verify session token and get user ID
        $stmt = $conn->prepare("SELECT user_id FROM users WHERE session_token = ?");
        $stmt->bind_param("s", $sessionToken);
        $stmt->execute();
        $result = $stmt->get_result();

        if ($result->num_rows == 1) {
            $row = $result->fetch_assoc();
            $userId = $row['user_id'];

            // Check if the product already exists in the cart for the user
            $stmt = $conn->prepare("SELECT cart_id FROM cart WHERE user_id = ? AND product_id = ?");
            $stmt->bind_param("ii", $userId, $productId);
            $stmt->execute();
            $result = $stmt->get_result();

            if ($result->num_rows > 0) {
                // Product already exists in cart, update quantity
                $cartData = $result->fetch_assoc();
                $cartId = $cartData['cart_id'];

                if ($quantity > 0) {
                    // Update quantity for the existing cart entry
                    $updateStmt = $conn->prepare("UPDATE cart SET quantity = ? WHERE cart_id = ?");
                    $updateStmt->bind_param("ii", $quantity, $cartId);
                    $updateStmt->execute();

                    if ($updateStmt->affected_rows > 0) {
                        echo json_encode(['success' => true, 'message' => 'Cart updated successfully.']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Failed to update cart.']);
                    }
                } else {
                    // Quantity is zero or less, remove the product from cart
                    $deleteStmt = $conn->prepare("DELETE FROM cart WHERE cart_id = ?");
                    $deleteStmt->bind_param("i", $cartId);
                    $deleteStmt->execute();

                    if ($deleteStmt->affected_rows > 0) {
                        echo json_encode(['success' => true, 'message' => 'Product removed from cart.']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Failed to remove product from cart.']);
                    }
                }
            } else {
                // Product does not exist in cart, insert new entry
                if ($quantity > 0) {
                    $insertStmt = $conn->prepare("INSERT INTO cart (user_id, product_id, quantity) VALUES (?, ?, ?)");
                    $insertStmt->bind_param("iii", $userId, $productId, $quantity);
                    $insertStmt->execute();

                    if ($insertStmt->affected_rows > 0) {
                        echo json_encode(['success' => true, 'message' => 'Product added to cart successfully.']);
                    } else {
                        echo json_encode(['success' => false, 'message' => 'Failed to add product to cart.']);
                    }
                } else {
                    echo json_encode(['success' => false, 'message' => 'Quantity must be greater than zero to add to cart.']);
                }
            }

            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'message' => 'Invalid session token.']);
        }
        
        $conn->close();
    } else {
        echo json_encode(['success' => false, 'message' => 'Invalid input.']);
    }
} else {
    echo "Invalid request method.";
}
?>
