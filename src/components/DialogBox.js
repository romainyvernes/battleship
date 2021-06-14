import React from 'react';
import '../styles/DialogBox.css';

const DialogBox = (props) => {
  const { message } = props;
  
  return (
    <div className='dialog-box'>
      <p key={message}>{message}</p>
    </div>
  );
};

export default DialogBox;