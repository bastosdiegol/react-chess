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
import Coords from '../classes/Coords.js';
import APP_CONSTS from '../constants.js';

/**
 * Component that renders the chess game board.
 * @param {object} props - Props for the Chessboard component.
 * @param {Chess} props.chess - Instance of the Chess class.
 * @param {Function} props.setChess - Function to set the chess state.
 * @returns {JSX.Element} JSX element that contains the chess game board.
 */
export default function Chessboard(props){

    const { chess, setChess, moveGuide, localeData } = props;

    /**
     * Function to select a new piece on the board.
     * @param {number} row - Row index of the selected piece.
     * @param {number} column - Column index of the selected piece.
     */
    function selectNewPiece(row, column){
        if(chess.board[row][column] && chess.board[row][column].team !== chess.playerTurn)
            return;
        const updatedChess = new Chess();
        Object.assign(updatedChess, chess);
        updatedChess.selectedPiece = updatedChess.board[row][column];
        updatedChess.updateMoveGuide();
        setChess(updatedChess);
    }

    /**
     * Function to move a piece on the board. (Click Move)
     * @param {number} destRow - Destination row index for the piece.
     * @param {number} destColumn - Destination column index for the piece.
     */
    function movePiece(destRow, destColumn){
        const updatedChess = new Chess();
        Object.assign(updatedChess, chess);
        if(updatedChess.movePiece(new Coords(destRow, destColumn))){
            setChess(updatedChess);
        }
    }

    /**
     * Function to move a piece on the board. (Drag-and-Drop Move)
     * @param {React.DragEvent} event - Destination row index for the piece.
     * @param {number} destRow - Destination row index for the piece.
     * @param {number} destColumn - Destination column index for the piece.
     */
    function movePiece(event, row, column){
        if(chess.board[row][column] && chess.board[row][column].team !== chess.playerTurn)
            return;
        const updatedChess = new Chess();
        Object.assign(updatedChess, chess);

        let destCoords = getDestinationCoords(event.clientX, event.clientY);

        if(updatedChess.movePiece(destCoords)){
            setChess(updatedChess);
        }
    }

    /**
     * Calculates the row and column indexes corresponding to the destination coordinates on the chessboard.
     * @param {number} mouseX - The horizontal position of the mouse cursor.
     * @param {number} mouseY - The vertical position of the mouse cursor.
     * @returns {Coords} The coordinates of the destination square on the chessboard.
     */
    function getDestinationCoords(mouseX, mouseY){
        const CHESSBOARD = document.getElementById('chessboard');
        const BOARD_TOP = CHESSBOARD.getBoundingClientRect().top;
        const BOARD_LEFT = CHESSBOARD.getBoundingClientRect().left;

        // The size of each square on the chessboard
        // TODO: use variable size for square
        const SQUARE_SIZE = 80;

        // Calculate the row and column index of the destination square
        const DROP_ROW_INDEX = Math.floor((mouseY - BOARD_TOP ) / SQUARE_SIZE);
        const DROP_COLUMN_INDEX = Math.floor((mouseX - BOARD_LEFT) / SQUARE_SIZE);

        return new Coords(DROP_ROW_INDEX,DROP_COLUMN_INDEX);
    }

    return(
        <main>
            <div id='turn-info' className='turn-info'>
                <p><strong>{localeData.move_turn}:</strong> </p>
                <img src={chess.playerTurn === APP_CONSTS.WHITE ? pawnWhite : pawnBlack } 
                    alt={`${localeData.player} ${localeData.move_turn} ${localeData.image}`} 
                    className="turn-info-img" />
                <p>{chess.playerTurn ? localeData.pieces_white : localeData.pieces_black}</p>
            </div>
            <div id="chessboard" className="chessboard" onDragOver={event => event.preventDefault()}>
                {chess.board.map((row, rowIndex) => (
                    // Chessboard Row
                    <div key={rowIndex} className="row">
                        {row.map((piece, columnIndex) => {
                            // Calculate the Square Background
                            let squareBackground = ((rowIndex + columnIndex) % 2 !== 0) ? "black-square" : "white-square";
                            // Calculate if the Square is Selected
                            let squareSelected = 
                                piece && chess.selectedPiece 
                                && chess.selectedPiece.position.row === rowIndex 
                                && chess.selectedPiece.position.column === columnIndex ? "selected" : "";
                            // Calculate the Move Guide Square Background Color
                            let squareBackgroundColor =
                                moveGuide && chess.selectedPiece 
                                && chess.moveGuide.find(item => item.equals(rowIndex, columnIndex))
                                && (rowIndex + columnIndex) % 2 !== 0 
                                    ? "possible-move-black" 
                                    : "";
                            squareBackgroundColor += 
                                moveGuide && chess.selectedPiece 
                                && chess.moveGuide.find(item => item.equals(rowIndex, columnIndex))
                                && (rowIndex + columnIndex) % 2 === 0 
                                    ? "possible-move-white" 
                                    : "";

                            return (
                                <div key={columnIndex} className="square-wrapper">
                                    <div className={`square ${squareBackground} ${squareSelected} ${ squareBackgroundColor}`}
                                         // onClick settings
                                         onClick={piece && ((chess.playerTurn === APP_CONSTS.WHITE && chess.whitePieces.includes(piece)) 
                                                         || (chess.playerTurn === APP_CONSTS.BLACK && chess.blackPieces.includes(piece)))
                                                         ? () => selectNewPiece(rowIndex, columnIndex) 
                                                         : chess.selectedPiece 
                                                            ? () => movePiece(rowIndex, columnIndex) 
                                                            : null}>
                                        {//Piece Image
                                        piece && <img src={getPieceImg(piece.symbol)} 
                                                      alt={`${localeData.pieces[piece.symbol]} ${localeData.image}`} 
                                                      className='piece-img' 
                                                      draggable='true' 
                                                      onDragStart={(event) => {
                                                        if(piece.team === chess.playerTurn){
                                                            event.dataTransfer.effectAllowed = "move";
                                                        }else{
                                                            event.dataTransfer.effectAllowed = "none";
                                                        }
                                                        selectNewPiece(rowIndex, columnIndex);
                                                      }} 
                                                      onDragEnd={(event) => {
                                                        movePiece(event, rowIndex, columnIndex);
                                                      }} />}
                                    </div>
                                    { columnIndex === 0 // Row Index Output on 1st Column
                                        ? (<p className={`row-index ${
                                            ((rowIndex + columnIndex) % 2 !== 0) ? 'coords-white' : 'coords-black'}`}>
                                                {APP_CONSTS.COORDS_TO_CHAR.ROW[rowIndex]}
                                                {/* {rowIndex} */}
                                            </p>) : '' }
                                    { rowIndex === 7 // Column Index Output on 8th Row
                                        ? (<p className={`column-index ${
                                            ((rowIndex + columnIndex) % 2 !== 0) ? 'coords-white' : 'coords-black'}`}>
                                                {APP_CONSTS.COORDS_TO_CHAR.COLUMN[columnIndex]}
                                                {/* {columnIndex} */}
                                            </p>) : '' }
                                </div>
                            );
                        })}
                    </div>
                ))}
            </div>
        </main>
    );
}

/**
 * Function to get the image URL for a chess piece.
 * @param {string} symbol - Symbol of the chess piece.
 * @returns {string|null} URL of the chess piece image or null if not found.
 */
function getPieceImg(symbol){
    switch (symbol) {
        case APP_CONSTS.ROOK_BLACK: return rookBlack;
        case APP_CONSTS.KNIGHT_BLACK: return knightBlack;
        case APP_CONSTS.BISHOP_BLACK: return bishopBlack;
        case APP_CONSTS.QUEEN_BLACK: return queenBlack;
        case APP_CONSTS.KING_BLACK: return kingBlack;
        case APP_CONSTS.PAWN_BLACK: return pawnBlack;
        case APP_CONSTS.ROOK_WHITE: return rookWhite;
        case APP_CONSTS.KNIGHT_WHITE: return knightWhite;
        case APP_CONSTS.BISHOP_WHITE: return bishopWhite;
        case APP_CONSTS.QUEEN_WHITE: return queenWhite;
        case APP_CONSTS.KING_WHITE: return kingWhite;
        case APP_CONSTS.PAWN_WHITE: return pawnWhite;
        default: return null;
    }
}