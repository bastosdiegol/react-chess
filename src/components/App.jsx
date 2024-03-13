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

  return (
    <>
      <Header theme={theme} setTheme={setTheme} />
      <Chessboard chess={chess} setChess={setChess} theme={theme} />
    </>
  )
}

export default App
