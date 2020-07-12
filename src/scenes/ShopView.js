import Phaser from 'phaser';
import {
  getCurrentLocation,
  addInventoryItem,
  getInventory,
  removeInventoryItem,
} from '../gameState';
import { addSceneForNotification } from '../lib/Notifications';
import { SETTING_INVENTORY_LIMIT } from '../constants';
import Shop from '../entities/Shop';
import { renderMenu } from '../lib/Menu';
import {bodyStyle, headerStyle, subHeaderStyle} from "../lib/TextStyles";

const key = 'shopViewScene';
const xAlignment = 50;

let shopRefs = [];
let inventoryRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    addSceneForNotification(this);
    this.render();
    this.events.on('wake', () => this.render());
  }

  render() {
    const location = getCurrentLocation();

    inventoryRefs.forEach((ref) => {
      ref.destroy();
    });
    inventoryRefs = [];

    shopRefs.forEach((ref) => {
      ref.destroy();
    });
    shopRefs = [];

    if (location instanceof Shop) {
      this.renderShop();
      this.renderInventory(400);
    } else {
      this.renderInventory();
    }
    renderMenu(this, key);
  }

  renderInventory(yPosition = 50) {
    inventoryRefs.forEach((ref) => {
      ref.destroy();
    });
    inventoryRefs = [];

    const inventory = getInventory();
    let myInventoryTitle = this.add.text(
      xAlignment,
      yPosition,
      `Your Inventory (Max ${SETTING_INVENTORY_LIMIT})`,
      headerStyle
    );
    inventoryRefs.push(myInventoryTitle);

    let index = 0;
    for (const [item, count] of Object.entries(inventory)) {
      if (count <= 0) {
        return;
      }

      let itemRef = this.add.text(
        xAlignment,
        yPosition + 50 + 20 * index,
        `${item}: ${count}`,
        bodyStyle
      );
      index++;

      itemRef.setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          removeInventoryItem(item);
          // @todo - avoid redrawing the whole thing
          this.renderShop();
          this.renderInventory(yPosition);
        })
        .on('pointerover', () => {
          itemRef.setStyle({ color: 'cyan'}).setText(`${item}: ${count} (drop)`);
        })
        .on('pointerout', () =>  {
          itemRef.setStyle({ color: 'white'}).setText(`${item}: ${count}`);
        });

      inventoryRefs.push(itemRef);
    }
  }

  renderShop() {
    shopRefs.forEach((ref) => {
      ref.destroy();
    });
    shopRefs = [];

    const location = getCurrentLocation();
    const title = this.add.text(xAlignment, 50, `Welcome to ${location.name}!`, headerStyle);
    shopRefs.push(title);

    const purchaseTitle = this.add.text(xAlignment, 140, `Available Items:`, subHeaderStyle);
    shopRefs.push(purchaseTitle);

    location && location.inventory && location.inventory.forEach((item, index) => {
      let itemRef = this.add.text(xAlignment, 165 + 20 * index, item, {
        ...bodyStyle
      });
      itemRef
        .setInteractive({ useHandCursor: true })
        .on('pointerdown', () => {
          addInventoryItem(item);
          this.renderInventory(400);
          this.renderShop();
        })
        .on('pointerover', () => itemRef.setStyle({ color: 'cyan'}))
        .on('pointerout', () =>  itemRef.setStyle({ color: 'white'}));
      shopRefs.push(itemRef);
    });
  }
}
