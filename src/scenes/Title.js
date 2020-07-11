import Phaser from 'phaser';

import logoImg from '../assets/logo.png';

const key = 'titleScene';
const worldMapSceneKey = 'worldMapScene';

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {
    this.load.image('logo', logoImg);
  }

  create() {
    const logo = this.add.image(400, 150, 'logo');
    const title = this.add.text(100, 100, 'Door Dash... but worse');
    const startButton = this.add.text(100, 200, 'Start Game');

    startButton.setInteractive({ useHandCursor: true });
    startButton.on('pointerdown', () => this.startGame());

    this.tweens.add({
      targets: logo,
      y: 450,
      duration: 2000,
      ease: 'Power2',
      yoyo: true,
      loop: -1,
    });
  }

  startGame() {
    this.scene.switch(worldMapSceneKey);
  }
}
