"use strict";

document.getElementById('registerForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var email = document.getElementById('email').value;
  var username = document.getElementById('username').value;
  var password = document.getElementById('password').value;
  var user = {
    id: Date.now().toString(),
    email: email,
    username: username,
    password: password
  };
  var users = JSON.parse(localStorage.getItem('users')) || [];
  users.push(user);
  localStorage.setItem('users', JSON.stringify(users));
  alert('User registered successfully!');
  document.getElementById('registerForm').reset();
});
//# sourceMappingURL=register.dev.js.map
