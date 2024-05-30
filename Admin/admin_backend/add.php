<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = connectDB();

    $name = $_POST['name'];
    $price = $_POST['price'];
    $image_ = $_FILES['image'];

    // Validate input
    if (empty($name) || empty($price) || empty($image_)) {
        echo json_encode(['success' => false, 'error' => 'All fields are required.']);
        exit();
    }

    // Validate image
    $allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];
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
    $target_dir = "../images/";
    if (!is_dir($target_dir)) {
        mkdir($target_dir, 0777, true);
    }
    $target_file = $target_dir . basename($image_["name"]);
    if (!move_uploaded_file($image_["tmp_name"], $target_file)) {
        echo json_encode(['success' => false, 'error' => 'Failed to upload image.']);
        exit();
    }

    // Insert data into the database
    $sql = "INSERT INTO products (name, price, image_path) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        echo json_encode(['success' => false, 'error' => 'Failed to prepare the SQL statement.']);
        exit();
    }
    $stmt->bind_param("sds", $name, $price, $target_file);
    if ($stmt->execute()) {
        echo json_encode(['success' => true, 'product_id' => $stmt->insert_id]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to execute the SQL statement.']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
