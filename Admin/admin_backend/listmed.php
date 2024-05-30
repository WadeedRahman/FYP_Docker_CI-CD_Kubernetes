<?php
header('Content-Type: application/json');

include 'db.php';

$conn = connectDB();

$sql = "SELECT product_id, name, price, image_path FROM products";
$result = $conn->query($sql);

$medicines = array();

if ($result->num_rows > 0) {
    while($row = $result->fetch_assoc()) {
        $medicines[] = $row;
    }
} else {
    echo json_encode(['success' => false, 'error' => 'No medicines found']);
    exit;
}

$conn->close();

echo json_encode(['success' => true, 'medicines' => $medicines]);
?>
