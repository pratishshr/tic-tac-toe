import Board from './board';
import Status from './status';

import GameState from '../enums/GameState';

class Game {
  state: GameState;
  container: HTMLElement;

  board: Board;
  status: Status;

  constructor(container: HTMLElement) {
    this.init(container);
  }

  init = (container: HTMLElement): void => {
    this.container = document.createElement('div');
    this.container.className = 'container';
    container.appendChild(this.container);

    this.status = new Status(this.container);
    this.board = new Board(this.container, {
      rows: 3,
      cols: 3,
    });
  };

  // Main Game Loop
  loop = (): void => {
    this.board.update();
    this.status.update();
  };
}

export default Game;
