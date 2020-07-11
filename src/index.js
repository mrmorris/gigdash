import Phaser from 'phaser';
import TitleScene from './scenes/Title';
import WorldMapScene from './scenes/WorldMap';
import TaskListScene from './scenes/TaskList';

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
