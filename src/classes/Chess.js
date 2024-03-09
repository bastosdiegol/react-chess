import Piece from "./Piece";
import Coords from "./Coords";

/**
 * Chess Game "Brain" Class.
 */
export default class Chess {
  constructor() {
    this.board = Array.from({ length: 8 }, () => Array.from({ length: 8 }));
    // this.board = new Array(8).fill().map(() => new Array(8).fill());
    console.log(this.board);
  }

  newGame() {
    const blackMainPieces = ["r", "n", "b", "q", "k", "b", "n", "r"];
    const whiteMainPieces = ["R", "N", "B", "Q", "K", "B", "N", "R"];

    // Set up black main pieces
    this.setupMainPieces(0, blackMainPieces);

    // Set up black pawns
    this.setupPawns(1, "p");

    // Set null for rows 2 to 5
    for (let row = 2; row < 6; row++) {
      this.board[row].fill(null);
    }

    // Set up white pawns
    this.setupPawns(6, "P");

    // Set up white main pieces
    this.setupMainPieces(7, whiteMainPieces);
  }

  setupMainPieces(row, pieces) {
    pieces.forEach((piece, columnIndex) => {
      this.board[row][columnIndex] = new Piece(
        piece,
        new Coords(row, columnIndex)
      );
    });
  }

  setupPawns(row, symbol) {
    this.board[row].fill().forEach((_, columnIndex) => {
      this.board[row][columnIndex] = new Piece(
        symbol,
        new Coords(row, columnIndex)
      );
    });
  }
}
