/**
 * Structure that holds a Piece Coordinates.
 * @class
 */
export default class Coords {
  /**
   * Creates an instance of Piece Coordinates.
   * @constructor
   * @param {number} row - Piece position on the X/row axis.
   * @param {number} column - Piece position on the Y/column axis.
   */
  constructor(row, column) {
    this.row = row;
    this.column = column;
  }
}
