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
   * Get the team of the Piece.
   * @returns {APP_CONSTS.WHITE | APP_CONSTS.BLACK} Piece Team.
   */
  get team() {
    return this.#team;
  }

  /**
   * Set the team of the Piece
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - Piece Team.
   */
  set team(team) {
    this.#team = team;
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
   * @param {Chess} chess - Chess Game object.
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   */
  movePiece(chess, destCoords) {
    // TODO: code movePiece
    let losPass = this.hasLineOfSight(chess.board, this.position, destCoords);
    if (losPass) {
      let enemyPiece = chess.board[destCoords.X][destCoords.Y];
      // Remove the enemy piece from the opposing team array
      if (enemyPiece !== null && enemyPiece.team === APP_CONSTS.WHITE) {
        chess.whitePieces.splice(
          chess.whitePieces.findIndex((item) => item === enemyPiece),
          1
        );
      } else if (enemyPiece !== null && enemyPiece.team === APP_CONSTS.BLACK) {
        chess.blackPieces.splice(
          chess.blackPieces.findIndex((item) => item === enemyPiece),
          1
        );
      }
      // Update the board
      chess.board[destCoords.X][destCoords.Y] = chess.selectedPiece;
      chess.board[chess.selectedPiece.position.X][
        chess.selectedPiece.position.Y
      ] = null;
      // Update the Piece
      chess.selectedPiece.position = destCoords;
      // Clear Selected Piece
      chess.selectedPiece = null;
      // Flip Turn
      chess.playerTurn = chess.playerTurn ? APP_CONSTS.BLACK : APP_CONSTS.WHITE;
    }
    // this.checkMovePiece(destCoords);
    return losPass;
  }

  /**
   * Abstract-like Method for Piece Movement.
   * Each Child of Piece Class must implement this method.
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @returns {boolean} Movement is possible or not.
   */
  isValidMove(destCoords) {
    // TODO: code isValidMove in children classes
    // console.log(destCoords);
    throw new Error("isValidMove method must be implemented");
  }

  /**
   * Method that checks whether the path towards final destination square is unobstructed.
   * @param {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
   * @param {Coords} stepCoords - Initial coordinates of Piece Movement.
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @returns {boolean} Path is obstructed or not.
   */
  hasLineOfSight(board, { ...stepCoords }, destCoords) {
    // TODO: Override this function for Knight Child Class
    // Checks if stepCoords equals destCoords
    if (stepCoords.X === destCoords.X && stepCoords.Y === destCoords.Y) {
      return false;
    }
    do {
      // Moves towards destCoords
      if (stepCoords.X > destCoords.X) stepCoords.X--;
      if (stepCoords.Y > destCoords.Y) stepCoords.Y--;
      if (stepCoords.X < destCoords.X) stepCoords.X++;
      if (stepCoords.Y < destCoords.Y) stepCoords.Y++;
      // stepCoords is not final destination
      if (stepCoords.X != destCoords.X || stepCoords.Y != destCoords.Y) {
        // Position is obtructed conditional
        if (board[stepCoords.X][stepCoords.Y] != null) return false;
      } else if (
        stepCoords.X === destCoords.X &&
        stepCoords.Y === destCoords.Y
      ) {
        // Empty Destination Square
        if (board[stepCoords.X][stepCoords.Y] === null) return true;
        else if (board[stepCoords.X][stepCoords.Y].#team === this.#team) {
          // Same team piece holds the destination
          return false;
        } else {
          // Empty slot or opposing team piece
          return true;
        }
      }
    } while (stepCoords.X !== destCoords.X || stepCoords.Y !== destCoords.Y);

    return false;
  }
}
