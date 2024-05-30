document.getElementById('deleteMedicineForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const medicineId = document.getElementById('medicineId').value;
    const medicineName = document.getElementById('medicineName').value;
    const confirmDelete = document.getElementById('confirmDelete').checked;

    console.log('Medicine ID:', medicineId);
    console.log('Medicine Name:', medicineName);
    console.log('Confirm Delete:', confirmDelete);

    if (confirmDelete) {
        const formData = new FormData();
        formData.append('product_id', medicineId);
        formData.append('name', medicineName);

        fetch('http://localhost:8082/del.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Medicine deleted successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    } else {
        alert('You must confirm the deletion.');
    }
});
