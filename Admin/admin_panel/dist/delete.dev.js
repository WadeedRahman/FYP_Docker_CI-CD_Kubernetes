"use strict";

document.getElementById('deleteMedicineForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var medicineId = document.getElementById('medicineId').value;
  var medicineName = document.getElementById('medicineName').value;
  var confirmDelete = document.getElementById('confirmDelete').checked;

  if (confirmDelete) {
    console.log('Medicine ID:', medicineId);
    console.log('Medicine Name:', medicineName);
    alert('Medicine deleted successfully!');
  } else {
    alert('You must confirm the deletion.');
  }
});
//# sourceMappingURL=delete.dev.js.map
