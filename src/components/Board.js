import React from 'react';
import '../styles/Board.css';
import uniqid from "uniqid";

const Board = (props) => {
  const { grid, playerType, onClickedPosition } = props;
  
  return (
    <div className='board'>
      {grid.map((row, index1) => (
        row.map((position, index2) => (
          <div 
            className={`board-element${
              typeof position === 'string'
              ? ` ${position}`
              : ''
            }`}
            key={uniqid()}
            id={`${index2}-${index1}`}
            onClick={onClickedPosition || null}
          >
            {playerType === 'human' && Number.isInteger(position)
              ? '・'
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
  );
};

export default Board;