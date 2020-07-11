import Phaser from 'phaser';

const key = 'taskListScene';
const worldMapSceneKey = 'worldMapScene';

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {}

  create() {
    const title = this.add.text(100, 100, 'Task List');
    const backButton = this.add.text(100, 200, 'Back to Map');

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToMap());
  }

  backToMap() {
    this.scene.switch(worldMapSceneKey);
  }
}
