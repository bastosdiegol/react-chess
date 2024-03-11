import Coords from "./Coords";
import APP_CONSTS from "../constants";

/**
 * Chess Piece Class.
 * @class
 */
export default class Piece {
  #symbol;
  #name;
  #team;
  #position;

  /**
   * Creates a new Piece instance.
   * @param {string} symbol - The symbol of the piece.
   * @param {string} name - The name of the piece.
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - The name of the piece.
   * @param {Coords} coords - Piece position coordinates.
   */
  constructor(symbol, name, team, coords) {
    this.#symbol = symbol;
    this.#name = name;
    this.#team = team;
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
   * Moves a piece to a new destination.
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   */
  movePiece(destCoords) {
    // TODO: code movePiece
    let fovPass = this.checkFieldOfView(this.position, destCoords);
    console.log(fovPass);
    // this.checkMovePiece(destCoords);
    return false;
  }

  /**
   * Abstract-like Method for Piece Movement.
   * Each Child of Piece Class must implement this method.
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @returns {boolean} Movement is possible or not.
   */
  checkMovePiece(destCoords) {
    // TODO: code checkMovePiece in children classes
    // console.log(destCoords);
    throw new Error("checkMovePiece method must be implemented");
  }

  /**
   * Method that checks whether the path towards final destination square is unobstructed.
   * @param {Coords} initCoords - Initial coordinates of Piece Movement.
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @returns {boolean} Path is obstructed or not.
   */
  checkFieldOfView(initCoords, destCoords) {
    // TODO: code checkFieldOfView
    return false;
  }
}
