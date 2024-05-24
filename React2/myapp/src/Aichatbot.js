import React from "react";
import "./Chatbot.css"
import {Link} from "react-router-dom";


function Aichatbot() {
  return (
    
    <div className="chatbot-container">
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

export default Aichatbot;
