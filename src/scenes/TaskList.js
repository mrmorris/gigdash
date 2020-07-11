import Phaser from 'phaser';
import { getIncompleteTasks, setCurrentTask } from '../gameState';

const key = 'taskListScene';
const worldMapSceneKey = 'worldMapScene';
const taskViewSceneKey = 'taskViewScene';

let taskRefs = [];

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

    taskRefs.forEach((taskRef) => {
      taskRef.destroy();
    });

    taskRefs = [];

    tasks.slice(0, 15).forEach((task, index) => {
      let taskRef = this.add.text(
        100,
        140 + 20 * index,
        `${task.destination} - ${task.customerName}`
      );

      taskRef.setInteractive({ useHandCursor: true });
      taskRef.on('pointerdown', () => this.viewTask(task));

      taskRefs.push(taskRef);
    });
    if (tasks.length > 15) {
      const divider = this.add.text(100, 440, `----`);
      const moreTasksTest = this.add.text(
        100,
        460,
        `...There are ${tasks.length - 15} More Tasks to Complete`
      );

      taskRefs.push(divider);
      taskRefs.push(moreTasksTest);
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