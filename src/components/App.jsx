import { useState } from 'react';
import Header from './Header';
import Chess from '../classes/Chess.js';
import Chessboard from './Chessboard.jsx';
import '../styles/App.css';

function App() {

  const [chess, setChess] = useState(new Chess());
  // const [playerTurn, setPlayerTurn] = useState(APP_CONSTS.WHITE);
  // const [selectedPiece, setSelectedPiece] = useState(new Coords(null,null));

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
