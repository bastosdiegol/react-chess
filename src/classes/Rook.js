import Piece from "./Piece";
import Coords from "./Coords";
import APP_CONSTS from "../constants.js";

/**
 * Chess Rook Piece Class.
 * @class
 * @property {string} symbol - The symbol of the piece.
 * @property {string} name - The name of the piece.
 * @property {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Team which the piece belongs.
 * @property {Coords} coords - Piece position coordinates.
 * @property {boolean} hasMoved - King hasMoved status.
 */
export default class Rook extends Piece {
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
   * Get the hasMoved status of the Rook.
   * @returns {boolean} Rook hasMoved.
   */
  get hasMoved() {
    return this._hasMoved;
  }

  /**
   * Set the hasMoved status of the Rook.
   * @param {boolean} hasMoved - Rook hasMoved status.
   */
  set hasMoved(hasMoved) {
    this._hasMoved = hasMoved;
  }

  /**
   * Method that validates the Rook Piece Movement.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   */
  isValidMove(board, destCoords) {
    if (
      (this.position.row === destCoords.row ||
        this.position.column === destCoords.column) &&
      (board[destCoords.row][destCoords.column] === null ||
        board[destCoords.row][destCoords.column].team !== this.team)
    ) {
      return true;
    }
    return false;
  }
}
