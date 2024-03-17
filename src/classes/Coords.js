import APP_CONSTS from "../constants";

/**
 * Structure that holds a Piece Coordinates.
 * @class
 */
export default class Coords {
  /**
   * Creates an instance of Piece Coordinates.
   * @constructor
   * @param {number} row - Row position.
   * @param {number} column - Column position.
   */
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }

  /**
   * Method that compares the Coords instance to a given row and column values.
   * @param {number} row - a row position.
   * @param {number} column - a column position.
   * @returns {boolean} If the object instance matches the given row and column.
   */
  equals(row, column) {
    return this.row === row && this.column === column;
  }

  /**
   * Method that compares the Coords instance to a Chess Coordinates string.
   * @param {string} chessCoords - Chess Coordinates string.
   * @returns {boolean} True if Chess coordinates string matches the Coords row and column values.
   */
  compareCoords(chessCoords) {
    return this.toString() === chessCoords;
  }

  /**
   * Method that convert the Coords object to Chess Coordinates string.
   * @returns {string} Chess Coordinates string.
   */
  toString() {
    return (
      APP_CONSTS.COORDS_TO_CHAR.COLUMN[this.column] +
      APP_CONSTS.COORDS_TO_CHAR.ROW[this.row]
    );
  }
}
