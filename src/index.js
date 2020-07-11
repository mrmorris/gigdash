import Phaser from "phaser";
import TitleScene from './scenes/Title';
import WorldMapScene from './scenes/WorldMap';

const titleScene = new TitleScene();
const worldMapScene = new WorldMapScene();

const config = {
  type: Phaser.AUTO,
  parent: "phaser-example",
  width: 800,
  height: 600,
};

const game = new Phaser.Game(config);

// Add both scenes (it does not start them)
game.scene.add('titleScene', titleScene);
game.scene.add('worldMapScene', worldMapScene);

//game.scene.add("game", gameScene);

game.scene.start('titleScene');
