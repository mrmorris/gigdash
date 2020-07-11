import Phaser from 'phaser';

import worldMapImg from '../assets/worldMap.jpg';
import playerImg from '../assets/player.png';
import { setCurrentLocation } from '../gameState';
import Shop from '../entities/Shop';
import Neighborhood from '../entities/Neighborhood';

const key = 'worldMapScene';
const taskListSceneKey = 'taskListScene';

let isTraveling = false;

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

    const map = this.add.image(centerX, centerY, 'worldMap');
    // center and scale the map
    let scaleX = this.cameras.main.width / map.width;
    let scaleY = this.cameras.main.height / map.height;
    let scale = Math.max(scaleX, scaleY);
    map.setScale(scale).setScrollFactor(0);

    // add the player
    this.player = this.add.image(centerX, centerY, 'player');

    // a task list link
    const taskListLink = this.add.text(500, 50, 'Task List');
    taskListLink.setInteractive({ useHandCursor: true });
    taskListLink.on('pointerdown', () => this.viewTaskList());

    // add some "stores"
    const store1 = new Shop(
      'Grocery Store',
      [],
      this.add.text(300, 50, 'Grocery'),
      () => this.travelTo(store1)
    );
    const store2 = new Shop(
      'Hardware Store',
      [],
      this.add.text(50, 100, 'Hardware'),
      () => this.travelTo(store2)
    );
    const store3 = new Shop(
      'Liquor Store',
      [],
      this.add.text(100, 200, 'Liquor'),
      () => this.travelTo(store3)
    );

    // add some hoods
    const hood1 = new Neighborhood(
      'Upper Crust',
      this.add.text(300, -50, 'Upper Crust'),
      () => this.travelTo(hood1)
    );
    const hood2 = new Neighborhood(
      'Hippy Town',
      this.add.text(50, -100, 'Hippy Town'),
      () => this.travelTo(hood2)
    );
    const hood3 = new Neighborhood(
      'East Dogmouth',
      this.add.text(100, -200, 'East Dogmouth'),
      () => this.travelTo(hood3)
    );
  }

  viewTaskList() {
    this.scene.switch(taskListSceneKey);
  }

  travelTo(location) {
    if (!isTraveling) {
      isTraveling = true;

      const tween = this.tweens.add({
        targets: this.player,
        x: location.ref.x,
        y: location.ref.y,
        duration: 2000, // @todo travel time...
        ease: 'Power2',
      });

      tween.on('complete', () => {
        console.log('Done travelin 2');
        isTraveling = false;

        setCurrentLocation(location);
      });
    }
  }
}
