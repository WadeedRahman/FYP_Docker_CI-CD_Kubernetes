import React from 'react';

function Message({ user, content }) {
  const isUser = user === 'User'; // Check if message belongs to user

  return (
    <div className={`message ${isUser ? 'user' : 'chatgpt'}`}>
      <p>{content}</p>
    </div>
  );
}

export default Message;
