document.addEventListener('DOMContentLoaded', function() {
    const userTableBody = document.querySelector('#userTable tbody');

    fetch('http://localhost:8082/listuser.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const users = data.users;

                users.forEach(user => {
                    const row = document.createElement('tr');
                    
                    row.innerHTML = `
                        <td>${user.user_id}</td>
                        <td>${user.email}</td>
                        <td>${user.username}</td>
                        <td>${user.password}</td>
                    `;

                    userTableBody.appendChild(row);
                });
            } else {
                userTableBody.innerHTML = `<tr><td colspan="4">${data.error}</td></tr>`;
            }
        })
        .catch(error => {
            console.error('Error fetching users:', error);
            userTableBody.innerHTML = `<tr><td colspan="4">Error fetching users</td></tr>`;
        });
});
