import React from "react";
import "./ForgotPassword.css"
import Navbar from "./Navbar";
import Footer from "./Footer";
import {RiUser3Fill ,RiLockPasswordFill, RiMailAddFill } from 'react-icons/ri';
function ForgotPassword() {
    return (
        <>
         <Navbar/>
<form className="forget-form">
  <h2 className="recover">Recover Password</h2>
  <p className="parag">Please enter the username, email address and New Password for your account</p>
  <div className="level">
  <label ><RiUser3Fill/>  Username</label>
                      <input
                        type="username"
                        className="forgetform-control"
                        placeholder="Username"
                        required  />
                      </div>
                      <div>
  <label ><RiMailAddFill/>  Enter Email Address</label>
                      <input
                        type="email"
                        className="forgetform-control"
                        placeholder="Enter Email Address"
                        required />
                      </div>
                      <div>
  <label><RiLockPasswordFill/>  Enter New Password</label>
                      <input
                        type="password"
                        className="forgetform-control"
                        placeholder="Password"
                        required />
                      </div>
                      <div>
  <label ><RiLockPasswordFill/>  Confirm New Password</label>
                      <input
                        type="password"
                        className="forgetform-control"
                        placeholder="Confirm New Password"
                    required  />
                  
                      </div>
                      <button type="Submit" className="forgot-button">Submit</button>
</form>
<Footer/>
</>
    );
  }
  export default ForgotPassword;
  