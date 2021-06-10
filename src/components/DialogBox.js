import React from 'react';

const DialogBox = (props) => {
  const { message } = props;
  
  return (
    <div className='dialog-box'>
      <p>{message}</p>
    </div>
  );
};

export default DialogBox;