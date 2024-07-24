document.addEventListener('DOMContentLoaded', function() {
    const contactTableBody = document.querySelector('#contactTable tbody');

    // Fetch and display user data
    fetch('http://localhost:8082/feedback.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            console.log('Parsed JSON response:', data); // Log parsed JSON

            if (data.success) {
                const contacts = data.contacts;

                contacts.forEach(contact => {
                    const row = document.createElement('tr');
                    
                    row.innerHTML = `
                        <td>${contact.id}</td>
                        <td>${contact.name}</td>
                        <td>${contact.email}</td>
                        <td>${contact.subject}</td>
                    `;

                    contactTableBody.appendChild(row);
                });
            } else {
                contactTableBody.innerHTML = `<tr><td colspan="4">${data.error}</td></tr>`;
            }
        })
        .catch(error => {
            console.error('Error fetching feedback detail', error);
            contactTableBody.innerHTML = `<tr><td colspan="4">Error fetching Feedback detail</td></tr>`;
        });

    // Logout functionality
    const logoutButton = document.querySelector('#logoutButton');
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            localStorage.removeItem('authenticated');
            window.location.href = 'login.html';
        });
    }
});
