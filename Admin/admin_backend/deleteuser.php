<?php
include 'db.php';

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $conn = connectDB();

    $user_id = $_POST['product_id'];
    $username = $_POST['name'];

    // Log received data
    error_log("Received user_id: $user_id");
    error_log("Received username: $username");

    // Prepare and execute the SQL query
    $sql = "DELETE FROM users WHERE user_id = ? AND username = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("is", $user_id, $username);

    if ($stmt->execute()) {
        echo json_encode(['success' => true]);
    } else {
        echo json_encode(['success' => false, 'error' => 'Failed to delete the user.']);
    }

    $stmt->close();
    $conn->close();
} else {
    echo json_encode(['success' => false, 'error' => 'Invalid request method.']);
}
?>
