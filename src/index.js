import Phaser from 'phaser';
import FadePlugin from 'phaser3-rex-plugins/plugins/fade-plugin.js';

import Controller from './controller';

const config = {
  type: Phaser.AUTO,
  parent: 'phaser-example',
  width: 1000,
  height: 600,
  plugins: {
    global: [
      {
        key: 'rexFade',
        plugin: FadePlugin,
        start: true,
      },
    ],
  },
  scene: Controller,
};

const game = new Phaser.Game(config);
