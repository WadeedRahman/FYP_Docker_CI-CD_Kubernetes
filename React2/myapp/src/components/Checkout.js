import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import "./Checkout.css";

const Checkout = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    address: '',
    city: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const session_token = localStorage.getItem('session_token');
    const dataToSend = {
      session_token: session_token,
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      address: formData.address,
      city: formData.city,
    };

    fetch("http://localhost:8080/checkout.php", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(dataToSend),
    })
    .then(response => response.json())
    .then(data => {
      console.log(data);
      if (data.success) {
        alert('Your order is successfully placed!');
        setFormData({
          firstName: '',
          lastName: '',
          email: '',
          address: '',
          city: '',
        });
        navigate('/'); // Navigate back to home page
      } else {
        alert('Failed to place order. Please try again.');
      }
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('An error occurred. Please try again later.');
    });
  };

  return (
    <div className='checkout'>
      <form className='check' onSubmit={handleSubmit}>
        <div>
          <h1>Customer Information</h1>
          <div>
            <label className='FN'>First Name</label>
            <input
              type='text'
              name='firstName'
              placeholder='Ammara'
              value={formData.firstName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='FN'>Last Name</label>
            <input
              type='text'
              name='lastName'
              placeholder='Wadeed'
              value={formData.lastName}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='FN'>Email</label>
            <input
              type='email'
              name='email'
              placeholder='wa@example.com'
              value={formData.email}
              onChange={handleChange}
            />
          </div>
        </div>
        <div>
          <h1>Payment Method</h1>
          <input type='checkbox' checked readOnly />
          <label className='cash'>Cash on Delivery</label>
        </div>
        <div>
          <h1>Shipping</h1>
          <div>
            <label className='FN'>Address</label>
            <input
              type='text'
              name='address'
              placeholder='flaa flaa'
              value={formData.address}
              onChange={handleChange}
            />
          </div>
          <div>
            <label className='FN'>City</label>
            <input
              type='text'
              name='city'
              placeholder='Jungle'
              value={formData.city}
              onChange={handleChange}
            />
          </div>
        </div>
        <input type="submit" className="button" value="Submit" />
        <input type='reset' value="Reset" className="button" onClick={() => setFormData({ firstName: '', lastName: '', email: '', address: '', city: '' })} />
      </form>
    </div>
  );
};

export default Checkout;
