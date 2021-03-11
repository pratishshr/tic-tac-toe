import Cell from '../../enums/Cell';
import GameState from '../../enums/GameState';

interface UpdateOptions {
  currentTurn: Cell;
  gameState: GameState;
}
class Status {
  container: HTMLElement;

  prevTurn: Cell;
  prevGameState: GameState;

  constructor(container: HTMLElement) {
    this.init(container);
  }

  init = (container: HTMLElement): void => {
    this.container = document.createElement('div');
    this.container.className = 'status';
    this.container.innerHTML = `
      <div class="game-over">
        <div class="title">Game Over!</div>
        <div class="sub-title">Player 1 (X) wins!</div>
      </div>
      <div class="turns">
        <div class="players">
          <div class="player"> 
            P1 (X)
          </div>
          <div class="player">
            P2 (O)
          </div>
        </div>
      </div>
    `;

    container.appendChild(this.container);
  };

  updateTurn = (turn: Cell): void => {
    const players = this.container.getElementsByClassName('player');

    if (turn === Cell.X) {
      players[0].className = 'player active';
      players[1].className = 'player';
    }

    if (turn === Cell.O) {
      players[0].className = 'player';
      players[1].className = 'player active';
    }

    this.prevTurn = turn;
  };

  onGameOver = (): void => {
    console.log('GameOver');
  };

  update = (options: UpdateOptions): void => {
    if (
      options.currentTurn === this.prevTurn ||
      this.prevGameState === options.gameState
    ) {
      return;
    }

    if (options.gameState === GameState.GAME_OVER) {
      this.onGameOver();
      this.prevGameState = options.gameState;
      return;
    }

    this.updateTurn(options.currentTurn);
  };
}

export default Status;
