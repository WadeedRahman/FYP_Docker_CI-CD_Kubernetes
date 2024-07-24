import React from "react";
import "./Chatbot.css"

import {  RiCornerUpLeftDoubleLine } from "react-icons/ri";
import { useNavigate, Link } from 'react-router-dom';

function Chatbot() {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate('/home');
  };

  return (
    <div className="chatbot-container">
        <RiCornerUpLeftDoubleLine className='arrow' onClick={handleBackClick} />
    <div className="header">
    <img src="an.png" alt = "nothing" className="logo" />
<div className="des">
    <h3>AI CHATBOT</h3>
    <p>Your Personal Doctor</p>
</div>
    </div>
    <div className="mode">
    <Link to = "/Description" className="btn">
         Description Mode
       </Link>
       <Link to = "/Recommendation" className="btn">
         Recommendation mode
       </Link>
    </div>

    </div>
  );
}

export default Chatbot;
