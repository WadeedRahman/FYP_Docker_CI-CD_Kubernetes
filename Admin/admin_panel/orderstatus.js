document.addEventListener('DOMContentLoaded', function() {
    const updateStatusForm = document.getElementById('updateStatusForm');

    updateStatusForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const formData = new FormData(updateStatusForm);

        // Remove the confirmUpdate field from the form data
        formData.delete('confirmUpdate');

        fetch('http://localhost:8082/updateorderstatus.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.text()) // Use text to see the raw response
        .then(text => {
            console.log('Raw response text:', text); // Log raw response for debugging
            
            // Extract the JSON part of the response
            const jsonStartIndex = text.indexOf('{');
            const jsonEndIndex = text.lastIndexOf('}') + 1;
            const jsonText = text.substring(jsonStartIndex, jsonEndIndex);

            let data;
            try {
                data = JSON.parse(jsonText);
                console.log('Parsed JSON response:', data); // Log parsed JSON
            } catch (error) {
                console.error('Error parsing JSON:', error);
                console.error('Response text:', text);
                throw new Error('Invalid JSON response');
            }

            if (data.success) {
                // Show success alert
                alert("Order status is updated successfully");
                // Clear the form
                updateStatusForm.reset();
                // Enable form inputs for future submissions
                Array.from(updateStatusForm.elements).forEach(element => {
                    element.disabled = false;
                });
            } else {
                // Handle failure
                alert('Failed to update order status: ' + data.error);
                console.error('Failed to update order status:', data.error);
            }
        })
        .catch(error => {
            console.error('Error updating order status:', error);
            alert('Error updating order status. Please try again later.');
        });
    });
});
