import Phaser from 'phaser';
import {getCurrentTask} from "../gameState";

const key = 'taskViewScene';
const taskListSceneKey = 'taskListScene';

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {}

  create() {
    const title = this.add.text(100, 100, 'Task View');
    const backButton = this.add.text(100, 200, 'Back to List');

    this.renderTask();

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToTaskList());
  }

  renderTask() {
    const task = getCurrentTask();
console.log(task);
    task.items.forEach((taskName, index) => {
      let taskItemRef = this.add.text(0, 20 * index, taskName);
    })
  }

  backToTaskList() {
    this.scene.switch(taskListSceneKey);
  }
}
