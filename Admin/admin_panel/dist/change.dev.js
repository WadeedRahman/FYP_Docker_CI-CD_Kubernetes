"use strict";

document.getElementById('changePriceForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var medicineId = document.getElementById('medicineId').value;
  var medicineName = document.getElementById('medicineName').value;
  var oldPrice = document.getElementById('oldPrice').value;
  var updatedPrice = document.getElementById('updatedPrice').value;
  var confirmUpdate = document.getElementById('confirmUpdate').checked;

  if (confirmUpdate) {
    console.log('Medicine ID:', medicineId);
    console.log('Medicine Name:', medicineName);
    console.log('Old Price:', oldPrice);
    console.log('Updated Price:', updatedPrice);
    alert('Medicine price updated successfully!');
  } else {
    alert('You must confirm the update.');
  }
});
//# sourceMappingURL=change.dev.js.map
