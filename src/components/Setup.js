import React, { useState } from 'react';
import Board from './Board';

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
      <div className='axis-selection' onClick={toggleAxis}>
        <p>{axis === 'x' ? 'Horizontal' : 'Vertical'}</p>
      </div>
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
