import Phaser from 'phaser';
import {
  getCurrentLocation,
  getIncompleteTasks,
  setCurrentTask,
} from '../gameState';

const key = 'taskListScene';
const worldMapSceneKey = 'worldMapScene';
const taskViewSceneKey = 'taskViewScene';

let redrawRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const title = this.add.text(100, 100, 'Your Tasks');
    const backButton = this.add.text(100, 540, 'Back to Map');

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToMap());

    this.renderTaskList();
    this.events.on('wake', () => this.renderTaskList());
  }

  renderTaskList() {
    const tasks = getIncompleteTasks();
    const location = getCurrentLocation();

    redrawRefs.forEach((taskRef) => {
      taskRef.destroy();
    });
    redrawRefs = [];

    if (location) {
      let locationName = this.add.text(100, 20, `You're at: ${location.name}`);
      redrawRefs.push(locationName);
    }

    tasks.slice(0, 15).forEach((task, index) => {
      let taskRef = this.add.text(
        100,
        140 + 20 * index,
        `${task.destination} - ${task.customerName}`
      );

      taskRef.setInteractive({ useHandCursor: true });
      taskRef.on('pointerdown', () => this.viewTask(task));

      redrawRefs.push(taskRef);
    });
    if (tasks.length > 15) {
      const divider = this.add.text(100, 440, `----`);
      const moreTasksTest = this.add.text(
        100,
        460,
        `...There are ${tasks.length - 15} More Tasks to Complete`
      );

      redrawRefs.push(divider);
      redrawRefs.push(moreTasksTest);
    }
  }

  backToMap() {
    this.scene.switch(worldMapSceneKey);
  }

  viewTask(task) {
    setCurrentTask(task);
    this.scene.switch(taskViewSceneKey);
  }
}
