import Piece from "./Piece";
import Coords from "./Coords";

/**
 * Chess Game "Brain" Class.
 */
export default class Chess {
  /**
   * Creates an instance of Chess Game.
   * @constructor
   */
  constructor() {
    this.board = Array.from({ length: 8 }, () => Array.from({ length: 8 }));
    this.blackPieces = [];
    this.whitePieces = [];
    this.newGame();
  }

  newGame() {
    this.blackPieces = [];
    this.whitePieces = [];

    const blackMainPieces = [
      { symbol: "r", name: "Black Rook" },
      { symbol: "n", name: "Black Knight" },
      { symbol: "b", name: "Black Bishop" },
      { symbol: "q", name: "Black Queen" },
      { symbol: "k", name: "Black King" },
      { symbol: "b", name: "Black Bishop" },
      { symbol: "n", name: "Black Knight" },
      { symbol: "r", name: "Black Rook" },
    ];
    const whiteMainPieces = [
      { symbol: "R", name: "White Rook" },
      { symbol: "N", name: "White Knight" },
      { symbol: "B", name: "White Bishop" },
      { symbol: "Q", name: "White Queen" },
      { symbol: "K", name: "White King" },
      { symbol: "B", name: "White Bishop" },
      { symbol: "N", name: "White Knight" },
      { symbol: "R", name: "White Rook" },
    ];

    // Set up black main pieces
    this.setupMainPieces(0, blackMainPieces, "Black");

    // Set up black pawns
    this.setupPawns(1, "p", "Black");

    // Set null for rows 2 to 5
    for (let row = 2; row < 6; row++) {
      this.board[row].fill(null);
    }

    // Set up white pawns
    this.setupPawns(6, "P", "White");

    // Set up white main pieces
    this.setupMainPieces(7, whiteMainPieces, "White");
  }

  setupMainPieces(row, pieces, color) {
    pieces.forEach((piece, columnIndex) => {
      this.board[row][columnIndex] = new Piece(
        piece.symbol,
        piece.name,
        new Coords(row, columnIndex)
      );
      if (color === "White")
        this.whitePieces.push(this.board[row][columnIndex]);
      else if (color === "Black")
        this.blackPieces.push(this.board[row][columnIndex]);
    });
  }

  setupPawns(row, symbol, color) {
    this.board[row].fill().forEach((_, columnIndex) => {
      this.board[row][columnIndex] = new Piece(
        symbol,
        color + " Pawn",
        new Coords(row, columnIndex)
      );
      if (color === "White")
        this.whitePieces.push(this.board[row][columnIndex]);
      else if (color === "Black")
        this.blackPieces.push(this.board[row][columnIndex]);
    });
  }
}
