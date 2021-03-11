import Board from './board';
import Status from './status';

import * as dom from '../utils/dom';

import GameState from '../enums/GameState';

class Game {
  board: Board;
  status: Status;
  container: HTMLElement;
  gameState = GameState.IN_PROGRESS;

  constructor(container: HTMLElement) {
    this.init(container);
  }

  init = (container: HTMLElement): void => {
    this.container = dom.create({
      element: 'div',
      className: 'container',
      appendTo: container,
    });

    this.start();
  };

  start = (): void => {
    this.status = new Status(this.container, {
      onRestart: this.restart,
    });
    this.board = new Board(this.container, {
      rows: 3,
      cols: 3,
      onGameOver: () => this.updateGameState(GameState.GAME_OVER),
    });
  };

  updateGameState = (gameState: GameState): void => {
    this.gameState = gameState;
  };

  restart = (): void => {
    this.board.remove();
    this.status.remove();

    this.start();
    this.gameState = GameState.IN_PROGRESS;
  };

  // Main Game Loop
  loop = (): void => {
    this.board.update({
      gameState: this.gameState,
    });

    this.status.update({
      gameState: this.gameState,
      currentTurn: this.board.currentTurn,
    });
  };
}

export default Game;
