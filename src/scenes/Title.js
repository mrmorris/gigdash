import Phaser from 'phaser';

import logoImg from '../assets/logo.png';
import {preloadMenu} from "../lib/Menu";

const key = 'titleScene';
const worldMapSceneKey = 'worldMapScene';
const creditsSceneKey = 'creditsScene';

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {
    this.load.image('logo', logoImg);
    preloadMenu(this);
  }

  create() {
    const logo = this.add.image(400, 150, 'logo');
    const title = this.add.text(100, 100, 'Door Dash... but worse');
    const startButton = this.add.text(100, 200, 'Start Game');
    const creditsButton = this.add.text(100, 300, 'Credits');

    startButton.setInteractive({ useHandCursor: true });
    startButton.on('pointerdown', () => this.startGame());

    creditsButton.setInteractive({ useHandCursor: true });
    creditsButton.on('pointerdown', () => this.scene.switch(creditsSceneKey));

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
