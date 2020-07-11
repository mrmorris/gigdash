import Phaser from 'phaser';
import {getTasks, setCurrentTask} from "../gameState";

const key = 'taskListScene';
const worldMapSceneKey = 'worldMapScene';
const taskViewSceneKey = 'taskViewScene';

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {}

  create() {
    const title = this.add.text(100, 100, 'Task List');
    const backButton = this.add.text(100, 200, 'Back to Map');

    this.renderTaskList();

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToMap());
  }

  renderTaskList() {
    const tasks = getTasks();

    tasks.forEach((el, index) => {
      let taskRef = this.add.text(0, 20 * index, el.name);
      taskRef.setInteractive({ useHandCursor: true });
      taskRef.on('pointerdown', () => this.viewTask(el));
    })
  }

  backToMap() {
    this.scene.switch(worldMapSceneKey);
  }

  viewTask(task) {
    setCurrentTask(task);
    console.log('setting current', task);
    this.scene.switch(taskViewSceneKey);
  }
}
