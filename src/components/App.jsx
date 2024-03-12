import { useState } from 'react';
import Header from './Header';
import Chess from '../classes/Chess.js';
import Chessboard from './Chessboard.jsx';
import '../styles/App.css';

function App() {

  let theChess = new Chess();
  theChess.newGame();
  const [chess, setChess] = useState(theChess);

  return (
    <>
      <Header />
      <Chessboard 
        chess={chess} 
        setChess={setChess} />
    </>
  )
}

export default App
