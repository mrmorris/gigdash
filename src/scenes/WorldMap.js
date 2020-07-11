import Phaser from 'phaser';

import worldMapImg from '../assets/worldMap.jpg';
import playerImg from '../assets/player.png';

const key = 'worldMapScene';
const taskListSceneKey = 'taskListScene';

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {
    this.load.image('worldMap', worldMapImg);
    this.load.image('player', playerImg);
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const map = this.add.image(
      centerX,
      centerY,
      'worldMap'
    );
    // center and scale the map
    let scaleX = this.cameras.main.width / map.width;
    let scaleY = this.cameras.main.height / map.height;
    let scale = Math.max(scaleX, scaleY);
    map.setScale(scale).setScrollFactor(0);

    // add the player
    const player = this.add.image(centerX, centerY, 'player');
    // make it bounce...?
    this.tweens.add({
      targets: player,
      y: centerY + 10,
      duration: 500,
      ease: 'Circular',
      yoyo: true,
      loop: -1,
    });

    // a task list link
    const taskListLink = this.add.text(500, 50, 'Task List');
    taskListLink.setInteractive({ useHandCursor: true });
    taskListLink.on('pointerdown', () => this.viewTaskList());

    // add some "stores" and "neighborhoods"
    const store1 = this.add.text(300, 50, 'Grocery');
    const store2 = this.add.text(50, 100, 'Hardware');
    const store3 = this.add.text(100, 200, 'Liquor');

    store1.setInteractive({ useHandCursor: true });
    store1.on('pointerdown', () => this.travelTo(store1));

    store2.setInteractive({ useHandCursor: true });
    store2.on('pointerdown', () => this.travelTo(store3));

    store3.setInteractive({ useHandCursor: true });
    store3.on('pointerdown', () => this.travelTo(store3));
  }

  viewTaskList() {
    console.log('hi');
    this.scene.switch(taskListSceneKey);
  }

  travelTo(location) {

  }
}
