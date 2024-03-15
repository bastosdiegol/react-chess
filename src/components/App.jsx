import { useState } from 'react';
import Header from './Header';
import Chess from '../classes/Chess.js';
import Chessboard from './Chessboard.jsx';
import '../styles/App.css';

function App() {

  let theChess = new Chess();
  theChess.newGame();
  const [chess, setChess] = useState(theChess);
  const [theme, setTheme] = useState("Classic");
  const [moveGuide, setMoveGuide] = useState(true);

  function newGame(){
    if(confirm("Are you sure you want to start a new game?")) {
      const updatedChess = new Chess();
      Object.assign(updatedChess, chess);    
      updatedChess.newGame();
      setChess(updatedChess);
    }
  }

  return (
    <>
      <Header theme={theme} setTheme={setTheme} moveGuide={moveGuide} setMoveGuide={setMoveGuide} setNewGame={newGame} />
      <Chessboard chess={chess} setChess={setChess} moveGuide={moveGuide} />
    </>
  )
}

export default App
