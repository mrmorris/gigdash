import Phaser from 'phaser';

const key = 'failureScene';
const creditsSceneKey = 'creditsScene';

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const failureText = `
Dear Miles,

Due to your absolutely abysmal delivery approval rating through our ExtraMiles procurement and courier service, we can no longer offer you gainful employment at this time. Please return your vehicle to the nearest ExtraMiles depot as soon as humanly possible before we seek legal action or more violent punitive measures. An invoice will be sent seprately to bill you for the remainder of your vehicle usage fees and ExtraMiles memberships dues.

Cheers!
ExtraMiles
`

    this.add.text(100, 100, failureText, {
      wordWrap: { width: 400 }
    });
    const creditsButton = this.add.image(250, 500, 'buttonInactive').setOrigin(0, 0).setScale(.5);
    const creditsButtonText = this.add.text(270, 515, 'Credits');
    creditsButton.setInteractive({ useHandCursor: true });
    creditsButton.on('pointerdown', () => this.scene.switch(creditsSceneKey));
  }
}
