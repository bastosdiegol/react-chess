import { useState } from 'react';
import Header from './Header';
import Chess from '../classes/Chess.js';
import Chessboard from './Chessboard.jsx';
import '../styles/App.css';
import Localization from './Localization.jsx';

function App() {

  let theChess = new Chess();
  theChess.newGame();
  // App Loading Status
  const [loading, setLoading] = useState(true);
  // Chess game instance
  const [chess, setChess] = useState(theChess);
  // Chessboard color theme
  const [theme, setTheme] = useState("Classic");
  // Move Guide Helper
  const [moveGuide, setMoveGuide] = useState(true);
  // Localization Object
  const [localization, setLocalization] = useState(null);
  // Current Locale identifier
  const [locale, setLocale] = useState(null);
  // Current locale object data
  const [localeData, setLocaleData] = useState(null);
  // Locale options list
  const [localeOptions, setLocaleOptions] = useState(null);

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
      <Localization setLoading={setLoading} setLocalization={setLocalization}
                    locale={locale} setLocale={setLocale} 
                    setLocaleData={setLocaleData} setLocaleOptions={setLocaleOptions} />
      { !loading && ( 
          <>
            <Header theme={theme} setTheme={setTheme} 
                    moveGuide={moveGuide} setMoveGuide={setMoveGuide} setNewGame={newGame}
                    localization={localization} locale={locale} setLocale={setLocale} 
                    localeData={localeData} setLocaleData={setLocaleData} localeOptions={localeOptions}  />
            <Chessboard chess={chess} setChess={setChess} moveGuide={moveGuide} localeData={localeData} />
          </>
      ) }
    </>
  )
}

export default App
