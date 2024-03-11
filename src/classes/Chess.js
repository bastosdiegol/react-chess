import Piece from "./Piece";
import Coords from "./Coords";
import APP_CONSTS from "../constants";

/**
 * Chess Game "Brain" Class.
 * @class
 * @property {Array<Array<Piece>>} board - Matrix that contains all Chess pieces
 * @property {APP_CONSTS.WHITE | APP_CONSTS.BLACK} playerTurn - Holds current turn player info
 * @property {Coords} selectedPiece - The currently selected piece's coordinates
 * @property {Piece[]} blackPieces - Array containing all black pieces
 * @property {Piece[]} whitePieces - Array containing all white pieces
 */
export default class Chess {
  /**
   * Creates an instance of Chess Game.
   * @constructor
   */
  constructor() {
    this.board = Array.from({ length: 8 }, () => Array.from({ length: 8 }));
    this.playerTurn = APP_CONSTS.WHITE;
    this.selectedPiece = new Coords(null, null);
    this.blackPieces = [];
    this.whitePieces = [];
    this.newGame();
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
      { symbol: APP_CONSTS.KNIGH_TWHITE, name: "White Knight" },
      { symbol: APP_CONSTS.BISHOP_WHITE, name: "White Bishop" },
      { symbol: APP_CONSTS.QUEEN_WHITE, name: "White Queen" },
      { symbol: APP_CONSTS.KING_WHITE, name: "White King" },
      { symbol: APP_CONSTS.BISHOP_WHITE, name: "White Bishop" },
      { symbol: APP_CONSTS.KNIGH_TWHITE, name: "White Knight" },
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
      this.board[row][columnIndex] = new Piece(
        piece.symbol,
        piece.name,
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
   * Set up the pawns for a given color.
   * @param {number} row - The row index where the pawns will be set up.
   * @param {string} symbol - The symbol representing the pawns.
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - The color of the pawns to be set up.
   */
  setupPawns(row, symbol, team) {
    this.board[row].fill().forEach((_, columnIndex) => {
      this.board[row][columnIndex] = new Piece(
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
}
