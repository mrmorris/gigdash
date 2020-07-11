import Phaser from 'phaser';
import { getCurrentTask, getInventory, removeInventoryItem, completeTask } from '../gameState';

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
    const task = getCurrentTask();
    const inventory = getInventory();

    let canCompleteTask = task.items.every((item) => {
      return inventory[item] > 0;
    });

    // if a user can complete the task...
    if (canCompleteTask) {
      const completeTaskButton = this.add.text(400, 300, 'Complete Task');

      completeTaskButton.setInteractive({ useHandCursor: true });
      completeTaskButton.on('pointerdown', () => this.completeTask(task));
    }

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToTaskList());

    this.renderTask(task);
  }

  renderTask(task) {
    const customerName = this.add.text(0, 0, `${task.customerName} would like...`);
    task.items.forEach((taskName, index) => {
      let taskItemRef = this.add.text(0, 20 + (20 * index), taskName);
    });
  }

  completeTask(task) {
    // deplete inventory
    task.items.every((item) => {
      removeInventoryItem(item);
    });

    console.log('Your current inventory', getInventory());

    // remove task
    // @todo - completion will give a positive review
    completeTask(task);
  }

  backToTaskList() {
    this.scene.switch(taskListSceneKey);
  }

  // @todo doesn't need to redraw on every tick
  update() {}
}
