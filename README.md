# React Chess Game

This is my first project using React Framework.

This Chess Game is deployed at: https://bastosdiegol.github.io/react-chess/

Project Characteristics:

<ul>
    <li>Chess Game "Engine" using JavaScript Classes. Main points:</li>
    <ul>
        <li>Class Chess as the brain of the game, holding all relevant game attributes</li>
        <li>Pieces classes designed with a Parent class Piece and every Child extending it</li>
        <li>Each child class responsible for validating its own movement</li>
        <li>Parent class defining main attributes and common methods</li>
    </ul>
    <li>React Framework for the Chess UI. List of Components:</li>
    <ul>
        <li>Header Component containing settings menus</li>
        <li>Chessboard Component responsible for the chessboard and pieces</li>
        <li>Theme Component allowing multiple CSS Color Scheme to be applied on UI</li>
        <li>Localization Component loading Languages from JSON file</li>
        <li>Piece Graveyard Component displaying captured pieces</li>
        <li>Move History component displaying algebraic notation logging</li>
    </ul>
</ul>

In development:

<ul>
    <li>Check Validation</li>
    <li>Checkmate Validation</li>
</ul>
