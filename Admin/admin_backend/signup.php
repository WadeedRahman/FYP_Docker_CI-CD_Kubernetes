<?php
include 'db.php'; // Include your database connection file

function storeHashedPassword($adminname, $email, $password) {
    $hashedPassword = password_hash($password, PASSWORD_DEFAULT);
    $conn = connectDB(); // Assuming you have a connectDB function in db.php

    if ($conn === false) {
        die('Database connection failed');
    }

    $sql = "INSERT INTO adminlogin (adminname, email, password) VALUES (?, ?, ?)";
    $stmt = $conn->prepare($sql);
    if ($stmt === false) {
        die('SQL prepare failed: ' . $conn->error);
    }

    $stmt->bind_param("sss", $adminname, $email, $hashedPassword);
    if ($stmt->execute()) {
        echo "Password stored successfully.";
    } else {
        echo "Error storing password: " . $stmt->error;
    }

    $stmt->close();
    $conn->close();
}

// Example usage:
storeHashedPassword('wadeed', 'wadeed125@gmail.com', '12345');
?>
