import '../styles/Chessboard.css';
import rookWhite from "/assets/rook-white.svg";
import knightWhite from "/assets/knight-white.svg";
import bishopWhite from "/assets/bishop-white.svg";
import queenWhite from "/assets/queen-white.svg";
import kingWhite from "/assets/king-white.svg";
import pawnWhite from "/assets/pawn-white.svg";
import rookBlack from "/assets/rook-black.svg";
import knightBlack from "/assets/knight-black.svg";
import bishopBlack from "/assets/bishop-black.svg";
import queenBlack from "/assets/queen-black.svg";
import kingBlack from "/assets/king-black.svg";
import pawnBlack from "/assets/pawn-black.svg";
import Chess from '../classes/Chess.js';
import APP_CONSTS from '../constants.js';

/**
   * Component that renders the chess game board.
   * @param {Chess} chess - Chess Class.
   * @returns {JSX.Element} JSX element that contains the chess game board.
   */
export default function Chessboard(props){

    const { chess, setChess } = props;

    function selectNewPiece(row, column){
        const updatedChess = { ...chess };
        updatedChess.selectedPiece.X = row;
        updatedChess.selectedPiece.Y = column;
        updatedChess.playerTurn = updatedChess.playerTurn ? APP_CONSTS.BLACK : APP_CONSTS.WHITE
        setChess(updatedChess);
    }

    return(
        <main>
            <div className='turn-info'>
                <p><strong>Player Turn:</strong> {chess.playerTurn ? "White" : "Black"} Pieces</p>
                <img src={chess.playerTurn === APP_CONSTS.WHITE ? pawnWhite : pawnBlack } 
                     alt="Player Turn Image" 
                     className="turn-info-img" />
            </div>
            <div id="chessboard" className="chessboard">
                {chess.board.map((row, rowIndex) => (
                    <div key={rowIndex} className="row">
                        {row.map((piece, columnIndex) => (
                            <div key={columnIndex} 
                                 className={`square ${((rowIndex + columnIndex) % 2 !== 0) ? 'dark' : ''} ${
                                    piece && chess.selectedPiece.X === rowIndex 
                                          && chess.selectedPiece.Y === columnIndex ? 'selected' : ''}`}
                                 onClick={piece && ((chess.playerTurn === APP_CONSTS.WHITE && chess.whitePieces.includes(piece)) 
                                                || (chess.playerTurn === APP_CONSTS.BLACK && chess.blackPieces.includes(piece)))
                                                 ? () => selectNewPiece(rowIndex, columnIndex) : null}>
                                {piece && <img src={getPieceImg(piece.symbol)} 
                                               alt={`${piece.name} Image`} 
                                               className='piece-img' />}
                            </div>
                        ))}
                    </div>
                ))}
            </div>
        </main>
    );
}

function getPieceImg(symbol){
    switch (symbol) {
        case 'r': return rookBlack;
        case 'n': return knightBlack;
        case 'b': return bishopBlack;
        case 'q': return queenBlack;
        case 'k': return kingBlack;
        case 'p': return pawnBlack;
        case 'R': return rookWhite;
        case 'N': return knightWhite;
        case 'B': return bishopWhite;
        case 'Q': return queenWhite;
        case 'K': return kingWhite;
        case 'P': return pawnWhite;
        default: return null;
    }
}