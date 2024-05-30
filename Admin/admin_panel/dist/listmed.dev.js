"use strict";

function displayMedicines() {
  var medicinesContainer = document.getElementById('medicines');
  var medicines = JSON.parse(localStorage.getItem('medicines')) || [];
  medicinesContainer.innerHTML = ''; // Clear the container

  medicines.forEach(function (medicine) {
    var card = document.createElement('div');
    card.classList.add('medicine-card');
    card.innerHTML = "\n            <img src=\"".concat(medicine.image, "\" alt=\"").concat(medicine.name, "\">\n            <h2>").concat(medicine.name, "</h2>\n            <p class=\"price\">").concat(medicine.price, "</p>\n            <p>").concat(medicine.description, "</p>\n        ");
    medicinesContainer.appendChild(card);
  });
}

document.addEventListener('DOMContentLoaded', displayMedicines);
//# sourceMappingURL=listmed.dev.js.map
