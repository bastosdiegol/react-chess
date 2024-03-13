import Piece from "./Piece";
import Coords from "./Coords";
import APP_CONSTS from "../constants";
import Pawn from "./Pawn";
import Bishop from "./Bishop";
import Knight from "./Knight";
import King from "./King";
import Queen from "./Queen";
import Rook from "./Rook";

/**
 * Chess Game "Brain" Class.
 * @class
 * @property {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
 * @property {APP_CONSTS.WHITE | APP_CONSTS.BLACK} playerTurn - Holds current turn player info
 * @property {Piece} selectedPiece - The selected piece's on the board
 * @property {Piece[]} blackPieces - Array containing all black pieces
 * @property {Piece[]} whitePieces - Array containing all white pieces
 * @property {Object} specialMove - Holds last piece that made special move (En Passant)
 * @property {boolean} pawnDoubleStep - Last move was a pawn two-square advance.
 */
export default class Chess {
  /**
   * Creates an instance of Chess Game.
   * @constructor
   */
  constructor() {
    this.board = Array.from({ length: 8 }, () => Array.from({ length: 8 }));
    this.playerTurn = APP_CONSTS.WHITE;
    this.selectedPiece = null;
    this.blackPieces = [];
    this.whitePieces = [];
    this.specialMove = { piece: null };
  }

  /**
   * Initializes a new game of chess.
   */
  newGame() {
    this.blackPieces = [];
    this.whitePieces = [];

    const BLACK_MAIN_PIECES = [
      { symbol: APP_CONSTS.ROOK_BLACK, name: "Black Rook" },
      { symbol: APP_CONSTS.KNIGHT_BLACK, name: "Black Knight" },
      { symbol: APP_CONSTS.BISHOP_BLACK, name: "Black Bishop" },
      { symbol: APP_CONSTS.QUEEN_BLACK, name: "Black Queen" },
      { symbol: APP_CONSTS.KING_BLACK, name: "Black King" },
      { symbol: APP_CONSTS.BISHOP_BLACK, name: "Black Bishop" },
      { symbol: APP_CONSTS.KNIGHT_BLACK, name: "Black Knight" },
      { symbol: APP_CONSTS.ROOK_BLACK, name: "Black Rook" },
    ];
    const WHITE_MAIN_PIECES = [
      { symbol: APP_CONSTS.ROOK_WHITE, name: "White Rook" },
      { symbol: APP_CONSTS.KNIGHT_WHITE, name: "White Knight" },
      { symbol: APP_CONSTS.BISHOP_WHITE, name: "White Bishop" },
      { symbol: APP_CONSTS.QUEEN_WHITE, name: "White Queen" },
      { symbol: APP_CONSTS.KING_WHITE, name: "White King" },
      { symbol: APP_CONSTS.BISHOP_WHITE, name: "White Bishop" },
      { symbol: APP_CONSTS.KNIGHT_WHITE, name: "White Knight" },
      { symbol: APP_CONSTS.ROOK_WHITE, name: "White Rook" },
    ];

    // Set up black main pieces
    this.setupMainPieces(0, BLACK_MAIN_PIECES, APP_CONSTS.BLACK);

    // Set up black pawns
    this.setupPawns(1, APP_CONSTS.PAWN_BLACK, APP_CONSTS.BLACK);

    // Set null for rows 2 to 5
    for (let row = 2; row < 6; row++) {
      this.board[row].fill(null);
    }

    // Set up white pawns
    this.setupPawns(6, APP_CONSTS.PAWN_WHITE, APP_CONSTS.WHITE);

    // Set up white main pieces
    this.setupMainPieces(7, WHITE_MAIN_PIECES, APP_CONSTS.WHITE);
  }

  /**
   * Set up the main pieces (rooks, knights, bishops, queen, king) for a given color.
   * @param {number} row - The row index where the pieces will be set up.
   * @param {Array<{symbol: string, name: string}>} pieces - Array containing pieces' information.
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - The color of the pieces to be set up.
   */
  setupMainPieces(row, pieces, team) {
    pieces.forEach((piece, columnIndex) => {
      switch (piece.symbol) {
        case APP_CONSTS.ROOK_BLACK:
        case APP_CONSTS.ROOK_WHITE:
          this.board[row][columnIndex] = new Rook(
            piece.symbol,
            piece.name,
            team,
            new Coords(row, columnIndex)
          );
          break;
        case APP_CONSTS.KNIGHT_BLACK:
        case APP_CONSTS.KNIGHT_WHITE:
          this.board[row][columnIndex] = new Knight(
            piece.symbol,
            piece.name,
            team,
            new Coords(row, columnIndex)
          );
          break;
        case APP_CONSTS.BISHOP_BLACK:
        case APP_CONSTS.BISHOP_WHITE:
          this.board[row][columnIndex] = new Bishop(
            piece.symbol,
            piece.name,
            team,
            new Coords(row, columnIndex)
          );
          break;
        case APP_CONSTS.QUEEN_BLACK:
        case APP_CONSTS.QUEEN_WHITE:
          this.board[row][columnIndex] = new Queen(
            piece.symbol,
            piece.name,
            team,
            new Coords(row, columnIndex)
          );
          break;
        case APP_CONSTS.KING_BLACK:
        case APP_CONSTS.KING_WHITE:
          this.board[row][columnIndex] = new King(
            piece.symbol,
            piece.name,
            team,
            new Coords(row, columnIndex)
          );
          break;
        default:
          this.board[row][columnIndex] = null;
          break;
      }
      if (team === APP_CONSTS.WHITE)
        this.whitePieces.push(this.board[row][columnIndex]);
      else if (team === APP_CONSTS.BLACK)
        this.blackPieces.push(this.board[row][columnIndex]);
    });
  }

