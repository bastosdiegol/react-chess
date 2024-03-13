import Piece from "./Piece";
import Coords from "./Coords";
import APP_CONSTS from "../constants.js";
import Rook from "./Rook.js";

/**
 * Chess King Piece Class.
 * @class
 * @property {string} symbol - The symbol of the piece.
 * @property {string} name - The name of the piece.
 * @property {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Team which the piece belongs.
 * @property {Coords} coords - Piece position coordinates.
 * @property {boolean} hasMoved - King hasMoved status.
 */
export default class King extends Piece {
  /**
   * Description
   * @param {string} symbol - The symbol of the piece.
   * @param {string} name - The name of the piece.
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Team which the piece belongs.
   * @param {Coords} coords - Piece position coordinates.
   */
  constructor(symbol, name, team, coords) {
    super(symbol, name, team, coords);
    this._hasMoved = false;
  }

  /**
   * Get the hasMoved status of the King.
   * @returns {boolean} King hasMoved.
   */
  get hasMoved() {
    return this._hasMoved;
  }

  /**
   * Set the hasMoved status of the King.
   * @param {boolean} hasMoved - King hasMoved status.
   */
  set hasMoved(hasMoved) {
    this._hasMoved = hasMoved;
  }

  /**
   * Method that validates the King Piece Movement.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   */
  isValidMove(board, destCoords, specialMove) {
    if (
      Math.abs(this.position.row - destCoords.row) <= 1 &&
      Math.abs(this.position.column - destCoords.column) <= 1 &&
      (board[destCoords.row][destCoords.column] === null ||
        board[destCoords.row][destCoords.column].team !== this.team)
    ) {
      return true;
    } else if (
      !this.hasMoved &&
      ((board[destCoords.row][destCoords.column + 1] instanceof Rook &&
        !board[destCoords.row][destCoords.column + 1].hasMoved) ||
        (board[destCoords.row][destCoords.column - 1] instanceof Rook &&
          !board[destCoords.row][destCoords.column - 1].hasMoved &&
          board[destCoords.row][destCoords.column] === null))
    ) {
      specialMove.piece = this;
      return true;
    }
    return false;
  }
}
