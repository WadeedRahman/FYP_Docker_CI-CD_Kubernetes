"use strict";

// Handle login form submission
document.getElementById('loginForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value; // Simple authentication check (replace with secure server-side authentication)

  if (username === 'ammara' && password === 'sheikhpagalha') {
    localStorage.setItem('authenticated', 'true');
    window.location.href = 'admin.html';
  } else {
    // Display error message in the login form
    var errorMessage = document.getElementById('login-error');
    errorMessage.textContent = 'Invalid username or password.';
    errorMessage.style.display = 'block'; // Make the error message visible
  }
}); // Ensure user is authenticated before accessing admin page

document.addEventListener('DOMContentLoaded', function () {
  var isAuthenticated = localStorage.getItem('authenticated') === 'true';
  var isAccessingAdminPage = window.location.pathname.endsWith('admin.html');

  if (isAccessingAdminPage && !isAuthenticated) {
    window.location.href = 'login.html';
  } // Logout button functionality (optional)


  var logoutButton = document.getElementById('logoutButton');

  if (logoutButton) {
    logoutButton.addEventListener('click', function () {
      localStorage.removeItem('authenticated');
      window.location.href = 'login.html';
    });
  }
});
//# sourceMappingURL=login.dev.js.map
