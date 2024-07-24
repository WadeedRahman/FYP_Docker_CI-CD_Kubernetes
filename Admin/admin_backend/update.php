<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = connectDB();

    $product_id = $_POST['product_id'];
    $updateName = isset($_POST['name']);
    $updatePrice = isset($_POST['price']);
    $updateImage = isset($_FILES['image_path']);

    // Check if product_id exists
    $sql_check = "SELECT * FROM products WHERE product_id = ?";
    $stmt_check = $conn->prepare($sql_check);
    $stmt_check->bind_param("i", $product_id);
    $stmt_check->execute();
    $result_check = $stmt_check->get_result();

    if ($result_check->num_rows > 0) {
        if ($updateName) {
            $newName = $_POST['name'];
            $sql_update_name = "UPDATE products SET name = ? WHERE product_id = ?";
            $stmt_update_name = $conn->prepare($sql_update_name);
            $stmt_update_name->bind_param("si", $newName, $product_id);
            $stmt_update_name->execute();
            $stmt_update_name->close();
        }

        if ($updatePrice) {
            $newPrice = $_POST['price'];
            $sql_update_price = "UPDATE products SET price = ? WHERE product_id = ?";
            $stmt_update_price = $conn->prepare($sql_update_price);
            $stmt_update_price->bind_param("di", $newPrice, $product_id);
            $stmt_update_price->execute();
            $stmt_update_price->close();
        }

        if ($updateImage) {
            $image_path = 'uploads/' . basename($_FILES['image_path']['name']);
            if (move_uploaded_file($_FILES['image_path']['tmp_name'], $image_path)) {
                $sql_update_image = "UPDATE products SET image_path = ? WHERE product_id = ?";
                $stmt_update_image = $conn->prepare($sql_update_image);
                $stmt_update_image->bind_param("si", $image_path, $product_id);
                $stmt_update_image->execute();
                $stmt_update_image->close();
            } else {
                echo json_encode(['success' => false, 'error' => 'Failed to upload image.']);
                exit;
            }
        }

        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Product ID does not exist.']);
    }

    $stmt_check->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
