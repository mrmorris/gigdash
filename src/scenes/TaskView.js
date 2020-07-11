import Phaser from 'phaser';
import {
  getCurrentTask,
  getInventory,
  removeInventoryItem,
  completeTask,
} from '../gameState';

const key = 'taskViewScene';
const taskListSceneKey = 'taskListScene';

let redrawRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const title = this.add.text(100, 80, 'Task View');
    const backButton = this.add.text(100, 540, 'Back to List');

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToTaskList());

    this.renderTask();
    this.events.on('wake', () => this.renderTask());
  }

  renderTask() {
    redrawRefs.forEach((ref) => {
      ref.destroy();
    });
    redrawRefs = [];

    const task = getCurrentTask();
    const inventory = getInventory();

    let canCompleteTask = task.items.every((item) => {
      return inventory[item] > 0;
    });

    // if a user can complete the task...
    if (canCompleteTask) {
      const completeTaskButton = this.add.text(100, 500, 'Complete Task');
      redrawRefs.push(completeTaskButton);

      completeTaskButton.setInteractive({ useHandCursor: true });
      completeTaskButton.on('pointerdown', () => this.completeTask(task));
    }

    const destinationName = this.add.text(
      100,
      120,
      `@ ${task.destination}`
    );
    redrawRefs.push(destinationName);

    const customerName = this.add.text(
      100,
      140,
      `${task.customerName} has a request:`
    );
    redrawRefs.push(customerName);

    const description = this.add.text(
      100,
      160,
      task.name,
      {
        fill: '#FFFF00'
      }
    );
    redrawRefs.push(description);

    task.items.forEach((taskName, index) => {
      let taskItemRef = this.add.text(
        100,
        200 + 20 * index,
        `${taskName} ${inventory[taskName] > 0 ? 'x️' : ''}️`
      );
      redrawRefs.push(taskItemRef);
    });
  }

  completeTask(task) {
    // deplete inventory
    task.items.every((item) => {
      removeInventoryItem(item);
    });

    // remove task
    // @todo - completion will give a positive review
    completeTask(task);
  }

  backToTaskList() {
    this.scene.switch(taskListSceneKey);
  }
}
