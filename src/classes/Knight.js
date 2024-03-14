import Piece from "./Piece";
import Coords from "./Coords";
import APP_CONSTS from "../constants.js";

/**
 * Chess Knight Piece Class.
 * @class
 * @property {string} symbol - The symbol of the piece.
 * @property {string} name - The name of the piece.
 * @property {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Team which the piece belongs.
 * @property {Coords} coords - Piece position coordinates.
 */
export default class Knight extends Piece {
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
   * Method that validates the Knight Piece Movement.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   */
  isValidMove(board, destCoords) {
    if (
      (Math.abs(this.position.row - destCoords.row) === 2 &&
        Math.abs(this.position.column - destCoords.column) === 1) ||
      (Math.abs(this.position.column - destCoords.column) === 2 &&
        Math.abs(this.position.row - destCoords.row) === 1 &&
        (board[destCoords.row][destCoords.column] === null ||
          board[destCoords.row][destCoords.column].team !== this.team))
    ) {
      return true;
    }
    return false;
  }

  /**
   * Retrieves possible moves for the Knight on the given board.
   * @param {Array<Array<Piece|null>>} board - The game board represented as a 2D array.
   * @returns {Array<Coords>} An array containing coordinates representing valid moves for the pawn.
   */
  getMoveGuide(board) {
    let moveGuide = [];

    [
      [2, 1],
      [2, -1],
      [-2, 1],
      [-2, -1],
      [1, 2],
      [1, -2],
      [-1, 2],
      [-1, -2],
    ].forEach((offset) => {
      let targetRow = this.position.row + offset[0];
      let targetColumn = this.position.column + offset[1];

      if (
        targetRow >= 0 &&
        targetRow <= 7 &&
        targetColumn >= 0 &&
        targetColumn <= 7 &&
        (board[targetRow][targetColumn] === null ||
          board[targetRow][targetColumn].team !== this.team)
      )
        moveGuide.push(new Coords(targetRow, targetColumn));
    });

    return moveGuide;
  }
}
