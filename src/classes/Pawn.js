import Piece from "./Piece";
import Coords from "./Coords";
import APP_CONSTS from "../constants.js";

/**
 * Chess Pawn Piece Class.
 * @class
 * @property {string} symbol - The symbol of the piece.
 * @property {string} name - The name of the piece.
 * @property {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Team which the piece belongs.
 * @property {Coords} coords - Piece position coordinates.
 * @property {boolean} isFirstMove - True if the Pawn hasn't moved yet.
 */
export default class Pawn extends Piece {
  /**
   * Description
   * @param {string} symbol - The symbol of the piece.
   * @param {string} name - The name of the piece.
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Team which the piece belongs.
   * @param {Coords} coords - Piece position coordinates.
   */
  constructor(symbol, name, team, coords) {
    super(symbol, name, team, coords);
    this.isFirstMove = true;
  }

  /**
   * Method that validates the Pawn Piece Movement.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @returns {boolean} Movement is possible or not.
   */
  isValidMove(board, destCoords, specialMove) {
    // Validates Line of Sight
    if (!this.hasLineOfSight(board, this.position, destCoords)) return false;

    const FORWARD_DIRECTION = this.team === APP_CONSTS.BLACK ? 1 : -1;

    // One-Square Advance
    if (
      destCoords.row === this.position.row + FORWARD_DIRECTION &&
      destCoords.column === this.position.column &&
      board[this.position.row + FORWARD_DIRECTION][this.position.column] ===
        null
    )
      return true;
    // Two-Square Advance
    if (
      this.position.row === (this.team === APP_CONSTS.BLACK ? 1 : 6) &&
      destCoords.row === this.position.row + 2 * FORWARD_DIRECTION &&
      destCoords.column === this.position.column &&
      board[this.position.row + 2 * FORWARD_DIRECTION][this.position.column] ===
        null
    ) {
      specialMove.piece = this;
      return true;
    }
    // Taking and En Passant
    const TARGET_ROW = this.position.row + FORWARD_DIRECTION;
    if (
      destCoords.row === this.position.row + FORWARD_DIRECTION &&
      Math.abs(this.position.column - destCoords.column) === 1
    ) {
      // Taking
      if (
        board[destCoords.row][destCoords.column] !== null &&
        board[destCoords.row][destCoords.column].team !== this.team
      ) {
        return true;
      }
      // En Passant
      else if (board[destCoords.row][destCoords.column] === null) {
        const BEHIND_PIECE = board[this.position.row][destCoords.column];
        if (BEHIND_PIECE && BEHIND_PIECE === specialMove.piece) {
          return true;
        }
      }
    }

    return false;
  }

  /**
   * Checks if the move is an En Passant move.
   * @param {Array<Array<Piece|null>>} board - The chessboard represented as a 2D array of objects.
   * @param {Coords} destCoords - The destination coordinates of the move.
   * @param {Piece|null} specialMovePiece - May contains a Piece if it made a Special Move last turn.
   * @returns {boolean} True if the move is an En Passant move, otherwise false.
   */
  isMoveEnPassant(board, destCoords, specialMovePiece) {
    const FORWARD_DIRECTION = this.team === APP_CONSTS.BLACK ? 1 : -1;
    if (
      destCoords.row === this.position.row + FORWARD_DIRECTION &&
      Math.abs(this.position.column - destCoords.column) === 1 &&
      board[destCoords.row][destCoords.column] === null
    ) {
      const BEHIND_PIECE = board[this.position.row][destCoords.column];
      if (BEHIND_PIECE && BEHIND_PIECE === specialMovePiece) {
        return true;
      }
    }

    return false;
  }

  /**
   * Retrieves possible moves for the pawn on the given board.
   * @param {Array<Array<Piece|null>>} board - The game board represented as a 2D array.
   * @property {Object} specialMove - Holds last piece that made special move (En Passant)
   * @returns {Array<Coords>} An array containing coordinates representing valid moves for the pawn.
   */
  getMoveGuide(board, specialMove) {
    let moveGuide = [];

    const FORWARD_DIRECTION = this.team === APP_CONSTS.BLACK ? 1 : -1;

    // One-Square Advance
    if (
      board[this.position.row + FORWARD_DIRECTION][this.position.column] ===
      null
    )
      moveGuide.push(
        new Coords(this.position.row + FORWARD_DIRECTION, this.position.column)
      );
    // Two-Square Advance
    if (
      this.position.row === (this.team === APP_CONSTS.BLACK ? 1 : 6) &&
      board[this.position.row + 2 * FORWARD_DIRECTION][this.position.column] ===
        null
    )
      moveGuide.push(
        new Coords(
          this.position.row + 2 * FORWARD_DIRECTION,
          this.position.column
        )
      );
    // Taking and En Passant
    [-1, 1].forEach((offset) => {
      const TARGET_COLUMN = this.position.column + offset;
      if (TARGET_COLUMN >= 0 && TARGET_COLUMN <= 7) {
        const TARGET_ROW = this.position.row + FORWARD_DIRECTION;
        // Taking
        if (
          board[TARGET_ROW][TARGET_COLUMN] !== null &&
          board[TARGET_ROW][TARGET_COLUMN].team !== this.team
        ) {
          moveGuide.push(new Coords(TARGET_ROW, TARGET_COLUMN));
        } else {
          // En Passant check
          const BEHIND_PIECE =
            board[this.position.row][this.position.column + offset];
          if (BEHIND_PIECE && BEHIND_PIECE === specialMove.piece) {
            moveGuide.push(new Coords(TARGET_ROW, TARGET_COLUMN));
          }
        }
      }
    });

    return moveGuide;
  }
}
