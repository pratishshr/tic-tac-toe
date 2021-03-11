import './index.css';

import Game from './components/Game';

import * as settings from './constants/settings';

function init(): void {
  let nextFrame = Date.now();

  const container = document.getElementById('root');
  const game = new Game(container);

  function nextAnimationFrame() {
    const now = Date.now();

    if (nextFrame < now) {
      game.loop();

      nextFrame = now + settings.TICK_RATE;
    }

    requestAnimationFrame(nextAnimationFrame);
  }

  requestAnimationFrame(nextAnimationFrame);
}

init();
