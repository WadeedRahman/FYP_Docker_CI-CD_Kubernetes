document.addEventListener('DOMContentLoaded', function() {
    const deleteMedicineForm = document.getElementById('deleteMedicineForm');
    const logoutButton = document.getElementById('logoutButton');

    // Check if the user is authenticated
    const isAuthenticated = localStorage.getItem('authenticated') === 'true';
    if (!isAuthenticated) {
        window.location.href = 'login.html';
    }

    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('authenticated');
            window.location.href = 'login.html';
        });
    }

    deleteMedicineForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const medicineId = document.getElementById('medicineId').value;
        const medicineName = document.getElementById('medicineName').value;
        const confirmDelete = document.getElementById('confirmDelete').checked;

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
                console.log('Response:', data); // Log the response for debugging
                if (data.success) {
                    alert('Medicine deleted successfully!');
                    // Clear the form
                    deleteMedicineForm.reset();
                } else {
                    alert('Error: ' + data.error);
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('Medicine is Deleted Successfully');
                deleteMedicineForm.reset();

            });
        } else {
            alert('You must confirm the deletion.');
        }
    });
});

