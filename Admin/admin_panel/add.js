document.getElementById('medicineForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const medicineName = document.getElementById('medicineName').value;
    const medicineImage = document.getElementById('medicineImage').files[0];
    const medicinePrice = document.getElementById('medicinePrice').value;

    const formData = new FormData();
    formData.append('name', medicineName);
    formData.append('image', medicineImage);
    formData.append('price', medicinePrice);

    fetch('http://localhost:8082/add.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
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
