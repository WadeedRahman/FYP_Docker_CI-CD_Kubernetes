"use strict";

document.addEventListener('DOMContentLoaded', function () {
  var userTableBody = document.querySelector('#userTable tbody');
  var users = JSON.parse(localStorage.getItem('users')) || [];
  users.forEach(function (user) {
    var row = document.createElement('tr');
    row.innerHTML = "\n            <td>".concat(user.id, "</td>\n            <td>").concat(user.email, "</td>\n            <td>").concat(user.username, "</td>\n            <td>").concat(user.password, "</td>\n        ");
    userTableBody.appendChild(row);
  });
});
//# sourceMappingURL=listuser.dev.js.map
