import '../styles/Chessboard.css';

/**
   * Component that renders the chess game board.
   * @param {Chess} chess - Chess Class.
   * @returns {JSX.Element} JSX element that contains the chess game board.
   */
export default function Chessboard(chess){
    return(
        <main>
            <div id="chessboard" className="chessboard">
                {chess.board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((square, columnIndex) => (
                            <div key={columnIndex} 
                                 className={`square ${((rowIndex + columnIndex) % 2 !== 0) ? 'dark' : ''}`}>
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </main>
    );
}