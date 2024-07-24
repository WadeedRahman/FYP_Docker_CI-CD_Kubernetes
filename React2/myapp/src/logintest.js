import React, { useState } from "react";
import './Login.css'; 
import { RiUser3Fill, RiLockPasswordFill } from 'react-icons/ri';
import { useNavigate, Link } from "react-router-dom";

const Login = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    async function handleSubmit(event) {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:8080/userAuthentication.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'username': username, 'password': password })
            });
            const responseData = await response.json();
            if (response.ok && responseData.success) {
                console.log('Login successful!');
                sessionStorage.setItem('session_token', responseData.session_token); 
                sessionStorage.setItem('username', responseData.username); // Store session token in session storage
                localStorage.setItem('session_token', responseData.session_token); 
                localStorage.setItem('username', responseData.username); // Store session token in session storage
                navigate('/home');
            } else {
                console.error("Error:", responseData.message);
                alert(responseData.message); // Display alert for login failure
            }
        } catch (error) {
            console.error('Error:', error);
            alert('An error occurred. Please try again later.'); // Display alert for network errors
        }
    }

    return (
        <div>
            <div className="wa">
                <div className="login">
                    <h2 className="heading">LOGIN</h2>
                    <form name='login' className="ff" onSubmit={handleSubmit}>
                        <div className="login-form">
                            <label htmlFor="username" className="form-label">
                                <RiUser3Fill /> Username
                            </label>
                            <input
                                type="text"
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
                            <div className="FP"><Link to="/ForgotPassword">Forget Password</Link></div> 
                        </div>
                        <button type="submit" className="login-button">Submit</button>
                        <div className="login-form-footer">
                            <p>
                                Don't have an account? <Link to="/signup">Signup</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
