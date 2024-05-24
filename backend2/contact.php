<?php
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

require_once('database.php'); // Include the database connection file

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $data = json_decode(file_get_contents('php://input'), true);
    if (isset($data['name']) && isset($data['email']) && isset($data['subject'])) {
        $name = $data['name'];
        $email = $data['email'];
        $subject = $data['subject'];

        // Connect to the database
        $conn = connectDB();

        // Insert contact form data into the database
        $stmt = $conn->prepare("INSERT INTO contact_form (name, email, subject) VALUES (?, ?, ?)");
        $stmt->bind_param("sss", $name, $email, $subject);

        if ($stmt->execute()) {
            header('Content-Type: application/json');
            echo json_encode(['success' => true, 'message' => 'Message sent successfully!']);
        } else {
            header('Content-Type: application/json');
            echo json_encode(['success' => false, 'message' => 'Error occurred while sending message.']);
        }

        $stmt->close();
        $conn->close();
    } else {
        header('Content-Type: application/json');
        echo json_encode(['success' => false, 'message' => 'Missing parameters.']);
    }
} else {
    echo "Hi G";
}
?>
