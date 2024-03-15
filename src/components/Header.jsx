import '../styles/Header.css';
import chessLogo from "/assets/chessboard-game.svg";
import reactLogo from "/assets/react.svg";
import { CHESSBOARD_THEMES } from '../constants';

/**
 * Component that renders the app Header.
 * @param {Object} props - The props object containing theme and setTheme.
 * @param {string} props.theme - The current theme of the chessboard.
 * @param {function} props.setTheme - A function to set the theme of the chessboard.
 * @returns {JSX.Element} JSX element that contains the HTML Header tag.
 */
export default function Header(props){

    const { theme, setTheme, moveGuide, setMoveGuide, setNewGame } = props;

    // Generating the theme options JSX elements
    const themeOptions = Object.keys(CHESSBOARD_THEMES).map((themeName, index) => {
        const isSelected = index === 0;
        return (
          <option key={themeName} value={themeName} defaultValue={isSelected ? themeName : undefined}>
            {themeName}
          </option>
        );
      });

    /**
     * Handles the change of theme.
     * @param {Event} event - The event object representing the theme change.
     */
    const handleThemeChange = (event) => {
        const selectedTheme = event.target.value;
        applyTheme(selectedTheme);
        setTheme(selectedTheme);
    };
    
    /**
     * Applies the selected theme to the chessboard.
     * @param {string} selectedTheme - The selected theme for the chessboard.
     */
    function applyTheme(selectedTheme){
        document.documentElement.style.setProperty('--board-border', CHESSBOARD_THEMES[selectedTheme].border);
        document.documentElement.style.setProperty('--white-square-color', CHESSBOARD_THEMES[selectedTheme].whiteSquare);
        document.documentElement.style.setProperty('--black-square-color', CHESSBOARD_THEMES[selectedTheme].blackSquare);
        document.documentElement.style.setProperty('--selected-square-border', CHESSBOARD_THEMES[selectedTheme].selectedSquareBorder);
        document.documentElement.style.setProperty('--guide-square-background-mix', CHESSBOARD_THEMES[selectedTheme].guideSquareBackgroundMix);
    }

    return(
        <header>
            <div className="app-name-logo">
                <img src={reactLogo} alt="React Logo" className="chess-logo" />
                <img src={chessLogo} alt="Chess Game Logo" className="chess-logo" />
                <p className="logo-text">React Chess Game</p>
            </div>
            <div className="settings">
                <div className="move-guide">
                    <label className="switch" htmlFor="toggleSwitch">Move Helper:</label>
                    <input type="checkbox" 
                           id="toggleSwitch" 
                           checked={moveGuide} 
                           onChange={(event) => setMoveGuide(event.target.checked)}  />          
                </div>
                <div className="board-theme">
                    <label htmlFor="board-theme">Board Theme:</label>
                    <select name="board-theme" id="board-theme" value={theme} onChange={handleThemeChange}>
                        {themeOptions}
                    </select>
                </div>
                <div className="new-game">
                    <button type="button" onClick={setNewGame}>New Game</button>
                </div>
            </div>
        </header>
    );
}