import Phaser from 'phaser';

const key = 'failureScene';

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    this.add.text(100, 100, 'Failure');
  }
}
