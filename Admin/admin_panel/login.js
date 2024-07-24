document.addEventListener('DOMContentLoaded', function() {
  const loginForm = document.getElementById('loginForm');
  const errorMessage = document.getElementById('login-error');
  const logoutButton = document.getElementById('logoutButton');

  // Handle login form submission
  if (loginForm) {
    loginForm.addEventListener('submit', function(event) {
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
      .then(response => response.text())
      .then(text => {
        // Extract JSON part from the response text
        const jsonResponse = text.match(/\{.*\}/);
        if (jsonResponse) {
          return JSON.parse(jsonResponse[0]);
        } else {
          throw new Error('Invalid JSON response');
        }
      })
      .then(data => {
        if (data.success) {
          localStorage.setItem('authenticated', 'true');
          window.location.href = 'admin.html';
        } else {
          errorMessage.textContent = 'Invalid username or password.';
          errorMessage.style.display = 'block';
        }
      })
      .catch(error => {
        console.error('Error:', error);
      });
    });
  }

  // Ensure user is authenticated before accessing admin page
  const isAuthenticated = localStorage.getItem('authenticated') === 'true';
  const isAccessingAdminPage = window.location.pathname.endsWith('admin.html');

  if (isAccessingAdminPage && !isAuthenticated) {
    window.location.href = 'login.html';
  }

  // Logout button functionality
  if (logoutButton) {
    logoutButton.addEventListener('click', function() {
      localStorage.removeItem('authenticated');
      window.location.href = 'login.html';
    });
  }
});
