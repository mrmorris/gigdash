import Phaser from 'phaser';
import FadePlugin from 'phaser3-rex-plugins/plugins/fade-plugin.js';

import TitleScene from './scenes/Title';
import WorldMapScene from './scenes/WorldMap';
import TaskListScene from './scenes/TaskList';
import ShopViewScene from './scenes/ShopView';
import TaskViewScene from './scenes/TaskView';
import ReviewListScene from './scenes/ReviewList';

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
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 150 }
    }
  },
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

addTask(new Task(1, 'Buy me an apple', 'John', 'Fox Point', ['apple'], 'Love it', 'Hate it'));
addTask(new Task(2, 'I am hungry', 'Jane', 'Fox Point', ['pliers', 'milk'], 'Thanks!', 'You suck'));
addTask(new Task(3, 'So lonely 😃', 'Smirny', 'Olneyville', ['vodka'], 'So so...', 'Meh'));
addTask(
  new Task(4, 'Buy me another apple', 'Cricket', 'Federal Hill', ['apple'], 'Marry me!', 'Can you help me?')
);

[...Array(50).keys()].forEach(() => {
  addTask(new Task(1, 'Buy me an apple', 'John', 'Fox Point', ['apple']));
});
addInventoryItem('apple');
