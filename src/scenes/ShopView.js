import Phaser from 'phaser';
import {
  getCurrentLocation,
  addInventoryItem,
  getInventory,
  removeInventoryItem,
} from '../gameState';
import { SETTING_INVENTORY_LIMIT } from '../constants';
import Shop from '../entities/Shop';
import { renderMenu } from '../lib/Menu';

const key = 'shopViewScene';
const worldMapSceneKey = 'worldMapScene';

let redrawRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {}

  create() {
    this.render();
    this.events.on('wake', () => this.render());
  }

  render() {
    redrawRefs.forEach((ref) => {
      ref.destroy();
    });
    redrawRefs = [];

    const location = getCurrentLocation();
    if (location instanceof Shop) {
      this.renderShop();
    } else {
      this.renderInventory();
    }
    renderMenu(this, key);
  }

  renderInventory() {
    const inventory = getInventory();
    let myInventoryTitle = this.add.text(
      100,
      100,
      `You're not at a shop.\nYour Inventory (Max ${SETTING_INVENTORY_LIMIT})`
    );
    redrawRefs.push(myInventoryTitle);
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

      redrawRefs.push(itemRef);
    }
  }

  renderShop() {
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
  }
}
