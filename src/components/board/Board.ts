import Cell from '../../enums/Cell';
import GameState from '../../enums/GameState';

interface BoardOptions {
  rows: number;
  cols: number;
  onGameOver: () => void;
}

interface UpdateOptions {
  gameState: GameState;
}
class Board {
  currentTurn = Cell.X;

  rows: number;
  cols: number;
  state: string[];
  prevState: string[];
  container: HTMLElement;

  onGameOver: () => void;

  constructor(container: HTMLElement, options: BoardOptions) {
    this.init(container, options);
  }

  init = (container: HTMLElement, options: BoardOptions): void => {
    const state = this.initState(options);
    const boardContainer = this.createBoard(container);

    this.renderBoard(boardContainer, state);
    this.onGameOver = options.onGameOver;
  };

  initState = (options: BoardOptions): string[] => {
    this.rows = options.rows;
    this.cols = options.cols;
    this.state = Array(options.rows * options.cols).fill('');

    return this.state;
  };

  createBoard = (container: HTMLElement): HTMLElement => {
    this.container = document.createElement('div');
    this.container.className = 'board';

    container.appendChild(this.container);

    return this.container;
  };

  renderBoard = (container: HTMLElement, state: string[]): void => {
    let row = document.createElement('div');
    row.className = 'row row-0';

    for (let i = 0; i < state.length + 1; i++) {
      const cell = document.createElement('div');
      cell.className = `cell col-${i % this.cols}`;
      cell.onclick = () => {
        this.onCellClick(i);
      };

      row.appendChild(cell);

      if ((i + 1) % this.cols === 0) {
        container.appendChild(row);

        row = document.createElement('div');
        row.className = `row row-${(i + 1) / this.rows}`;
      }
    }
  };

  onCellClick = (index: number): void => {
    if (this.state[index]) {
      return;
    }

    this.state[index] = this.currentTurn;
    this.currentTurn = this.currentTurn === Cell.X ? Cell.O : Cell.X;
  };

  isEqual(a: string[], b: string[]): boolean {
    if (!a || !b) {
      return false;
    }

    if (a.length !== b.length) {
      return false;
    }

    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        return false;
      }
    }

    return true;
  }

  updateBoard = (state: string[]): void => {
    const cells = this.container.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = state[i];
    }

    this.prevState = [...this.state];
  };

  rowMatch = (state: string[], i: number): boolean => {
    let matches = 0;

    for (let j = 1; j < this.cols; j++) {
      if (state[i] && state[i] === state[i + j]) {
        matches++;
      }
    }

    if (matches == this.rows - 1) {
      return true;
    }

    return false;
  };

  checkWinner = (state: string[]): void => {
    for (let i = 0; i < state.length; i = i + this.rows) {
      if (this.rowMatch(state, i)) {
        this.onGameOver();
        return;
      }
    }
  };

  update = (options: UpdateOptions): void => {
    if (this.isEqual(this.state, this.prevState)) {
      return;
    }

    if (options.gameState === GameState.GAME_OVER) {
      return;
    }

    this.updateBoard(this.state);
    this.checkWinner(this.state);
  };
}

export default Board;
