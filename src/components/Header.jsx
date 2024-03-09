import '../styles/Header.css';
import chessLogo from "/assets/chessboard-game.svg";
import reactLogo from "/assets/react.svg";

/**
   * Component that renders the app Header.
   * @returns {JSX.Element} JSX element that contains the HTML Header tag.
   */
export default function Header(){
    return(
        <header>
            <img src={reactLogo} alt="React Logo" className="chess-logo" />
            <img src={chessLogo} alt="Chess Game Logo" className="chess-logo" />
            <p className="logo-text">React Chess Game</p>
        </header>
    );
}