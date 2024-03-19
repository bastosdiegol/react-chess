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
 * @property {Array<Array<Piece|null>>} board - Matrix that contains all Chess pieces
 * @property {APP_CONSTS.WHITE | APP_CONSTS.BLACK} playerTurn - Holds current turn player info
 * @property {Piece} selectedPiece - The selected piece's on the board
 * @property {Piece[]} blackPieces - Array containing all black pieces placed on board
 * @property {Piece[]} whitePieces - Array containing all white pieces placed on board
 * @property {Coords[]} moveGuide - Array containing possible moves for the selectedPiece
 * @property {Object} specialMove - Holds last piece that made special move (En Passant + Castling)
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
    this.moveGuide = [];
    this.specialMove = { piece: null };
    this.moveLog = [];
  }

  /**
   * Initializes a new game of chess.
   */
  newGame() {
    this.playerTurn = APP_CONSTS.WHITE;
    this.selectedPiece = null;
    this.blackPieces = [];
    this.whitePieces = [];
    this.moveGuide = [];
    this.specialMove = { piece: null };

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
   * Set up the pawns for a given team.
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
    // Log Variables
    let hasTaking = false;
    let hasCheck = false;
    let isCheckmate = false;
    let hasAmbiguity = false;
    let isCastling = false;
    let isEnPassant = false;
    let hasPromotion = false;

    // Checks if the movement is valid - accordingly with each Piece Rule
    if (this.isMoveAllowed(this.selectedPiece, destCoords)) {
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
        isEnPassant = true;
      }
      // Castling Treatment
      else if (
        this.selectedPiece instanceof King &&
        this.specialMove.piece != null
      ) {
        let castlingDirection;
        const CASTLING_DIRECTION =
          (destCoords.column - this.selectedPiece.position.column) /
          Math.abs(destCoords.column - this.selectedPiece.position.column);

        // Get the Rook
        let rookCastle =
          this.board[destCoords.row][destCoords.column + CASTLING_DIRECTION];
        // Check if Path is checked
        let isPathChecked = false;
        let columnIndex =
          this.selectedPiece.position.column + CASTLING_DIRECTION;
        while (columnIndex != rookCastle.position.column) {
          isPathChecked = this.isPositionChecked(
            new Coords(destCoords.row, columnIndex),
            this.playerTurn
          );
          if (isPathChecked) {
            this.specialMove.piece = null;
            alert("Castling path is checked.");
            return false;
          }
          columnIndex += CASTLING_DIRECTION;
        }
        // Clear the Rook square
        this.board[rookCastle.position.row][rookCastle.position.column] = null;
        // Update the Rook Position
        rookCastle.position.column = destCoords.column - CASTLING_DIRECTION;
        // Moves the Rook
        this.board[rookCastle.position.row][rookCastle.position.column] =
          rookCastle;
        enemyPiece = null;
        isCastling = true;
      } else {
        // Get Default Enemy piece
        enemyPiece = this.board[destCoords.row][destCoords.column];
      }

      // Default Movement and Taking Treatment

      // Check for Move Ambiguity
      hasAmbiguity = this.hasMoveAmbiguity(destCoords);
      // Remove the enemy piece from the opposing team array
      if (enemyPiece !== null && enemyPiece.team === APP_CONSTS.WHITE) {
        this.whitePieces.splice(
          this.whitePieces.findIndex((item) => item === enemyPiece),
          1
        );
        hasTaking = true;
      } else if (enemyPiece !== null && enemyPiece.team === APP_CONSTS.BLACK) {
        this.blackPieces.splice(
          this.blackPieces.findIndex((item) => item === enemyPiece),
          1
        );
        hasTaking = true;
      }
      // Log Move
      this.logMove(
        this.selectedPiece,
        destCoords,
        hasTaking,
        hasCheck,
        isCheckmate,
        isCastling,
        hasAmbiguity,
        isEnPassant,
        hasPromotion,
        ""
      );
      // Update the board reflecting current piece movement
      this.board[destCoords.row][destCoords.column] = this.selectedPiece;
      this.board[this.selectedPiece.position.row][
        this.selectedPiece.position.column
      ] = null;
      // Uncheck Pawn isFirstMove
      if (
        this.selectedPiece instanceof Pawn &&
        ((this.selectedPiece.team === APP_CONSTS.BLACK &&
          this.selectedPiece.position.row !== 1) ||
          (this.selectedPiece.team === APP_CONSTS.WHITE &&
            this.selectedPiece.position.row !== 6))
      )
        this.selectedPiece.isFirstMove = false;
      // Update the Piece Position
      this.selectedPiece.position = destCoords;
      // Update King and Rook hasMoved flag
      if (
        this.selectedPiece instanceof King ||
        this.selectedPiece instanceof Rook
      ) {
        this.selectedPiece.hasMoved = true;
      }
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

  /**
   * Method that sets up Chess.moveGuide array with a list of Coords.
   * These Coords are valid square move for the Chess.selectedPiece
   * Accordingly with its own Piece rules.
   */
  updateMoveGuide() {
    if (
      this.selectedPiece instanceof Pawn ||
      this.selectedPiece instanceof King
    )
      this.moveGuide = this.selectedPiece.getMoveGuide(
        this.board,
        this.specialMove
      );
    else this.moveGuide = this.selectedPiece.getMoveGuide(this.board);
  }

  /**
   * Logs a move in algebraic notation to the move log.
   * @param {Piece} piece - The piece making the move.
   * @param {Coords} destCoords - The destination coordinates of the move.
   * @param {boolean} [hasTaking=false] - Indicates if the move involves capturing an opponent's piece.
   * @param {boolean} [hasCheck=false] - Indicates if the move puts the opponent's king in check.
   * @param {boolean} [isCheckmate=false] - Indicates if the move results in checkmate.
   * @param {boolean} [isCastling=false] - Indicates if the move is a castling move.
   * @param {boolean} [isEnPassant=false] - Indicates if the move is an En Passant move.
   * @param {boolean} [hasPromotion=false] - Indicates if the move results in pawn promotion.
   * @param {string} [promotedSymbol=""] - The symbol of the piece the pawn is promoted to.
   */
  logMove(
    piece,
    destCoords,
    hasTaking = false,
    hasCheck = false,
    isCheckmate = false,
    isCastling = false,
    hasAmbiguity = false,
    isEnPassant = false,
    hasPromotion = false,
    promotedSymbol = ""
  ) {
    let logString = "";

    if (isEnPassant) {
      this.moveLog.push(
        piece.position.toString()[0] + "x" + destCoords.toString() + " e.p."
      );
      return;
    }

    if (piece instanceof King && isCastling) {
      if (piece.position.column - destCoords.column > 0) {
        this.moveLog.push("O-O-O");
        return;
      } else {
        this.moveLog.push("O-O");
        return;
      }
    }

    if (piece instanceof Pawn === false)
      logString += piece.symbol.toUpperCase();
    if ((piece instanceof Pawn && hasTaking) || hasAmbiguity)
      logString += piece.position.toString()[0];
    if (hasTaking) logString += "x";
    logString += destCoords.toString();
    if (hasPromotion) logString += promotedSymbol.toUpperCase();
    if (hasCheck) logString += "+";
    if (isCheckmate) logString += "#";

    this.moveLog.push(logString);
  }

  /**
   * Checks if moving the selected piece to the destination coordinates would result in move ambiguity.
   * Move ambiguity occurs when another piece of the same type on the opposite team can also move to the same destination.
   * @param {Coords} destCoords - The destination coordinates of the move.
   * @returns {boolean} True if there is move ambiguity, otherwise false.
   */
  hasMoveAmbiguity(destCoords) {
    let theOtherPiece;

    // Iterate through black pieces if the selected piece belongs to the black team
    if (this.selectedPiece.team === APP_CONSTS.BLACK) {
      this.blackPieces.some((piece) => {
        if (
          piece.constructor === this.selectedPiece.constructor &&
          piece.position !== this.selectedPiece.position
        ) {
          theOtherPiece = piece;
          return true;
        }
        return false;
      });
    }
    // Iterate through white pieces if the selected piece belongs to the white team
    if (this.selectedPiece.team === APP_CONSTS.WHITE) {
      this.whitePieces.some((piece) => {
        if (
          piece.constructor === this.selectedPiece.constructor &&
          piece.position !== this.selectedPiece.position
        ) {
          theOtherPiece = piece;
          return true;
        }
        return false;
      });
    }
    // If no other piece of the same type on the opposite team was found, return false
    if (!theOtherPiece) return false;
    // Knight Case - check if it can make a valid move to the destination coordinates
    if (theOtherPiece instanceof Knight)
      return theOtherPiece.isValidMove(this.board, destCoords);
    // Rook Case - check if it can make a valid move and has LoS to the destination coordinates
    if (theOtherPiece instanceof Rook)
      return (
        theOtherPiece.isValidMove(this.board, destCoords) &&
        theOtherPiece.hasLineOfSight(
          this.board,
          theOtherPiece.position,
          destCoords
        )
      );
  }

  /**
   * Checks if a position on the board is under threat by any opponent's piece.
   * @param {Coords} coords - The coordinates of the position to check.
   * @param {APP_CONSTS.WHITE | APP_CONSTS.BLACK} team - The team color whose king's position is being checked.
   * @returns {boolean} True if the position is under threat, otherwise false.
   */
  isPositionChecked(coords, team) {
    let hasCheck = false;
    if (team === APP_CONSTS.BLACK) {
      hasCheck = this.whitePieces.some((piece) =>
        this.isMoveAllowed(piece, coords)
      );
    } else {
      hasCheck = this.blackPieces.some((piece) =>
        this.isMoveAllowed(piece, coords)
      );
    }
    return hasCheck;
  }

  /**
   * Checks if a piece can move to the specified coordinates.
   * Equals to each Piece isValidMove
   * However its needs to exist due to Check verification
   * @param {Piece} piece - The piece to check if its move is allowed.
   * @param {Coords} coords - The coordinates to check if the piece can move to.
   * @returns {boolean} True if the move is allowed, otherwise false.
   */
  isMoveAllowed(piece, coords) {
    // Pawn Method override due to En Passant
    if (piece instanceof Pawn) {
      if (piece.isValidMove(this.board, coords, this.specialMove)) return true;
      // King Method override due to Clastling
    } else if (piece instanceof King) {
      if (
        piece.isValidMove(
          this.board,
          coords,
          this.specialMove,
          this.isPositionChecked
        ) &&
        !this.isPositionChecked(coords, this.playerTurn)
      )
        return true;
      // Rest of the pieces
    } else if (piece.isValidMove(this.board, coords)) return true;

    // Move not allowed
    return false;
  }

  /**
   * Function that sets a new selected piece.
   * @param {Piece} piece - The piece the player wants to select.
   * @returns {boolean} True if the piece is seleced, otherwise false.
   */
  selectNewPiece(piece) {
    if (piece.team === this.playerTurn) {
      this.selectedPiece = piece;
      this.updateMoveGuide();
      if (piece instanceof King) {
        this.moveGuide = this.moveGuide.filter(
          (coord) => !this.isPositionChecked(coord, this.playerTurn)
        );
      }
      return true;
    }
    return false;
  }
}
