import Phaser from "phaser";

import worldMapImg from "../assets/worldMap.jpg";

const key = "worldMapScene";

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {
    this.load.image("worldMap", worldMapImg);
  }

  create() {
    const map = this.add.image(this.cameras.main.width / 2, this.cameras.main.height / 2, "worldMap");

    //map.width = this.sys.canvas.width;
    //map.height = this.sys.canvas.height;

    let scaleX = this.cameras.main.width / map.width;
    let scaleY = this.cameras.main.height / map.height;
    let scale = Math.max(scaleX, scaleY);
    map.setScale(scale).setScrollFactor(0);

    console.log(this.sys.canvas.width);
    const title = this.add.text(100, 100, "World Map");
    //
    // startButton.setInteractive({ useHandCursor: true });
    // startButton.on("pointerdown", () => this.startGame());
  }

}