import Phaser from 'phaser';
import FadePlugin from 'phaser3-rex-plugins/plugins/fade-plugin.js';

import TitleScene from './scenes/Title';
import WorldMapScene from './scenes/WorldMap';
import TaskListScene from './scenes/TaskList';
import ShopViewScene from './scenes/ShopView';
import TaskViewScene from './scenes/TaskView';
import ReviewListScene from './scenes/ReviewList';
import FailureScene from './scenes/Failure';
import CreditsScene from './scenes/Credits';

const titleScene = new TitleScene();
const worldMapScene = new WorldMapScene();
const taskListScene = new TaskListScene();
const shopViewScene = new ShopViewScene();
const taskViewScene = new TaskViewScene();
const reviewListScene = new ReviewListScene();
const failureScene = new FailureScene();
const creditsScene = new CreditsScene();

const config = {
  type: Phaser.AUTO,
  width: 600,
  height: 800,
  plugins: {
    global: [
      {
        key: 'rexFade',
        plugin: FadePlugin,
        start: true,
      },
    ],
  },
  parent: document.getElementById('game'),
};

const game = new Phaser.Game(config);

game.scene.add('titleScene', titleScene);
game.scene.add('worldMapScene', worldMapScene);
game.scene.add('taskListScene', taskListScene);
game.scene.add('shopViewScene', shopViewScene);
game.scene.add('taskViewScene', taskViewScene);
game.scene.add('reviewListScene', reviewListScene);
game.scene.add('failureScene', failureScene);
game.scene.add('creditsScene', creditsScene);

game.scene.start('worldMapScene');
