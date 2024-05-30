<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = connectDB();

    $product_id = $_POST['product_id'];
    $name = $_POST['name'];

    // Log received data
    error_log("Received product_id: $product_id");
    error_log("Received name: $name");

    // Prepare and execute the SQL query
    $sql = "DELETE FROM products WHERE product_id = ? AND name = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $product_id, $name);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to delete the medicine.']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
