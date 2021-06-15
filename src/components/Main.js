import React from 'react';
import Board from './Board';
import '../styles/Main.css';

const Main = (props) => {
  const { 
    humanGrid, 
    computerGrid, 
    onAttack, 
    playStatus,
  } = props;
  
  return (
    <div className='main'>
      <div className='grid-container' id='friendly'>
        <h2>Friendly Waters</h2>
        <Board grid={humanGrid} playerType={'human'} />
      </div>
      <div className='grid-container' id='enemy'>
        <h2>Enemy Waters</h2>
        <Board 
          grid={computerGrid} 
          playerType={'computer'}
          onAttack={playStatus ? onAttack : null}
        />
      </div>
    </div>
  );
};

export default Main;
