import Phaser from 'phaser';

import { preloadMenu } from '../lib/Menu';
import { headerStyle } from '../lib/TextStyles';

import introVideo from '../assets/intro_video_portrait.mp4';
import logoImg from '../assets/xtramiles.png';

const key = 'titleScene';
const worldMapSceneKey = 'worldMapScene';
const creditsSceneKey = 'creditsScene';
let vid;

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {
    this.load.video('introVideo', introVideo);
    this.load.image('logo', logoImg);
    preloadMenu(this);
  }

  create() {
    vid = this.add.video(0, 0, 'introVideo').setOrigin(0);
    vid.setDisplaySize(600, 800);
    vid.on('complete', () => {
      vid.stop();
      this.startGame();
    });
    vid.play();

    const logo = this.add.image(260, 75, 'logo').setScale(.25);

    const startGame = this.add
      .text(225, 650, 'Start Game', headerStyle)
      .setOrigin(0);

    startGame.setInteractive({ useHandCursor: true }).on('pointerdown', () => {
      this.startGame();
    });

    const creditsButton = this.add
      .text(230, 700, 'Credits', headerStyle)
      .setOrigin(0);
    creditsButton.setInteractive({ useHandCursor: true });
    creditsButton.on('pointerdown', () => {
      this.scene.switch(creditsSceneKey);
    });
  }

  startGame() {
    vid.stop();
    this.scene.switch(worldMapSceneKey);
  }
}
