import Coords from "./Coords";

/**
 * Chess Piece Class.
 */
export default class Piece {
  #symbol;
  #name;
  #position;

  /**
   * Creates a new Piece instance.
   * @param {string} symbol - The symbol of the piece.
   * @param {string} name - The name of the piece.
   * @param {Coords} coords - Piece position coordinates.
   */
  constructor(symbol, name, coords) {
    this.#symbol = symbol;
    this.#name = name;
    this.#position = coords;
  }

  /**
   * Get the symbol of the Piece.
   * @returns {string} Piece symbol.
   */
  get symbol() {
    return this.#symbol;
  }

  /**
   * Set the symbol of the Piece
   * @param {string} symbol - Piece symbol.
   */
  set symbol(symbol) {
    this.#symbol = symbol;
  }

  /**
   * Get the name of the Piece.
   * @returns {string} Piece Name.
   */
  get name() {
    return this.#name;
  }

  /**
   * Set the name of the Piece
   * @param {string} name - Piece name.
   */
  set name(name) {
    this.#name = name;
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