  /**
   * Set up the pawns for a given color.
   * @param {number} row - The row index where the pawns will be set up.
   * @param {string} symbol - The symbol representing the pawns.
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - The color of the pawns to be set up.
   */
  setupPawns(row, symbol, team) {
    this.board[row].fill().forEach((_, columnIndex) => {
      this.board[row][columnIndex] = new Pawn(
        symbol,
        team ? "White Pawn" : "Black Pawn",
        team,
        new Coords(row, columnIndex)
      );
      if (team === APP_CONSTS.WHITE)
        this.whitePieces.push(this.board[row][columnIndex]);
      else if (team === APP_CONSTS.BLACK)
        this.blackPieces.push(this.board[row][columnIndex]);
    });
  }

  /**
   * Moves the selectedPiece to a new destination.
   * @param {Coords} destCoords - Destination coordinates of Piece Movement.
   * @returns {boolean} Move was successful or not.
   */
  movePiece(destCoords) {
    // Variable that checks if last move special piece needs to be cleared
    let clearSpecial = this.specialMove.piece ? true : false;
    let enemyPiece;
    // Checks for Line of Sight before moving
    let hasLoS;
    if (this.selectedPiece instanceof Knight) {
      hasLoS = true; // Knight Exception
    } else {
      hasLoS = this.selectedPiece.hasLineOfSight(
        this.board,
        this.selectedPiece.position,
        destCoords
      );
    }
    // Checks if the movement is valid - accordingly with each Piece Rule
    let isMoveValid;
    if (this.selectedPiece instanceof Piece) {
      // Pawn Method override due to En Passant
      switch (true) {
        case this.selectedPiece instanceof Pawn:
          isMoveValid = this.selectedPiece.isValidMove(
            this.board,
            destCoords,
            this.specialMove
          );
          break;
        default:
          isMoveValid = this.selectedPiece.isValidMove(this.board, destCoords);
          break;
      }
    }

    if (hasLoS && isMoveValid) {
      // En Passant Treatment
      if (
        this.selectedPiece instanceof Pawn &&
        this.specialMove.piece != null &&
        this.selectedPiece.isMoveEnPassant(
          this.board,
          destCoords,
          this.specialMove.piece
        )
      ) {
        // Get En Passant enemy piece
        enemyPiece =
          this.board[
            this.selectedPiece.team ? destCoords.row + 1 : destCoords.row - 1
          ][destCoords.column];
        // Clear enemy position on board
        this.board[
          this.selectedPiece.team ? destCoords.row + 1 : destCoords.row - 1
        ][destCoords.column] = null;
      } else {
        // Get Default Enemy piece
        enemyPiece = this.board[destCoords.row][destCoords.column];
      }
      // Remove the enemy piece from the opposing team array
      if (enemyPiece !== null && enemyPiece.team === APP_CONSTS.WHITE) {
        this.whitePieces.splice(
          this.whitePieces.findIndex((item) => item === enemyPiece),
          1
        );
      } else if (enemyPiece !== null && enemyPiece.team === APP_CONSTS.BLACK) {
        this.blackPieces.splice(
          this.blackPieces.findIndex((item) => item === enemyPiece),
          1
        );
      }
      // Update the board reflecting current piece movement
      this.board[destCoords.row][destCoords.column] = this.selectedPiece;
      this.board[this.selectedPiece.position.row][
        this.selectedPiece.position.column
      ] = null;
      // Update the Piece Position
      this.selectedPiece.position = destCoords;
      // Clear Selected Piece
      this.selectedPiece = null;
      // Flip Turn
      this.playerTurn = this.playerTurn ? APP_CONSTS.BLACK : APP_CONSTS.WHITE;
      // Clear Special Piece Movement if needed
      if (clearSpecial) this.specialMove.piece = null;
      return true;
    }

    return false;
  }
}
