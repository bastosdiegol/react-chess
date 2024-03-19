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
    // Validates Line of Sight
    if (!this.hasLineOfSight(board, this.position, destCoords)) return false;

    const MOVE_DIRECTION =
      (destCoords.column - this.position.column) /
      Math.abs(destCoords.column - this.position.column);

    if (
      Math.abs(this.position.row - destCoords.row) <= 1 &&
      Math.abs(this.position.column - destCoords.column) <= 1 &&
      (board[destCoords.row][destCoords.column] === null ||
        board[destCoords.row][destCoords.column].team !== this.team)
    ) {
      return true;
    } else if (
      !this.hasMoved &&
      board[destCoords.row][destCoords.column + MOVE_DIRECTION] instanceof
        Rook &&
      !board[destCoords.row][destCoords.column + MOVE_DIRECTION].hasMoved &&
      board[destCoords.row][destCoords.column] === null
    ) {
      specialMove.piece = this;
      return true;
    }
    return false;
  }

  /**
   * Retrieves possible moves for the King on the given board.
   * @param {Array<Array<Piece|null>>} board - The game board represented as a 2D array.
   * @property {Object} specialMove - Holds last piece that made special move (Castling)
   * @returns {Array<Coords>} An array containing coordinates representing valid moves for the King.
   */
  getMoveGuide(board, specialMove) {
    let moveGuide = [];

    const MOVE_DIRECTIONS = [
      [1, 1],
      [-1, -1],
      [1, -1],
      [-1, 1],
      [1, 0],
      [-1, 0],
      [0, 1],
      [0, -1],
    ];

    MOVE_DIRECTIONS.forEach((dir) => {
      const TARGET_ROW = this.position.row + dir[0];
      const TARGET_COLUMN = this.position.column + dir[1];

      if (
        TARGET_ROW >= 0 &&
        TARGET_ROW <= 7 &&
        TARGET_COLUMN >= 0 &&
        TARGET_COLUMN <= 7 &&
        (board[TARGET_ROW][TARGET_COLUMN] === null ||
          board[TARGET_ROW][TARGET_COLUMN].team !== this.team)
      ) {
        moveGuide.push(new Coords(TARGET_ROW, TARGET_COLUMN));
      }
    });

    // Castling
    if (!this.hasMoved) {
      if (
        board[this.position.row][1] === null &&
        this.hasLineOfSight(
          board,
          this.position,
          new Coords(this.position.row, 1)
        )
      )
        moveGuide.push(new Coords(this.position.row, 1));
      if (
        board[this.position.row][6] === null &&
        this.hasLineOfSight(
          board,
          this.position,
          new Coords(this.position.row, 6)
        )
      )
        moveGuide.push(new Coords(this.position.row, 6));
    }

    return moveGuide;
  }
}

// TODO: Needs to verify for Check and Checkmate to moving and castling
