import Piece from "./Piece";
import Coords from "./Coords";
import APP_CONSTS from "../constants.js";

/**
 * Chess Queen Piece Class.
 * @class
 * @property {string} symbol - The symbol of the piece.
 * @property {string} name - The name of the piece.
 * @property {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Team which the piece belongs.
 * @property {Coords} coords - Piece position coordinates.
 */
export default class Queen extends Piece {
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
   * Method that validates the Queen Piece Movement.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   */
  isValidMove(board, destCoords) {
    if (
      Math.abs(this.position.row - destCoords.row) ===
        Math.abs(this.position.column - destCoords.column) ||
      ((this.position.row === destCoords.row ||
        this.position.column === destCoords.column) &&
        (board[destCoords.row][destCoords.column] === null ||
          board[destCoords.row][destCoords.column].team !== this.team))
    ) {
      return true;
    }
    return false;
  }
}
