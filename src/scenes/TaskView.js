import Phaser from 'phaser';

import {
  getCurrentTask,
  getInventory,
  removeInventoryItem,
  getCurrentLocation,
  completeTask,
  addReview,
} from '../gameState';
import Review from '../entities/Review';
import { addNotification } from '../lib/Notifications';

const key = 'taskViewScene';
const taskListSceneKey = 'taskListScene';

let redrawRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
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
    const location = getCurrentLocation();
    const inventory = getInventory();

    const itemsRequired = {};
    task.items.forEach(item => {
      if (!itemsRequired[item]) {
        itemsRequired[item] = 0;
      }
      itemsRequired[item]++;
    });

    let canCompleteTask =
      location &&
      task.destination === location.name &&
      Object.entries(itemsRequired).every(([item, count]) => {
        return inventory[item] >= count;
      });

    // if a user can complete the task...
    if (canCompleteTask) {
      const completeTaskButton = this.add.text(100, 500, 'Complete Task');
      redrawRefs.push(completeTaskButton);

      completeTaskButton.setInteractive({ useHandCursor: true });
      completeTaskButton.on('pointerdown', () => this.completeTask(task));
    }

    const customerName = this.add.text(
      100,
      140,
      `Deliver to: ${task.customerName}`
    );
    redrawRefs.push(customerName);

    const destinationName = this.add.text(
      100,
      120,
      `Located at: ${task.destination}`
    );
    redrawRefs.push(destinationName);

    const description = this.add.text(
      100,
      180,
      task.name,
      {
        fill: '#FFFF00',
        wordWrap: { width: 600 }
      }
    );
    redrawRefs.push(description);

    task.items.forEach((taskName, index) => {
      let taskItemRef = this.add.text(
        100,
        200 + description.height + 20 * index,
        `* ${taskName} ${inventory[taskName] > 0 ? 'x️' : ''}️`
      );
      redrawRefs.push(taskItemRef);
    });
  }

  completeTask(task) {
    // deplete inventory
    task.items.forEach(item => {
      removeInventoryItem(item);
    });

    // remove task
    completeTask(task);

    // review
    addReview(new Review(
      task.positiveReview,
      task.customerName,
      5
    ));
    addNotification('You got a new review!', 'green');
    this.scene.switch(taskListSceneKey);
  }

  backToTaskList() {
    this.scene.switch(taskListSceneKey);
  }
}
