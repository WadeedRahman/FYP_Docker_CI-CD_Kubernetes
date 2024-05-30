// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;

  fetch('http://localhost:8082/login.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ username, password }) // Ensure field names match what PHP expects
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      localStorage.setItem('authenticated', 'true');
      window.location.href = 'admin.html';
    } else {
      const errorMessage = document.getElementById('login-error');
      errorMessage.textContent = 'Invalid username or password.';
      errorMessage.style.display = 'block';
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });
});

// Ensure user is authenticated before accessing admin page
document.addEventListener('DOMContentLoaded', function() {
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  const isAccessingAdminPage = window.location.pathname.endsWith('admin.html');

  if (isAccessingAdminPage && !isAuthenticated) {
    window.location.href = 'login.html';
  }

  // Logout button functionality (optional)
  const logoutButton = document.getElementById('logoutButton');
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('authenticated');
      window.location.href = 'login.html';
    });
  }
});
