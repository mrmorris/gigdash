import Phaser from 'phaser';

import {
  getCurrentTask,
  getInventory,
  removeInventoryItem,
  getCurrentLocation,
  completeTask,
  addReview,
} from '../gameState';
import getDispatcher from '../dispatcher';
import Review from '../entities/Review';
import { addNotification } from '../lib/Notifications';

class TaskViewScene extends Phaser.Scene {
  constructor(parent) {
    super(TaskViewScene.key);
    this.parent = parent;
    this.width = TaskViewScene.width;
    this.height = TaskViewScene.height;
    this.dispatcher = getDispatcher();
  }

  create() {
    const backButton = this.add.text(100, 540, '<< Close');

    this.cameras.main.setViewport(
      this.parent.x,
      this.parent.y,
      this.width,
      this.height
    );

    this.cameras.main.setBackgroundColor(0x0055aa);

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToTaskList());

    this.renderTask();

    this.dispatcher.emit('scene-opened');
  }

  renderTask() {
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
      completeTaskButton.setInteractive({ useHandCursor: true });
      completeTaskButton.on('pointerdown', () => this.completeTask(task));
    }

    this.add.text(100, 140, `Deliver to: ${task.customerName}`);
    this.add.text(100, 120, `Located at: ${task.destination}`);

    const description = this.add.text(100, 180, task.name, {
      fill: '#FFFF00',
      wordWrap: { width: 600 },
    });

    task.items.forEach((taskName, index) => {
      this.add.text(
        100,
        200 + description.height + 20 * index,
        '* ' + taskName + ' ' + (inventory[taskName] > 0 ? 'x️' : '')
      );
    });
  }

  completeTask(task) {
    // deplete inventory
    task.items.forEach(item => {
      removeInventoryItem(item);
    });

    // remove task
    this.dispatcher.emit('task-completed', task);
    completeTask(task);

    // review
    addReview(new Review(task.positiveReview, task.customerName, 5));
    addNotification('You got a new review!', 'green');

    // Close out this view
    this.backToTaskList();
  }

  backToTaskList() {
    this.dispatcher.emit('scene-closed');
    this.scene.remove(this.key);
  }
}

// Rendering Details
TaskViewScene.key = 'task-view';
TaskViewScene.x = 200;
TaskViewScene.y = 0;
TaskViewScene.width = 400;
TaskViewScene.height = 600;

export default TaskViewScene;
