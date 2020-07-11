import Phaser from 'phaser';
import TitleScene from './scenes/Title';
import WorldMapScene from './scenes/WorldMap';
import TaskListScene from './scenes/TaskList';
import TaskViewScene from './scenes/TaskView';

import {addInventoryItem, addTask} from './gameState';
import Task from './entities/Task';

const titleScene = new TitleScene();
const worldMapScene = new WorldMapScene();
const taskListScene = new TaskListScene();

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 800,
  height: 600,
};

const game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);
game.scene.add('worldMapScene', worldMapScene);
game.scene.add('taskListScene', taskListScene);

game.scene.start('titleScene');

addTask(new Task(1, 'Buy me an apple', 'John', ['apple']));
addTask(new Task(2, 'I am hungry', 'Jane', ['pliers', 'milk']));
addTask(new Task(3, 'So lonely 😃', 'Smirny', ['vodka']));
addTask(new Task(4, 'Buy me another apple', 'Cricket', ['apple']));

addInventoryItem('apple');