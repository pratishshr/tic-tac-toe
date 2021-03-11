import Board from './board';
import Status from './status';

import GameState from '../enums/GameState';

class Game {
  gameState: GameState;
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
    this.gameState = GameState.INIT;
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
