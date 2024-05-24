<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: GET, POST');
header('Access-Control-Allow-Headers: Content-Type');
// Include the database connection file
require_once('database.php');

// Connect to the database
$conn = connectDB();

// Query to retrieve products from the database
$query = "SELECT product_id, name, price, image_path FROM products";

// Execute the query
$result = $conn->query($query);

if ($result) {
    // Initialize an empty array to store product data
    $products = array();

    // Fetch associative array of products from the result set
    while ($row = $result->fetch_assoc()) {
        // Add each product to the products array
        $products[] = $row;
    }

    // Close the database connection
    $conn->close();

    // Encode products array as JSON and send it
    echo json_encode($products);
} else {
    // If query execution fails, send error response
    echo json_encode(['error' => 'Failed to fetch products']);
}
?>
