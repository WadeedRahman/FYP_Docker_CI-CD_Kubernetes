document.getElementById('changePriceForm').addEventListener('submit', function(event) {
    event.preventDefault();

    const medicineId = document.getElementById('medicineId').value;
    const medicineName = document.getElementById('medicineName').value;
    const oldPrice = document.getElementById('oldPrice').value;
    const updatedPrice = document.getElementById('updatedPrice').value;
    const confirmUpdate = document.getElementById('confirmUpdate').checked;

    if (confirmUpdate) {
        const formData = new FormData();
        formData.append('product_id', medicineId);
        formData.append('name', medicineName);
        formData.append('oldPrice', oldPrice);
        formData.append('price', updatedPrice);

        fetch('http://localhost:8082/change.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('Medicine price updated successfully!');
            } else {
                alert('Error: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error:', error);
            alert('An error occurred. Please try again.');
        });
    } else {
        alert('You must confirm the update.');
    }
});
