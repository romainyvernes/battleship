import React from 'react';
import Board from './Board';
import '../styles/Main.css';

const Main = (props) => {
  const { humanGrid, computerGrid, onAttack, playStatus } = props;
  
  return (
    <div className='main'>
      <Board grid={humanGrid} playerType={'human'} />
      <Board 
        grid={computerGrid} 
        playerType={'computer'}
        onAttack={playStatus ? onAttack : null}
      />
    </div>
  );
};

export default Main;
