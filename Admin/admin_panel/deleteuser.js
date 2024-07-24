document.addEventListener('DOMContentLoaded', function() {
    const deleteMedicineForm = document.getElementById('deleteMedicineForm');

    deleteMedicineForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(deleteMedicineForm);

        fetch('http://localhost:8082/deleteuser.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                alert('User deleted successfully.');
                // Clear the form
                deleteMedicineForm.reset();
                // Disable the form inputs
                Array.from(deleteMedicineForm.elements).forEach(element => {
                    element.disabled = true;
                });
            } else {
                alert('Failed to delete user: ' + data.error);
            }
        })
        .catch(error => {
            console.error('Error deleting user:', error);
            alert('Error deleting user. Please try again later.');
        });
    });
});
