import Phaser from 'phaser';

import { bodyStyle, headerStyle } from '../lib/TextStyles';

const key = 'creditsScene';
const titleSceneKey = 'titleScene';

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const title = this.add.text(
      50,
      50,
      'Created by these Excellent People',
      headerStyle
    );

    const content = this.add.text(
      50,
      100,
      `
Thomas Robertson
Liam McCartney
Ryan Morris
Nikki Love
Corey Plante

Thanks & credit to these fine resources:

Overworld Map — LadyLuck
Character Icon(s) — derGriza (Shutterstock)
Cityscape — ansimuz
Buttons — Vecteezy
Music — “Miami Sky” by White Bat Audio
New Task Notification — “Insight”
Negative Review Notification — “Glitch in the Matrix”
Positive Review Notification — “Success 01”
Scooter Travel Music — originaljun
Death Sound LittleRobotSoundFactory

Check out the project:
https://github.com/mrmorris/gigdash
`,
      {
        ...bodyStyle,
        fontSize: '14px',
        wordWrap: {
          width: 500,
        },
      }
    );

    const returnToTitle = this.add.text(
      50,
      600,
      'Return to Title',
      headerStyle
    );
    returnToTitle.setInteractive({ useHandCursor: true });
    returnToTitle.on('pointerdown', () => this.scene.switch(titleSceneKey));
  }
}
