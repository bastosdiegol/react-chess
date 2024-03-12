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
  }

  /**
   * Method that validates the Pawn Piece Movement.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @returns {boolean} Movement is possible or not.
   */
  isValidMove(board, destCoords, specialMove) {
    // Each Team Pawn Moves Differently (In the Matrix)
    switch (this.team) {
      case APP_CONSTS.WHITE:
        // Same Column Movement
        if (
          this.position.column === destCoords.column &&
          board[destCoords.row][destCoords.column] === null
        ) {
          // One-Square Advance
          if (this.position.row - destCoords.row === 1) {
            return true;
          } else if (
            // Two-Square Advance
            this.position.row - destCoords.row === 2 &&
            this.position.row === 6
          ) {
            specialMove.piece = this;
            return true;
          }
          // Default Taking Check
        } else if (
          this.position.row - destCoords.row === 1 &&
          (this.position.column - destCoords.column === 1 ||
            this.position.column - destCoords.column === -1) &&
          board[destCoords.row][destCoords.column] != null &&
          board[destCoords.row][destCoords.column].team === APP_CONSTS.BLACK
        ) {
          return true;
          // En Passant
        } else if (this.isMoveEnPassant(board, destCoords, specialMove.piece)) {
          return true;
        }
        break;
      case APP_CONSTS.BLACK:
        // Same Column Movement
        if (
          this.position.column === destCoords.column &&
          board[destCoords.row][destCoords.column] === null
        ) {
          // One-Square Advance
          if (this.position.row - destCoords.row === -1) {
            return true;
          } else if (
            // Two-Square Advance
            this.position.row - destCoords.row === -2 &&
            this.position.row === 1
          ) {
            specialMove.piece = this;
            return true;
          }
          // Default Taking Check
        } else if (
          this.position.row - destCoords.row === -1 &&
          (this.position.column - destCoords.column === 1 ||
            this.position.column - destCoords.column === -1) &&
          board[destCoords.row][destCoords.column] != null &&
          board[destCoords.row][destCoords.column].team === APP_CONSTS.WHITE
        ) {
          return true;
          // En Passant
        } else if (this.isMoveEnPassant(board, destCoords, specialMove.piece)) {
          // Updates the Board
          return true;
        }
        break;
      default:
        return false;
    }
    return false;
  }

  /**
   * Checks if the move is an En Passant move.
   * @param {Array<Array<Piece>>} board - The chessboard represented as a 2D array of objects.
   * @param {Coords} destCoords - The destination coordinates of the move.
   * @returns {boolean} True if the move is an En Passant move, otherwise false.
   */
  isMoveEnPassant(board, destCoords, specialMovePiece) {
    switch (this._team) {
      case APP_CONSTS.WHITE:
        if (
          this.position.row - destCoords.row === 1 && // Row check
          (this.position.column - destCoords.column === 1 || // Right En Passant
            this.position.column - destCoords.column === -1) && // Left En Passant
          board[destCoords.row + 1][destCoords.column] != null && // Square Bellow Has Unit
          board[destCoords.row + 1][destCoords.column] === specialMovePiece // Enemy Piece is just used Double-Step Advance
        ) {
          return true;
        }
        break;
      case APP_CONSTS.BLACK:
        if (
          this.position.row - destCoords.row === -1 && // Row check
          (this.position.column - destCoords.column === 1 || // Right En Passant
            this.position.column - destCoords.column === -1) && // Left En Passant
          board[destCoords.row - 1][destCoords.column] != null && // Square Bellow Has Unit
          board[destCoords.row - 1][destCoords.column] === specialMovePiece // Enemy Piece is just used Double-Step Advance
        ) {
          return true;
        }
        break;
    }
    return false;
  }
}
