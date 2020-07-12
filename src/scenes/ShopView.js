import Phaser from 'phaser';
import {
  getCurrentLocation,
  addInventoryItem,
  getInventory, removeInventoryItem,
} from '../gameState';
import {
  addSceneForNotification,
} from '../lib/Notifications';
import {SETTING_INVENTORY_LIMIT} from '../constants';

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

    addSceneForNotification(this);

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
    const title = this.add.text(100, 100, `Welcome to ${location.name}!`);
    redrawRefs.push(title);

    location.inventory.forEach((item, index) => {
      let itemRef = this.add.text(100, 160 + 20 * index, item);
      itemRef.setInteractive({ useHandCursor: true });
      itemRef.on('pointerdown', () => {
        addInventoryItem(item);
        // @todo - avoid redrawing the whole thing
        this.renderShop();
      });
      redrawRefs.push(itemRef);
    });

    const inventory = getInventory();
    let myInventoryTitle = this.add.text(500, 160, `Your Inventory (Max ${SETTING_INVENTORY_LIMIT})`);
    redrawRefs.push(myInventoryTitle);
    let index = 0;
    for (const [item, count] of Object.entries(inventory)) {
      if (count <= 0) {
        return;
      }

      let itemRef = this.add.text(500, 180 + 20 * index, `${item}: ${count} (drop)`);
      index++;

      itemRef.setInteractive({ useHandCursor: true });
      itemRef.on('pointerdown', () => {
        removeInventoryItem(item);
        // @todo - avoid redrawing the whole thing
        this.renderShop();
      });

      redrawRefs.push(itemRef);
    }
  }

  backToMap() {
    this.scene.switch(worldMapSceneKey);
  }
}
