import Phaser from 'phaser';
import FadePlugin from 'phaser3-rex-plugins/plugins/fade-plugin.js';

import TitleScene from './scenes/Title';
import WorldMapScene from './scenes/WorldMap';
import TaskListScene from './scenes/TaskList';
import ShopViewScene from './scenes/ShopView';
import TaskViewScene from './scenes/TaskView';
import ReviewListScene from './scenes/ReviewList';

import * as C from './constants';
import TASKS from './tasks';

import { addInventoryItem, addTask } from './gameState';
import Task from './entities/Task';

const titleScene = new TitleScene();
const worldMapScene = new WorldMapScene();
const taskListScene = new TaskListScene();
const shopViewScene = new ShopViewScene();
const taskViewScene = new TaskViewScene();
const reviewListScene = new ReviewListScene();

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
  plugins: {
    global: [{
      key: 'rexFade',
      plugin: FadePlugin,
      start: true
    }]
  }
};

const game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);
game.scene.add('worldMapScene', worldMapScene);
game.scene.add('taskListScene', taskListScene);
game.scene.add('shopViewScene', shopViewScene);
game.scene.add('taskViewScene', taskViewScene);
game.scene.add('reviewListScene', reviewListScene);

game.scene.start('worldMapScene');

// Repeatedly add tasks from the task list to create overwhelming number of tasks
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));
TASKS.forEach((task) => addTask(task));

addInventoryItem(C.ITEM_BANANA);
