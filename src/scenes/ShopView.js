import Phaser from 'phaser';
import {
  getCurrentLocation,
  addInventoryItem,
  getInventory,
  removeInventoryItem,
} from '../gameState';
import { SETTING_INVENTORY_LIMIT } from '../constants';

import getDispatcher from '../dispatcher';

class ShopViewScene extends Phaser.Scene {
  constructor(parent) {
    super(ShopViewScene.key);
    this.parent = parent;
    this.width = ShopViewScene.width;
    this.height = ShopViewScene.height;
    this.dispatcher = getDispatcher();
  }

  preload() {}

  create() {
    this.cameras.main.setViewport(
      this.parent.x,
      this.parent.y,
      this.width,
      this.height
    );
    this.cameras.main.setBackgroundColor(0x0055aa);
    const backButton = this.add.text(100, 550, 'Back to Map');

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToMap());

    this.renderShop();
    this.events.on('wake', () => this.renderShop());

    this.dispatcher.emit('scene-opened');
  }

  renderShop() {
    const location = getCurrentLocation();
    const title = this.add.text(100, 100, `Welcome to ${location.name}!`);

    location.inventory.forEach((item, index) => {
      let itemRef = this.add.text(100, 160 + 20 * index, item);
      itemRef.setInteractive({ useHandCursor: true });
      itemRef.on('pointerdown', () => {
        addInventoryItem(item);
        // @todo - avoid redrawing the whole thing
        this.renderShop();
      });
    });

    const inventory = getInventory();
    this.add.text(500, 160, `Your Inventory (Max ${SETTING_INVENTORY_LIMIT})`);
    let index = 0;
    for (const [item, count] of Object.entries(inventory)) {
      if (count <= 0) {
        return;
      }

      let itemRef = this.add.text(
        500,
        180 + 20 * index,
        `${item}: ${count} (drop)`
      );
      index++;

      itemRef.setInteractive({ useHandCursor: true });
      itemRef.on('pointerdown', () => {
        removeInventoryItem(item);
        // @todo - avoid redrawing the whole thing
        this.renderShop();
      });
    }
  }

  backToMap() {
    this.dispatcher.emit('scene-closed');
    this.scene.remove(this.key);
  }
}

ShopViewScene.key = 'shop-view';
ShopViewScene.x = 400;
ShopViewScene.y = 0;
ShopViewScene.width = 600;
ShopViewScene.height = 600;

export default ShopViewScene;
