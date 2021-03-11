class Status {
  container: HTMLElement;

  constructor(container: HTMLElement) {
    this.init(container);
  }

  init = (container: HTMLElement): void => {
    this.container = document.createElement('div');
    this.container.className = 'status';
    this.container.innerHTML = `
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

  update = (): void => {};
}

export default Status;
