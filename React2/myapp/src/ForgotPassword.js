import React, { useState } from "react";
import "./ForgotPassword.css";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RiUser3Fill, RiLockPasswordFill, RiMailAddFill } from "react-icons/ri";
import { useNavigate } from "react-router-dom";

function ForgotPassword() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();


  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch("http://localhost:8080/recover.php", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          email: email,
          new_password: newPassword,
          confirm_password: confirmPassword,
        }),
      });
      const responseData = await response.json();
      if (response.ok && responseData.success) {
        setMessage(responseData.message);
        alert('Password changed successfully');
        navigate('/Login');

      } else {
        setMessage(responseData.message);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
     
      <form className="forget-form" onSubmit={handleSubmit}>
        <h2 className="recover">Recover Password</h2>
        <p className="parag">Please enter the username, email address, and New Password for your account</p>
        <div className="level">
          <label>
            <RiUser3Fill /> Username
          </label>
          <input
            type="text"
            className="forgetform-control"
            placeholder="Username"
            required
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>
        <div>
          <label>
            <RiMailAddFill /> Enter Email Address
          </label>
          <input
            type="email"
            className="forgetform-control"
            placeholder="Enter Email Address"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label>
            <RiLockPasswordFill /> Enter New Password
          </label>
          <input
            type="password"
            className="forgetform-control"
            placeholder="Password"
            required
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
        </div>
        <div>
          <label>
            <RiLockPasswordFill /> Confirm New Password
          </label>
          <input
            type="password"
            className="forgetform-control"
            placeholder="Confirm New Password"
            required
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </div>
        <button type="submit" className="forgot-button">
          Submit
        </button>
        {message && <p className="message">{message}</p>}
      </form>
      
    </>
  );
}

export default ForgotPassword;
