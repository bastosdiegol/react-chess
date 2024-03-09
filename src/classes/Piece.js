import Coords from "./Coords";

/**
 * Chess Piece Interface-like Class.
 */
export default class Piece {
  #symbol;
  #position;

  /**
   * Creates a new Piece instance.
   * @param {string} symbol - The name of the piece.
   * @param {Coords} coords - Piece position coordinates.
   */
  constructor(symbol, coords) {
    this.#symbol = symbol;
    this.#position = coords;
  }

  /**
   * Get the name of the Piece.
   * @returns {string} Piece Name.
   */
  get symbol() {
    return this.#symbol;
  }

  /**
   * Set the name of the Piece
   * @param {string} symbol - Piece name.
   */
  set symbol(symbol) {
    this.#symbol = symbol;
  }

  /**
   * Get the position coordinates of the Piece.
   * @returns {Coords} Piece position coordinates.
   */
  get position() {
    return this.#position;
  }

  /**
   * Set the position coordinates of the Piece
   * @param {Coords} coords - Piece position coordinates.
   */
  set position(coords) {
    this.#position = coords;
  }

  /**
   * Abstract-like Method for Piece Movement.
   * @param {Coord} destCoords - Destination coordinates of Piece Movement.
   */
  movePiece(destCoords) {
    throw new Error("movePiece method must be implemented");
  }
}
