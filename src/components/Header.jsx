import '../styles/Header.css'
import chessLogo from "/assets/chessboard-game.svg";

export default function Header(){
    return(
        <header>
            <img src={chessLogo} alt="React Chess Game Logo" className="chess-logo" />
            <p className="logo-text">React Chess Game</p>
        </header>
    );
}