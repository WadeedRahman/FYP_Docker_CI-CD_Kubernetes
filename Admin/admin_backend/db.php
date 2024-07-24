/<?php

function connectDB() {
    $servername = "mysql";
    $username = "root";
    $password = "imoo125";
    $database = "medifast";

    // Create connection
    $conn = new mysqli($servername, $username, $password, $database);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    echo "Connection successful"; // Output success message

    return $conn;
}

// For demonstration purposes, calling the function directly
connectDB();
?>
