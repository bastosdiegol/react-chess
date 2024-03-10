import { useState } from 'react';
import Header from './Header';
import Chess from '../classes/Chess.js';
import Chessboard from './Chessboard.jsx';
import Coords from '../classes/Coords.js';
import '../styles/App.css';

function App() {

  const [board, setBoard] = useState(new Chess());
  const [playerTurn, setPlayerTurn] = useState("White");
  const [selectedPiece, setSelectedPiece] = useState(new Coords(null,null));

  return (
    <>
      <Header />
      <Chessboard 
        chess={board} 
        playerTurn={playerTurn} 
        selectedPiece={selectedPiece}
        selectPiece={setSelectedPiece} />
    </>
  )
}

export default App
