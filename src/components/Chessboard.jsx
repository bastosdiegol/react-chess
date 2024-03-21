import '../styles/Chessboard.css';
import getPieceImg from '../utility';
import pawnWhite from "/assets/pawn-white.svg";
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

    const { chess, setChess, moveGuide, setMoveHistory, localeData, 
        setWhitePiecesGraveyard, setBlackPiecesGraveyard } = props;

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
        if(updatedChess.selectNewPiece(updatedChess.board[row][column])){
            setChess(updatedChess);
            setMoveHistory(updatedChess.moveLog);
        }
    }

    /**
     * Function to move a piece on the board. (Click Move)
     * @param {number} destRow - Destination row index for the piece.
     * @param {number} destColumn - Destination column index for the piece.
     */
    function movePieceByClick(destRow, destColumn){
        const updatedChess = new Chess();
        Object.assign(updatedChess, chess);
        if(updatedChess.movePiece(new Coords(destRow, destColumn))){
            setChess(updatedChess);
            if(chess.playerTurn === APP_CONSTS.BLACK)
                setWhitePiecesGraveyard(updatedChess.whitePiecesGraveyard);
            else
                setBlackPiecesGraveyard(updatedChess.blackPiecesGraveyard);
        }
    }

    /**
     * Function to move a piece on the board. (Drag-and-Drop Move)
     * @param {React.DragEvent} event - Destination row index for the piece.
     * @param {number} destRow - Destination row index for the piece.
     * @param {number} destColumn - Destination column index for the piece.
     */
    function movePieceByDrag(event, row, column){
        if(chess.board[row][column] && chess.board[row][column].team !== chess.playerTurn)
            return;
        const updatedChess = new Chess();
        Object.assign(updatedChess, chess);

        let destCoords = getDestinationCoords(event.clientX, event.clientY);

        if(updatedChess.movePiece(destCoords)){
            setChess(updatedChess);
            if(chess.playerTurn === APP_CONSTS.BLACK)
                setWhitePiecesGraveyard(updatedChess.whitePiecesGraveyard);
            else
                setBlackPiecesGraveyard(updatedChess.blackPiecesGraveyard);
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
                            let squareBackgroundColor = "";
                            if (moveGuide && chess.selectedPiece) {
                                const moveGuideItem = chess.moveGuide.find(item => item.equals(rowIndex, columnIndex));
                                if (moveGuideItem) {
                                    squareBackgroundColor = 
                                        (rowIndex + columnIndex) % 2 !== 0 
                                        ? "possible-move-black" : "possible-move-white";
                                }
                            }

                            return (
                                <div key={columnIndex} className="square-wrapper">
                                    <div className={`square ${squareBackground} ${squareSelected} ${ squareBackgroundColor}`}
                                         // onClick settings
                                         onClick={piece && ((chess.playerTurn === APP_CONSTS.WHITE && chess.whitePieces.includes(piece)) 
                                                         || (chess.playerTurn === APP_CONSTS.BLACK && chess.blackPieces.includes(piece)))
                                                         ? () => selectNewPiece(rowIndex, columnIndex) 
                                                         : chess.selectedPiece 
                                                            ? () => movePieceByClick(rowIndex, columnIndex) 
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
                                                        movePieceByDrag(event, rowIndex, columnIndex);
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