function showUpdateOptions() {
    const medicineId = document.getElementById('medicineId').value;
    if (medicineId) {
        document.getElementById('updateOptions').style.display = 'block';
    } else {
        alert('Please enter a valid Medicine ID');
    }
}

function showUpdateDialog(field) {
    let dialogContent = '';
    switch (field) {
        case 'name':
            dialogContent = `
                <h3>Update Medicine Name</h3>
                <label for="newName">New Name:</label>
                <input type="text" id="newName" name="name">
                <button onclick="confirmUpdate('name')">Confirm</button>
            `;
            break;
        case 'price':
            dialogContent = `
                <h3>Update Medicine Price</h3>
                <label for="newPrice">New Price:</label>
                <input type="number" id="newPrice" name="price" step="0.01">
                <button onclick="confirmUpdate('price')">Confirm</button>
            `;
            break;
        case 'image':
            dialogContent = `
                <h3>Update Medicine Image</h3>
                <label for="newImage">New Image:</label>
                <input type="file" id="newImage" name="image_path" accept="image/*">
                <button onclick="confirmUpdate('image')">Confirm</button>
            `;
            break;
        default:
            return;
    }
    document.getElementById('dialogContent').innerHTML = dialogContent;
    document.getElementById('updateDialog').style.display = 'block';
}

function closeDialog() {
    document.getElementById('updateDialog').style.display = 'none';
}

function confirmUpdate(field) {
    const medicineId = document.getElementById('medicineId').value;
    const formData = new FormData();
    formData.append('product_id', medicineId);

    switch (field) {
        case 'name':
            const newName = document.getElementById('newName').value;
            formData.append('name', newName);
            break;
        case 'price':
            const newPrice = document.getElementById('newPrice').value;
            formData.append('price', newPrice);
            break;
        case 'image':
            const newImage = document.getElementById('newImage').files[0];
            formData.append('image_path', newImage);
            break;
    }

    fetch('/Admin/backend/update.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert('Medicine updated successfully!');
        } else {
            alert('Error: ' + data.error);
        }
    })
    .catch(error => {
        console.error('Error:', error);
        alert('An error occurred. Please try again.');
    });

    closeDialog();
}
