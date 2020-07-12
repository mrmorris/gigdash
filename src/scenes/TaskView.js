import Phaser from 'phaser';

import {
  getCurrentTask,
  getInventory,
  completeTask,
  canCompleteTask,
} from '../gameState';
import { addNotification } from '../lib/Notifications';
import {renderMenu} from "../lib/Menu";

const key = 'taskViewScene';
const taskListSceneKey = 'taskListScene';

let redrawRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    this.renderTask();
    renderMenu(this, key);
    this.events.on('wake', () => this.renderTask());
  }

  renderTask() {
    redrawRefs.forEach((ref) => {
      ref.destroy();
    });
    redrawRefs = [];

    const task = getCurrentTask();
    const inventory = getInventory();

    // if a user can complete the task...
    if (canCompleteTask(task)) {
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
    completeTask(task);
    addNotification('👍 You got a good review!', 'green');
    this.scene.switch(taskListSceneKey);
  }
}
