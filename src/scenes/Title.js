import Phaser from 'phaser';

import { preloadMenu } from '../lib/Menu';
import { headerStyle } from '../lib/TextStyles';

import introVideo from '../assets/intro_video_portrait.mp4';
import logoImg from '../assets/xtramiles.png';

import worldMapImg from '../assets/world-map.png';
import playerImg from '../assets/player.png';
import starImg from '../assets/star.png';

import negativeReviewSound from '../assets/negative_review_sfx.mp3';
import positiveReviewSound from '../assets/positive_review.mp3';
import newTaskSound from '../assets/new_task.mp3';
import bgMusicSound from '../assets/bg_music.mp3';
import travelingSound from '../assets/travelling.mp3';

const key = 'titleScene';
const worldMapSceneKey = 'worldMapScene';
const creditsSceneKey = 'creditsScene';
let vid;
let progressBar;
let progressBox;
let loadingText;
let percentText;

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {
    progressBar = this.add.graphics();
    progressBox = this.add.graphics();
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect(150, 270, 320, 50);

    var width = this.cameras.main.width;
    var height = this.cameras.main.height;
    loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {
        font: '20px monospace',
        fill: '#ffffff',
      },
    });
    loadingText.setOrigin(0.5, 0.5);

    percentText = this.make.text({
      x: width / 2,
      y: height / 2 - 5,
      text: '0%',
      style: {
        font: '18px monospace',
        fill: '#ffffff',
      },
    });
    percentText.setOrigin(0.5, 0.5);

    this.load.on('progress', function (value) {
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect(160, 280, 300 * value, 30);
    });

    this.load.on('complete', function () {});

    this.load.video('introVideo', introVideo);
    this.load.image('logo', logoImg);
    this.load.image('worldMap', worldMapImg);
    this.load.image('player', playerImg);
    this.load.image('star', starImg);

    this.load.audio('bgMusic', bgMusicSound);
    this.load.audio('travellingSFX', travelingSound);
    this.load.audio('newTaskSFX', newTaskSound);

    this.load.audio('negativeReviewSFX', negativeReviewSound);
    this.load.audio('positiveReviewSFX', positiveReviewSound);

    preloadMenu(this);
  }

  create() {
    const clickToPlay = this.add.text(225, 450, 'Click to Play', headerStyle);

    clickToPlay
      .setInteractive({ useHandCursor: true })
      .on('pointerdown', () => {
        progressBar.destroy();
        progressBox.destroy();
        loadingText.destroy();
        percentText.destroy();
        this.renderTitleScreen();
      });
  }

  renderTitleScreen() {
    vid = this.add.video(0, 0, 'introVideo').setOrigin(0);
    vid.setDisplaySize(600, 800);
    vid.on('complete', () => {
      this.startGame();
    });
    vid.play();

    const logo = this.add.image(260, 75, 'logo').setScale(0.25);

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
    vid.destroy();
    this.scene.switch(worldMapSceneKey);
  }
}
