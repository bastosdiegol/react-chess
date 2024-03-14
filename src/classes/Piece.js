import Coords from "./Coords";
import APP_CONSTS from "../constants";

/**
 * Chess Piece Class.
 * @class
 * @param {string} symbol - The symbol of the piece.
 * @param {string} name - The name of the piece.
 * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Team which the piece belongs.
 * @param {Coords} position - Piece position coordinates.
 */
export default class Piece {
  /**
   * Creates a new Piece instance.
   * @param {string} symbol - The symbol of the piece.
   * @param {string} name - The name of the piece.
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Team which the piece belongs.
   * @param {Coords} coords - Piece position coordinates.
   */
  constructor(symbol, name, team, coords) {
    this._symbol = symbol;
    this._name = name;
    this._team = team;
    this._position = coords;
  }

  /**
   * Get the symbol of the Piece.
   * @returns {string} Piece symbol.
   */
  get symbol() {
    return this._symbol;
  }

  /**
   * Set the symbol of the Piece
   * @param {string} symbol - Piece symbol.
   */
  set symbol(symbol) {
    this._symbol = symbol;
  }

  /**
   * Get the name of the Piece.
   * @returns {string} Piece Name.
   */
  get name() {
    return this._name;
  }

  /**
   * Set the name of the Piece
   * @param {string} name - Piece name.
   */
  set name(name) {
    this._name = name;
  }

  /**
   * Get the team of the Piece.
   * @returns {APP_CONSTS.WHITE | APP_CONSTS.BLACK} Piece Team.
   */
  get team() {
    return this._team;
  }

  /**
   * Set the team of the Piece
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Piece Team.
   */
  set team(team) {
    this._team = team;
  }

  /**
   * Get the position coordinates of the Piece.
   * @returns {Coords} Piece position coordinates.
   */
  get position() {
    return this._position;
  }

  /**
   * Set the position coordinates of the Piece
   * @param {Coords} coords - Piece position coordinates.
   */
  set position(coords) {
    this._position = coords;
  }

  /**
   * Abstract-like Method for Piece Movement.
   * Each Child of Piece Class must implement this method.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @returns {boolean} Movement is possible or not.
   */
  isValidMove(board, destCoords) {
    // Method must be implemented on Child Class
    return false;
  }

  /**
   * Abstract-like Method for Piece Movement.
   * Each Child of Piece Class must implement this method.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @param {object} specialMove - Object that holds the piece which perfomed special move.
   * @returns {boolean} Movement is possible or not.
   */
  isValidMove(board, destCoords, specialMove) {
    // Method must be implemented on Child Class
    return false;
  }

  /**
   * Method that checks whether the path towards final destination square is unobstructed.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} stepCoords - Initial coordinates of Piece Movement.
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @returns {boolean} Path is obstructed or not.
   */
  hasLineOfSight(board, { ...stepCoords }, destCoords) {
    // Checks if stepCoords equals destCoords
    if (
      stepCoords.row === destCoords.row &&
      stepCoords.column === destCoords.column
    ) {
      return false;
    }
    do {
      // Moves towards destCoords
      if (stepCoords.row > destCoords.row) stepCoords.row--;
      if (stepCoords.column > destCoords.column) stepCoords.column--;
      if (stepCoords.row < destCoords.row) stepCoords.row++;
      if (stepCoords.column < destCoords.column) stepCoords.column++;
      // stepCoords is not final destination
      if (
        stepCoords.row != destCoords.row ||
        stepCoords.column != destCoords.column
      ) {
        // Position is obtructed conditional
        if (board[stepCoords.row][stepCoords.column] != null) return false;
      } else if (
        stepCoords.row === destCoords.row &&
        stepCoords.column === destCoords.column
      ) {
        // Empty Destination Square
        if (board[stepCoords.row][stepCoords.column] === null) return true;
        else if (board[stepCoords.row][stepCoords.column].team === this.team) {
          // Same team piece holds the destination
          return false;
        } else {
          // Empty slot or opposing team piece
          return true;
        }
      }
    } while (
      stepCoords.row !== destCoords.row ||
      stepCoords.column !== destCoords.column
    );

    return false;
  }

  /**
   * Retrieves possible moves for the a Piece on the given board.
   * @param {Array<Array<Piece|null>>} board - The game board represented as a 2D array.
   * @param {Array<Array<number>>} directions - An array with the move directions of a piece.
   * @returns {Array<Coords>} An array containing coordinates representing valid moves for the pawn.
   */
  getMoveGuide(board, directions) {
    let moveGuide = [];

    directions.forEach((dir) => {
      let tempRow = this.position.row + dir[0];
      let tempColumn = this.position.column + dir[1];

      while (
        tempRow >= 0 &&
        tempRow <= 7 &&
        tempColumn >= 0 &&
        tempColumn <= 7 &&
        this.hasLineOfSight(
          board,
          this.position,
          new Coords(tempRow, tempColumn)
        )
      ) {
        moveGuide.push(new Coords(tempRow, tempColumn));
        tempRow += dir[0];
        tempColumn += dir[1];
      }
    });

    return moveGuide;
  }
}
