<?php
include 'db.php';

// Configure error logging
ini_set('log_errors', 1);
ini_set('error_log', '/opt/lampp/logs/php_errors.log');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = connectDB();

    // Retrieve form inputs
    $name = $_POST['name'] ?? '';
    $price = $_POST['price'] ?? '';
    $quantity = $_POST['quantity'] ?? '';
    $image_ = $_FILES['image'] ?? null;

    // Validate input
    if (empty($name) || empty($price) || empty($quantity) || !$image_) {
        echo json_encode(['success' => false, 'error' => 'All fields are required.']);
        exit();
    }

    // Validate image
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    $maxSize = 2 * 1024 * 1024; // 2MB

    if (!in_array($image_['type'], $allowedTypes)) {
        echo json_encode(['success' => false, 'error' => 'Only JPG, PNG, and GIF files are allowed.']);
        exit();
    }

    if ($image_['size'] > $maxSize) {
        echo json_encode(['success' => false, 'error' => 'Image size should not exceed 2MB.']);
        exit();
    }

    // Save the image
    $target_dir = "/opt/lampp/htdocs/Admin/images/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0755, true);
    }
    $image_name = basename($image_["name"]); // Extract filename from the path
    $target_file = $target_dir . $image_name;

    if (!move_uploaded_file($image_["tmp_name"], $target_file)) {
        echo json_encode(['success' => false, 'error' => 'Failed to upload image.']);
        error_log('Failed to upload image: ' . print_r($image_, true)); // Log error
        exit();
    }

    // Insert data into the database
    $sql = "INSERT INTO products (name, price, quantity, image_path) VALUES (?, ?, ?, ?)";
    $stmt = $conn->prepare($sql);

    if ($stmt === false) {
        echo json_encode(['success' => false, 'error' => 'Failed to prepare the SQL statement.']);
        error_log('Failed to prepare SQL statement: ' . $conn->error); // Log error
        exit();
    }

    $stmt->bind_param("sdss", $name, $price, $quantity, $image_name); // Bind parameters

    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'product_id' => $stmt->insert_id]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to execute the SQL statement.']);
        error_log('Failed to execute SQL statement: ' . $stmt->error); // Log error
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
