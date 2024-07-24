document.getElementById('medicineForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const medicineName = document.getElementById('medicineName').value;
    const medicineImage = document.getElementById('medicineImage').files[0];
    const medicinePrice = document.getElementById('medicinePrice').value;
    const medicineQuantity = document.getElementById('medicineQuantity').value; // Get quantity value

    const formData = new FormData();
    formData.append('name', medicineName);
    formData.append('image', medicineImage);
    formData.append('price', medicinePrice);
    formData.append('quantity', medicineQuantity); // Append quantity value

    fetch('http://localhost:8082/add.php', {
        method: 'POST',
        body: formData
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
        if (data.success) {
            alert('Medicine added successfully!');
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });
});
