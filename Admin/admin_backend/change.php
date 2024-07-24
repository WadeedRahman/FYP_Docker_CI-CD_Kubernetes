<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = connectDB();

    $product_id = $_POST['product_id'];
    $name = $_POST['name'];
    $oldPrice = $_POST['oldPrice'];
    $newPrice = $_POST['price'];

    // Prepare and execute the SQL query to check if the product exists with the given ID and name
    $check_sql = "SELECT * FROM products WHERE product_id = ? AND name = ?";
    $stmt = $conn->prepare($check_sql);
    $stmt->bind_param("is", $product_id, $name);
    $stmt->execute();
    $result = $stmt->get_result();

    if ($result->num_rows > 0) {
        // Prepare and execute the SQL query to update the price
        $update_sql = "UPDATE products SET price = ? WHERE product_id = ? AND name = ?";
        $update_stmt = $conn->prepare($update_sql);
        $update_stmt->bind_param("dis", $newPrice, $product_id, $name);
        
        if ($update_stmt->execute()) {
            echo json_encode(['success' => true]);
        } else {
            echo json_encode(['success' => false, 'error' => 'Failed to update the price.']);
        }

        $update_stmt->close();
    } else {
        echo json_encode(['success' => false, 'error' => 'Product not found with the given ID and name.']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
