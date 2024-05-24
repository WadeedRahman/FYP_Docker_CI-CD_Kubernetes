import React, { useState } from "react";
import './Login.css'; 
import { RiUser3Fill, RiLockPasswordFill } from 'react-icons/ri';
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Link } from "react-router-dom";

const Login = () => {
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
  
    const handleUsernameChange = (event) => {
      setUsername(event.target.value);
    };
  
    const handlePasswordChange = (event) => {
      setPassword(event.target.value);
    };

    async function handleSubmit(event) {
      event.preventDefault();
        console.log(username, " " ,password)
  
        try {
            const response = await fetch('http://userAuthentication.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'username': username, 'password': password })
            });
            console.log(response);
            if (response.ok) {
                console.log('Success:', response);
                // Handle success (e.g., clear form, show success message)
            } else {
                console.error("Error");
                // Handle errors (e.g., show error message)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors
        }
    }


    return (

        <div>
            <Navbar />
            <div className="wa">
                <div className="login">
                <h2 className="heading">LOGIN</h2>
                <form name='login' className="ff" >
                    <div className="login-form">
                    <label htmlFor="username" className="form-label">
                        <RiUser3Fill /> Username
                    </label>
                    <input
                        type="username"
                        className="form-control"
                        id="username"
                        required
                        value={username}
                        onChange={handleUsernameChange}
                        autoComplete="off"
                    />
                    </div>
                    <div className="login-form">
                    <label htmlFor="password" className="form-label">
                        <RiLockPasswordFill /> Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        required
                        value={password}
                        onChange={handlePasswordChange}
                        autoComplete="off"
                    />
                    </div>
                    <button type="submit" className="login-button" onClick={handleSubmit}><Link to="/Newlogin">Submit</Link>
                 
                    </button>
                    <div className="login-form-footer">
                    <p>
                        Don't have an account? <a href="signup">Signup</a>
                    </p>
                    </div>
                </form>
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Login;