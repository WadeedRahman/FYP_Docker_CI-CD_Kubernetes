import React, { useState } from "react";
import './Signup.css';
import { RiUser3Fill, RiLockPasswordFill, RiMailAddFill } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import Navbar from "./Navbar";
import Footer from "./Footer";

function Signup() {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSignup = async (event) => {
        event.preventDefault();

        const usernameRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*_)[a-zA-Z\d_]{4,15}$/;
        if (!usernameRegex.test(username)) {
            alert('Username must contain lowercase, uppercase, numbers, underscore, and be 4 to 15 characters long.');
            return;
        }

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{4,9}$/;
        if (!passwordRegex.test(password)) {
            alert('Password must contain lowercase, uppercase, symbols, and be 4 to 9 characters long.');
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/signup.php', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 'name': username, 'email': email, 'password': password })
            });
            if (response.ok) {
                console.log('Signup successful');
                // Handle success (e.g., redirect to login page, show success message)
            } else {
                console.error('Error:', response.statusText);
                // Handle errors (e.g., show error message)
            }
        } catch (error) {
            console.error('Error:', error);
            // Handle network errors
        }
    };

    return (
        <>
            <Navbar />
            <div className="wa">
                <div className="signup">
                    <h2 className="heading">
                        SIGNUP
                    </h2>
                    <form className="ff" onSubmit={handleSignup}>
                        <div className="signup-form">
                            <label htmlFor="username" className="form-label">
                                <RiUser3Fill />
                                Username
                            </label>
                            <input
                                type="text"
                                className="form-control"
                                required
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                            />
                        </div>
                        <div className="signup-form">
                            <label htmlFor="email" className="form-label">
                                <RiMailAddFill /> Email
                            </label>
                            <input
                                type="email"
                                className="form-control"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>
                        <div className="signup-form">
                            <label htmlFor="password" className="form-label">
                                <RiLockPasswordFill /> Password
                            </label>
                            <input
                                type="password"
                                className="form-control"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <button type="submit" className="signup-button">Submit</button>
                        <div className="signupform-footer">
                            <p>Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </form>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default Signup;
