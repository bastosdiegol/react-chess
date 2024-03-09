/**
 * Chess Game "Brain" Class.
 */
export default class Chess {
  constructor() {
    this.board = new Array(8).fill().map(() => new Array(8).fill());
    console.log(this.board);
  }
}
