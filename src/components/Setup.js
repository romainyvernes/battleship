import React, { useState } from 'react';
import Board from './Board';
import '../styles/Setup.css';

const Setup = (props) => {
  const { 
    grid, 
    onPositionHover, 
    onPositionOut, 
    onPlaceShip, 
  } = props;
  const [axis, setAxis] = useState('x');

  const toggleAxis = () => {
    if (axis === 'x') {
      setAxis('y');
    } else {
      setAxis('x');
    }
  }

  return (
    <div className='setup'>
      <p className='axis-selection' onClick={toggleAxis}>
        {axis === 'x' ? 'Horizontal' : 'Vertical'}
      </p>
      <Board 
        grid={grid} 
        mode={'setup'} 
        axis={axis} 
        onPositionHover={onPositionHover} 
        onPositionOut={onPositionOut}
        onPlaceShip={onPlaceShip}
      />
    </div>
  );
};

export default Setup;
