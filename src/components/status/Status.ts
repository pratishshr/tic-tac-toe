import Cell from '../../enums/Cell';
import GameState from '../../enums/GameState';

interface Options {
  onRestart: () => void;
}

interface UpdateOptions {
  currentTurn: Cell;
  gameState: GameState;
}
class Status {
  container: HTMLElement;

  prevTurn: Cell;
  prevGameState: GameState;

  constructor(container: HTMLElement, options: Options) {
    this.init(container, options);
  }

  init = (container: HTMLElement, options: Options): void => {
    this.container = document.createElement('div');
    this.container.className = 'status';
    this.container.innerHTML = `
      <div class="game-over hidden">
        <div class="title">Congratulations!</div>
        <div class="sub-title">Player wins</div>
        <button class="restart">Play Again!</button>
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
    const button = document.getElementsByClassName('restart');
    button[0].addEventListener('click', options.onRestart);
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

  onGameOver = (winner: string): void => {
    const gameOverContainer = this.container.getElementsByClassName(
      'game-over'
    );
    const message = gameOverContainer[0].getElementsByClassName('sub-title');

    if (winner) {
      const player = winner === Cell.X ? '1' : '2';
      message[0].innerHTML = `Player ${player} (${winner}) wins!`;
    } else {
      message[0].innerHTML = "It's a tie";
    }

    gameOverContainer[0].className = 'game-over';
  };

  update = (options: UpdateOptions): void => {
    if (options.currentTurn === this.prevTurn) {
      return;
    }
    if (options.gameState === GameState.GAME_OVER) {
      if (this.prevGameState === options.gameState) {
        return;
      }

      this.onGameOver(this.prevTurn);
      this.prevGameState = options.gameState;
      return;
    }

    this.updateTurn(options.currentTurn);
  };

  remove = (): void => {
    this.container.remove();
  };
}

export default Status;
