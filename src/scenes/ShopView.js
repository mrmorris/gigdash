import Phaser from 'phaser';
import {
  getCurrentLocation,
  addInventoryItem,
  getInventory,
} from '../gameState';

const key = 'shopViewScene';
const worldMapSceneKey = 'worldMapScene';

let redrawRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {}

  create() {
    const backButton = this.add.text(100, 550, 'Back to Map');

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToMap());

    this.renderShop();
    this.events.on('wake', () => this.renderShop());
  }

  renderShop() {
    redrawRefs.forEach((ref) => {
      ref.destroy();
    });
    redrawRefs = [];

    const location = getCurrentLocation();
    const title = this.add.text(100, 100, `Shop: ${location.name}`);
    redrawRefs.push(title);

    location.inventory.forEach((item, index) => {
      let itemRef = this.add.text(100, 140 + 20 * index, item);
      itemRef.setInteractive({ useHandCursor: true });
      itemRef.on('pointerdown', () => {
        addInventoryItem(item);
        // @todo - avoid redrawing the whole thing
        this.renderShop();
      });
      redrawRefs.push(itemRef);
    });

    const inventory = getInventory();
    let myInventoryTitle = this.add.text(400, 120, 'Your Current Inventory');
    redrawRefs.push(myInventoryTitle);
    let index = 0;
    for (const [item, count] of Object.entries(inventory)) {
      let itemRef = this.add.text(400, 140 + 20 * index, `${item}: ${count}`);
      index++;
      redrawRefs.push(itemRef);
    }
  }

  backToMap() {
    this.scene.switch(worldMapSceneKey);
  }
}
