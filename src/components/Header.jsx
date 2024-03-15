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

    const { theme, setTheme, 
            moveGuide, setMoveGuide, setNewGame, 
            localization, locale, setLocale, localeData, setLocaleData, localeOptions } = props;

    // Generating the theme options JSX elements
    const themeOptions = Object.keys(CHESSBOARD_THEMES).map((themeName, index) => {
        const isSelected = index === 0;
        return (
          <option key={localeData[themeName]} value={themeName} defaultValue={isSelected ? themeName : undefined}>
            {localeData[themeName]}
          </option>
        );
      });

    const localeSelectOptions = localeOptions.map((localeName, index) => {
        const isSelected = index === 0;
        return (
          <option key={localeName} value={localeName} defaultValue={isSelected ? localeName : undefined}>
            {localeName}
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

    const handleLocaleChange = (event) => {
        setLocale(event.target.value);
        setLocaleData(localization[event.target.value]);
    }

    return(
        <header>
            <div className="app-name-logo">
                <img src={reactLogo} alt="React Logo" className="chess-logo" />
                <img src={chessLogo} alt="Chess Game Logo" className="chess-logo" />
                <p className="logo-text">{localeData.title}</p>
            </div>
            <div className="settings">
                <div className="move-guide">
                    <label className="switch" htmlFor="toggleSwitch">{localeData.move_helper}:</label>
                    <input type="checkbox" 
                           id="toggleSwitch" 
                           checked={moveGuide} 
                           onChange={(event) => setMoveGuide(event.target.checked)}  />          
                </div>
                <div className="board-theme">
                    <label htmlFor="board-theme">{localeData.board_theme}:</label>
                    <select name="board-theme" id="board-theme" value={theme} onChange={handleThemeChange}>
                        {themeOptions}
                    </select>
                </div>
                <div className="locale">
                    <label htmlFor="locale-select">{localeData.language}:</label>
                    <select name="locale-select" id="locale-select" value={locale} onChange={handleLocaleChange} >
                        {localeSelectOptions}
                    </select>
                </div>
                <div className="new-game">
                    <button type="button" onClick={setNewGame}>{localeData.new_game}</button>
                </div>
            </div>
        </header>
    );
}