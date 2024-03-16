//   ___             _            _
//  / __|___ _ _  __| |_ __ _ _ _| |_ ___
// | (__/ _ \ ' \(_-<  _/ _` | ' \  _(_-<
//  \___\___/_||_/__/\__\__,_|_||_\__/__/

const APP_CONSTS = {
  BLACK: 0,
  WHITE: 1,
  ROOK_BLACK: "r",
  KNIGHT_BLACK: "n",
  BISHOP_BLACK: "b",
  QUEEN_BLACK: "q",
  KING_BLACK: "k",
  PAWN_BLACK: "p",
  ROOK_WHITE: "R",
  KNIGHT_WHITE: "N",
  BISHOP_WHITE: "B",
  QUEEN_WHITE: "Q",
  KING_WHITE: "K",
  PAWN_WHITE: "P",
  CASTLE_LEFT: 0,
  CASTLE_RIGHT: 1,
  COORDS_TO_CHAR: {
    ROW: {
      0: 7,
      1: 6,
      2: 5,
      3: 4,
      4: 3,
      5: 2,
      6: 1,
      7: 0,
    },
    COLUMN: {
      0: "a",
      1: "b",
      2: "c",
      3: "d",
      4: "e",
      5: "f",
      6: "g",
      7: "h",
    },
  },
};

const CHESSBOARD_THEMES = {
  theme_classic: {
    border: "5px solid #8B4513",
    whiteSquare: "#F0D9B5",
    blackSquare: "#B58863",
    selectedSquareBorder: "5px solid #50c878",
    guideSquareBackgroundMix: "#6bbbe3",
  },
  theme_silver: {
    border: "5px solid #C0C0C0",
    whiteSquare: "#F5F5F5",
    blackSquare: "#A9A9A9",
    selectedSquareBorder: "5px solid #50c878",
    guideSquareBackgroundMix: "#6bbbe3",
  },
  theme_pastel: {
    border: "5px solid #999",
    whiteSquare: "#ffe4e1",
    blackSquare: "#add8e6",
    selectedSquareBorder: "5px solid #50c878",
    guideSquareBackgroundMix: "#d989d9",
  },
  theme_grey: {
    border: "5px solid #333",
    whiteSquare: "#ddd",
    blackSquare: "#666",
    selectedSquareBorder: "5px solid #50c878",
    guideSquareBackgroundMix: "#6bbbe3",
  },
  theme_light: {
    border: "5px solid #999",
    whiteSquare: "#f0f0f0",
    blackSquare: "#ccc",
    selectedSquareBorder: "5px solid #50c878",
    guideSquareBackgroundMix: "#91c7cf",
  },
  theme_blue: {
    border: "5px solid #4682B4",
    whiteSquare: "#B0C4DE",
    blackSquare: "#4169E1",
    selectedSquareBorder: "5px solid #50c878",
    guideSquareBackgroundMix: "#93649c",
  },
  theme_green: {
    border: "5px solid #228B22",
    whiteSquare: "#98FB98",
    blackSquare: "#556B2F",
    selectedSquareBorder: "5px solid #50c878",
    guideSquareBackgroundMix: "#88ff00",
  },
};

export default APP_CONSTS;
export { CHESSBOARD_THEMES };
