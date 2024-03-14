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
}
