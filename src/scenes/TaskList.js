import Phaser from 'phaser';
import positiveReviewSound from '../assets/positive_review.mp3';
import {
  getCurrentLocation,
  getIncompleteTasks,
  setCurrentTask,
  canCompleteTask,
  completeTask,
  hasFailed,
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
let positiveReviewSFX;
let tasks = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {
    this.load.audio('positiveReviewSFX', positiveReviewSound);
  }

  create() {
    const title = this.add.text(xAlignment, 50, 'Orders', headerStyle);
    positiveReviewSFX = this.sound.add('positiveReviewSFX');

    addSceneForNotification(this);

    renderMenu(this, key);
    this.renderTaskList();
    this.events.on('wake', () => this.renderTaskList());
  }

  renderTaskList() {
    const location = getCurrentLocation();
    tasks = getIncompleteTasks();

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

    tasks.slice(0, taskViewLimit).forEach((task, index) => {
      let taskRef = this.add.text(
        xAlignment,
        160 + 25 * index,
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
          160 + 25 * index,
          `Deliver!`,
          {
            fontSize: '12px',
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
        `...There are ${
          tasks.length - taskViewLimit
        } more orders to deliver...`,
        bodyStyle
      );

      redrawRefs.push(divider);
      redrawRefs.push(moreTasksTest);
    }
    renderStars(this);
  }

  completeTask(task) {
    completeTask(task);
    this.renderTaskList();
    addNotification('👍 You got a good review!', 'green');
    positiveReviewSFX.play({ volume: 0.5 });
  }

  viewTask(task) {
    setCurrentTask(task);
    this.scene.switch(taskViewSceneKey);
  }

  update() {
    updateStars(this);
    const newTasks = getIncompleteTasks();
    if (tasks.length !== newTasks.length) {
      this.renderTaskList();
    }
    if (hasFailed()) {
      this.scene.switch(worldMapSceneKey);
    }
  }
}
