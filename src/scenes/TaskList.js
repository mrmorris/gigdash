import Phaser from 'phaser';
import getDispatcher from '../dispatcher';
import { getCurrentLocation, getIncompleteTasks } from '../gameState';

let redrawRefs = [];

class TaskListView extends Phaser.Scene {
  constructor(parent) {
    super(TaskListView.key);
    this.parent = parent;
    this.width = TaskListView.width;
    this.height = TaskListView.height;
    this.dispatcher = getDispatcher();
    this.tasks = [];
    this.taskRefs = [];
  }

  create() {
    const title = this.add.text(10, 100, 'Your Tasks');

    this.cameras.main.setViewport(
      this.parent.x,
      this.parent.y,
      this.width,
      this.height
    );
    this.cameras.main.setBackgroundColor(0x0055aa);

    this.dispatcher.on('task-added', (task) => {
      this.appendTask(task);
    });

    this.dispatcher.on('task-completed', (task) => {
      // Handle Completion
      console.log('Completed:', task);
    });
  }

  appendTask(task) {
    if (this.tasks.length >= 15) {
      // TODO: update more text
    } else {
      this.tasks.push(task);
      let taskRef = this.add
        .text(
          10,
          140 + 20 * this.tasks.length,
          `${task.destination} - ${task.customerName}`
        )
        .setInteractive({ useHandCursor: true });
      taskRef.on('pointerdown', () => {
        this.viewTask(task);
      });
      this.taskRefs.push(taskRef);
    }
  }

  // Note: This is not currently in use
  // TODO: Reuse this for full re-renders.
  renderTaskList() {
    const tasks = getIncompleteTasks();
    const location = getCurrentLocation();

    redrawRefs.forEach((taskRef) => {
      taskRef.destroy();
    });
    redrawRefs = [];

    if (location) {
      let locationName = this.add.text(100, 20, `You're at: ${location.name}`);
      redrawRefs.push(locationName);
    }

    this.taskRefs = [];

    this.tasks.slice(0, 15).forEach((task, index) => {
      let taskRef = this.add.text(
        10,
        140 + 20 * index,
        `${task.destination} - ${task.customerName}`
      );

      redrawRefs.push(taskRef);
    });
    if (tasks.length > 15) {
      const divider = this.add.text(100, 440, `----`);
      const moreTasksTest = this.add.text(
        100,
        460,
        `...There are ${tasks.length - 15} More Tasks to Complete`
      );

      redrawRefs.push(divider);
      redrawRefs.push(moreTasksTest);
    }
  }

  viewTask(task) {
    this.dispatcher.emit('view-task', task);
  }
}

// Rendering Details
TaskListView.key = 'task-lists';
TaskListView.x = 0;
TaskListView.y = 0;
TaskListView.width = 200;
TaskListView.height = 600;

export default TaskListView;
