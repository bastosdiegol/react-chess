import { useState } from 'react';
import Header from './Header';
import Chess from '../classes/Chess.js';
import Chessboard from './Chessboard.jsx';
import '../styles/App.css';

function App() {

  var chess = new Chess();
  const [chessboard, {}] = useState(0);

  return (
    <>
      <Header />
      <Chessboard {...chess} />
    </>
  )
}

export default App
