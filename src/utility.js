import APP_CONSTS from "./constants.js";
import rookWhite from "/assets/rook-white.svg";
import knightWhite from "/assets/knight-white.svg";
import bishopWhite from "/assets/bishop-white.svg";
import queenWhite from "/assets/queen-white.svg";
import kingWhite from "/assets/king-white.svg";
import pawnWhite from "/assets/pawn-white.svg";
import rookBlack from "/assets/rook-black.svg";
import knightBlack from "/assets/knight-black.svg";
import bishopBlack from "/assets/bishop-black.svg";
import queenBlack from "/assets/queen-black.svg";
import kingBlack from "/assets/king-black.svg";
import pawnBlack from "/assets/pawn-black.svg";

/**
 * Function to get the image URL for a chess piece.
 * @param {string} symbol - Symbol of the chess piece.
 * @returns {string|null} URL of the chess piece image or null if not found.
 */
function getPieceImg(symbol) {
  switch (symbol) {
    case APP_CONSTS.ROOK_BLACK:
      return rookBlack;
    case APP_CONSTS.KNIGHT_BLACK:
      return knightBlack;
    case APP_CONSTS.BISHOP_BLACK:
      return bishopBlack;
    case APP_CONSTS.QUEEN_BLACK:
      return queenBlack;
    case APP_CONSTS.KING_BLACK:
      return kingBlack;
    case APP_CONSTS.PAWN_BLACK:
      return pawnBlack;
    case APP_CONSTS.ROOK_WHITE:
      return rookWhite;
    case APP_CONSTS.KNIGHT_WHITE:
      return knightWhite;
    case APP_CONSTS.BISHOP_WHITE:
      return bishopWhite;
    case APP_CONSTS.QUEEN_WHITE:
      return queenWhite;
    case APP_CONSTS.KING_WHITE:
      return kingWhite;
    case APP_CONSTS.PAWN_WHITE:
      return pawnWhite;
    default:
      return null;
  }
}

export default getPieceImg;
