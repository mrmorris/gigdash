import Phaser from 'phaser';
import { getTasks, setCurrentTask } from '../gameState';

const key = 'taskListScene';
const worldMapSceneKey = 'worldMapScene';
const taskViewSceneKey = 'taskViewScene';

let taskRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const title = this.add.text(100, 100, 'Task List');
    const backButton = this.add.text(100, 540, 'Back to Map');

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToMap());

    this.renderTaskList();
    this.events.on('wake', () => this.renderTaskList());
  }

  renderTaskList() {
    const tasks = getTasks();

    taskRefs.forEach((taskRef) => {
      taskRef.destroy();
    });

    taskRefs = [];

    tasks
      .filter((task) => !task.isComplete)
      .forEach((task, index) => {
        let taskRef = this.add.text(100, 120 + (20 * index), task.name);

        taskRef.setInteractive({ useHandCursor: true });
        taskRef.on('pointerdown', () => this.viewTask(task));

        taskRefs.push(taskRef);
      });
  }

  backToMap() {
    this.scene.switch(worldMapSceneKey);
  }

  viewTask(task) {
    setCurrentTask(task);
    this.scene.switch(taskViewSceneKey);
  }
}
