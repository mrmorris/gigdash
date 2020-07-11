import Phaser from 'phaser';
import TitleScene from './scenes/Title';
import WorldMapScene from './scenes/WorldMap';
import TaskListScene from './scenes/TaskList';
import TaskViewScene from './scenes/TaskView';

import {addTask} from './gameState';
import Task from './entities/Task';

const titleScene = new TitleScene();
const worldMapScene = new WorldMapScene();
const taskListScene = new TaskListScene();
const taskViewScene = new TaskViewScene();

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
game.scene.add('taskViewScene', taskViewScene);

game.scene.start('titleScene');

addTask(new Task('Buy me stuff', ['apple']));
addTask(new Task('I am hungry', ['pliers', 'milk']));
addTask(new Task('So lonely 😃', ['vodka']));
