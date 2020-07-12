import Phaser from 'phaser';

import {
  getCurrentTask,
  getInventory,
  completeTask,
  canCompleteTask,
} from '../gameState';
import { addSceneForNotification, addNotification } from '../lib/Notifications';
import { renderMenu } from '../lib/Menu';
import { renderStars, updateStars } from '../lib/Stars';
import {
  headerStyle,
  subHeaderStyle,
  taskBodyStyle,
  bodyStyle,
} from '../lib/TextStyles';

const xAlignment = 50;
const key = 'taskViewScene';
const taskListSceneKey = 'taskListScene';

let redrawRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    this.renderTask();
    addSceneForNotification(this);
    renderMenu(this, key);
    renderStars(this);
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
      const completeTaskButton = this.add.text(
        xAlignment,
        500,
        'Complete Task',
        bodyStyle
      );
      redrawRefs.push(completeTaskButton);

      completeTaskButton.setInteractive({ useHandCursor: true });
      completeTaskButton.on('pointerdown', () => this.completeTask(task));
    }

    const destinationName = this.add.text(
      xAlignment,
      145,
      `at ${task.destination}`,
      subHeaderStyle
    );
    redrawRefs.push(destinationName);

    const customerName = this.add.text(
      xAlignment,
      120,
      `Deliver to: ${task.customerName}`,
      headerStyle
    );
    redrawRefs.push(customerName);

    const description = this.add.text(xAlignment, 180, task.name, {
      ...taskBodyStyle,
      wordWrap: { width: 500 },
    });
    redrawRefs.push(description);

    task.items.forEach((taskName, index) => {
      let taskItemRef = this.add.text(
        xAlignment,
        200 + description.height + 20 * index,
        `* ${taskName} ${inventory[taskName] > 0 ? 'x️' : ''}️`,
        bodyStyle
      );
      redrawRefs.push(taskItemRef);
    });
  }

  completeTask(task) {
    completeTask(task);
    addNotification('👍 You got a good review!', 'green');
    this.scene.switch(taskListSceneKey);
  }

  update() {
    updateStars(this);
  }
}
