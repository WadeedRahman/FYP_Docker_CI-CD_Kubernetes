import React, { useState } from 'react';
import Message from './Message';
import "./Description.css";

function Description() {
  const [userMessage, setUserMessage] = useState(''); // State for user input
  const [messages, setMessages] = useState([]); // State for messages
  
  const sendMessage = async () => {
    const message = userMessage.trim();
    if (message) {
      setMessages(prevMessages => [...prevMessages, { user: 'User', content: message }]);
      setUserMessage(''); // Clear input after sending

      try {
        const res = await fetch('http://127.0.0.1:5000/get_recommendation', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ query: message }),
        });

        if (!res.ok) {
          throw new Error('Network response was not ok');
        }

        const data = await res.json();
        const responseMessage = { user: 'Bot', content: data.response };
        setMessages(prevMessages => [...prevMessages, responseMessage]);
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessage();
    }
  };

  const handleChange = (event) => {
    setUserMessage(event.target.value);
  };

  return (
    <div className='Ai'>
      <div className="chatbox">
        <h2>Recommendation Mode</h2>
        <ul>
          <div className="message-container"> 
            {messages.map((message, index) => (
              <Message key={index} user={message.user} content={message.content} />
            ))}
          </div>
        </ul>
        <input 
          type="text" 
          placeholder="Type your message..." 
          value={userMessage} 
          onChange={handleChange} 
          onKeyPress={handleKeyPress} 
        />
      </div>
    </div>
  );
}

export default Description;
