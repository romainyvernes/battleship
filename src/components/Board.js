import React from 'react';
import '../styles/Board.css';
import uniqid from "uniqid";

const Board = (props) => {
  const { 
    grid, 
    playerType, 
    onAttack, 
    mode, 
    axis, 
    onPositionHover,
    onPositionOut,
    onPlaceShip,
  } = props;
  
  return (
    <div className='board'>
      <div className="content">
        {grid.map((row, index1) => (
          row.map((position, index2) => (
            <div 
              className={`board-element${
                !mode && typeof position === 'string'
                  ? ` ${position}`
                  : ''
              }${
                mode && position === true
                  ? ' allowed'
                  : ''
              }${
                mode && position !== true
                  ? ' not-allowed'
                  : ''
              } ${
                playerType || ''
              }${
                Number.isInteger(position) && 
                (playerType === 'human' || !playerType)
                  ? ' ship'
                  : ''
              }`}
              key={uniqid()}
              id={`${index2}-${index1}`}
              onClick={onPlaceShip || onAttack || null}
              onMouseEnter={onPositionHover || null}
              onMouseLeave={onPositionOut || null}
              data-axis={axis || null}
            >
              {(playerType === 'human' || mode) && Number.isInteger(position)
                ? '●'
                : null
              }
              {position === 'hit' || position === 'miss'
                ? '✕'
                : null
              }
            </div>
          ))
        ))}
      </div>
    </div>
  );
};

export default Board;