<?php

function connectDB() {
    $servername = "mysql";
    $username = "root";
    $password = "imoo125";
    $database = "medifast";

    $conn = new mysqli($servername, $username, $password, $database);

    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    return $conn;
}

?>