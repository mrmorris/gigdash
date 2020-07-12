import Phaser from 'phaser';
import {
  getCurrentLocation,
  getIncompleteTasks,
  setCurrentTask,
  canCompleteTask,
  completeTask,
} from '../gameState';
import { addSceneForNotification, addNotification } from '../lib/Notifications';
import { renderMenu } from '../lib/Menu';
import { renderStars, updateStars } from '../lib/Stars';
import { headerStyle, subHeaderStyle, bodyStyle } from '../lib/TextStyles';

const key = 'taskListScene';
const worldMapSceneKey = 'worldMapScene';
const taskViewSceneKey = 'taskViewScene';
const xAlignment = 50;
const taskViewLimit = 30;

let redrawRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const title = this.add.text(xAlignment, 50, 'Your Tasks', headerStyle);

    addSceneForNotification(this);

    renderMenu(this, key);
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
      let locationName = this.add.text(
        xAlignment,
        100,
        `You're currently at: ${location.name}`,
        subHeaderStyle
      );
      redrawRefs.push(locationName);
    }

    tasks.slice(0, 30).forEach((task, index) => {
      let taskRef = this.add.text(
        xAlignment,
        160 + 20 * index,
        `${task.destination} - ${task.customerName} - ${
          task.items.length
        } item${task.items.length > 1 ? 's' : ''}`,
        bodyStyle
      );

      taskRef
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => this.viewTask(task))
        .on('pointerover', () => taskRef.setStyle({ color: 'cyan' }))
        .on('pointerout', () => taskRef.setStyle({ color: 'white' }));

      if (canCompleteTask(task)) {
        let completeRef = this.add.text(
          xAlignment + taskRef.width + 50,
          160 + 20 * index,
          `Complete task!`,
          {
            fill: 'cyan',
          }
        );

        completeRef.setInteractive({ useHandCursor: true });
        completeRef.on('pointerdown', () => this.completeTask(task));
        redrawRefs.push(completeRef);
      }

      redrawRefs.push(taskRef);
    });

    if (tasks.length > taskViewLimit) {
      const divider = this.add.text(xAlignment, 550, `----`, bodyStyle);
      const moreTasksTest = this.add.text(
        xAlignment,
        560,
        `...There are ${tasks.length - taskViewLimit} More Tasks to Complete`,
        bodyStyle
      );

      redrawRefs.push(divider);
      redrawRefs.push(moreTasksTest);
    }
    renderStars(this);
  }

  completeTask(task) {
    completeTask(task);
    addNotification('You got a good review!', 'green');
    this.scene.switch(worldMapSceneKey);
  }

  viewTask(task) {
    setCurrentTask(task);
    this.scene.switch(taskViewSceneKey);
  }

  update() {
    updateStars(this);
  }
}
