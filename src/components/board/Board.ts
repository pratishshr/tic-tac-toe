import Cell from '../../enums/Cell';
import GameState from '../../enums/GameState';

import * as dom from '../../utils/dom';
import * as array from '../../utils/array';

interface BoardOptions {
  rows: number;
  cols: number;
  onGameOver: () => void;
}

interface UpdateOptions {
  gameState: GameState;
}

class Board {
  rows: number;
  cols: number;
  state: string[];
  prevState: string[];
  currentTurn = Cell.X;
  container: HTMLElement;

  onGameOver: () => void;

  constructor(container: HTMLElement, options: BoardOptions) {
    this.rows = options.rows;
    this.cols = options.cols;
    this.onGameOver = options.onGameOver;

    this.init(container, options);
  }

  init = (container: HTMLElement, options: BoardOptions): void => {
    this.state = this.initState(options);
    this.container = this.createBoard(container);

    this.renderBoard(this.container, this.state);
  };

  initState = (options: BoardOptions): string[] => {
    return Array(options.rows * options.cols).fill('');
  };

  createBoard = (container: HTMLElement): HTMLElement => {
    return dom.create({
      element: 'div',
      className: 'board',
      appendTo: container,
    });
  };

  renderBoard = (container: HTMLElement, state: string[]): void => {
    let row = dom.create({
      element: 'div',
      className: 'row row-0',
    });

    for (let i = 0; i < state.length + 1; i++) {
      dom.create({
        element: 'div',
        className: `cell col-${i % this.cols}`,
        appendTo: row,
        onClick: () => {
          this.onCellClick(i);
        },
      });

      if ((i + 1) % this.cols === 0) {
        container.appendChild(row);
        row = dom.create({
          element: 'div',
          className: `row row-${(i + 1) / this.rows}`,
        });
      }
    }
  };

  onCellClick = (index: number): void => {
    if (this.state[index]) {
      return;
    }

    this.state[index] = this.currentTurn;

    if (this.currentTurn === Cell.X) {
      this.currentTurn = Cell.O;
    } else {
      this.currentTurn = Cell.X;
    }
  };

  updateBoard = (state: string[]): void => {
    const cells = this.container.getElementsByClassName('cell');

    for (let i = 0; i < cells.length; i++) {
      cells[i].innerHTML = state[i];
    }

    this.prevState = [...this.state];
  };

  rowMatch = (state: string[], i: number): boolean => {
    let matches = 0;

    if (i % this.rows !== 0) {
      return false;
    }

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

  colMatch = (state: string[], i: number): boolean => {
    let matches = 0;

    if(i >= 3) { 
      return false;
    }

    for (let j = 1; j < this.cols; j++) {
      if (state[i] && state[i] === state[i + j * this.rows]) {
        matches++;
      }
    }

    if (matches == this.rows - 1) {
      return true;
    }

    return false;
  };

  diagonalMatch = (state: string[], i: number): boolean => {
    if (i === 0) {
      let matches = 0;
      for (let j = 1; j < this.cols; j++) {
        if (state[i] && state[i] === state[4 * j]) {
          matches++;
        }
      }
      if (matches === this.rows - 1) {
        return true;
      }
    }

    if (i === 2) {
      let matches = 0;
      for (let j = 1; j < this.cols; j++) {
        if (state[i] && state[i] === state[2 * (j + 1)]) {
          matches++;
        }
      }
      if (matches === this.rows - 1) {
        return true;
      }
    }

    return false;
  };

  isFull = (state: string[]): boolean => {
    return state.filter((s) => s).length === this.rows * this.cols;
  };

  checkWinner = (state: string[]): void => {
    for (let i = 0; i < state.length; i++) {
      if (
        this.rowMatch(state, i) ||
        this.colMatch(state, i) ||
        this.diagonalMatch(state, i)
      ) {
        this.onGameOver();
        return;
      }
    }

    if (this.isFull(state)) {
      this.onGameOver();
      this.currentTurn = Cell.NONE;
    }
  };

  update = (options: UpdateOptions): void => {
    if (array.isEqual(this.state, this.prevState)) {
      return;
    }

    if (options.gameState === GameState.GAME_OVER) {
      return;
    }

    this.updateBoard(this.state);
    this.checkWinner(this.state);
  };

  remove = (): void => {
    this.container.remove();
  };
}

export default Board;
