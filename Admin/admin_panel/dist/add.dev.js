"use strict";

document.getElementById('medicineForm').addEventListener('submit', function (event) {
  event.preventDefault();
  var medicineName = document.getElementById('medicineName').value;
  var medicineImage = document.getElementById('medicineImage').files[0];
  var medicinePrice = document.getElementById('medicinePrice').value;

  if (medicineImage) {
    var reader = new FileReader();

    reader.onload = function (e) {
      var imageBase64 = e.target.result;
      console.log('Medicine Name:', medicineName);
      console.log('Medicine Image:', imageBase64);
      console.log('Medicine Price:', medicinePrice);
      alert('Medicine added successfully!');
    };

    reader.readAsDataURL(medicineImage);
  }
});
//# sourceMappingURL=add.dev.js.map
