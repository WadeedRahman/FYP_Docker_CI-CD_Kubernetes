function displayMedicines() {
    const medicinesContainer = document.getElementById('medicines');

    fetch('http://localhost:8082/listmed.php')
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                const medicines = data.medicines;

                let tableHTML = `
                    <table>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Price</th>
                                <th>Image</th>
                            </tr>
                        </thead>
                        <tbody>
                `;

                medicines.forEach(medicine => {
                    tableHTML += `
                        <tr>
                            <td>${medicine.product_id}</td>
                            <td>${medicine.name}</td>
                            <td>${medicine.price}</td>
                            <td><img src="${medicine.image_path}" alt="${medicine.name}" width="100"></td>
                        </tr>
                    `;
                });

                tableHTML += `
                        </tbody>
                    </table>
                `;

                medicinesContainer.innerHTML = tableHTML;
            } else {
                medicinesContainer.innerHTML = `<p>${data.error}</p>`;
            }
        })
        .catch(error => {
            console.error('Error fetching medicines:', error);
            medicinesContainer.innerHTML = `<p>Error fetching medicines</p>`;
        });
}

document.addEventListener('DOMContentLoaded', displayMedicines);
