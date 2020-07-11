import Phaser from 'phaser';

import worldMapImg from '../assets/worldMap.jpg';
import playerImg from '../assets/player.png';
import { getCurrentLocation, setCurrentLocation } from '../gameState';
import Shop from '../entities/Shop';
import Neighborhood from '../entities/Neighborhood';

import * as C from '../constants.js'

const key = 'worldMapScene';
const taskListSceneKey = 'taskListScene';
const shopViewSceneKey = 'shopViewScene';
const reviewListSceneKey = 'reviewListScene';

let isTraveling = false;

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  preload() {
    this.load.image('worldMap', worldMapImg);
    this.load.image('player', playerImg);
  }

  create() {
    const centerX = this.cameras.main.width / 2;
    const centerY = this.cameras.main.height / 2;

    const map = this.add.image(centerX, centerY, 'worldMap');
    // center and scale the map
    let scaleX = this.cameras.main.width / map.width;
    let scaleY = this.cameras.main.height / map.height;
    let scale = Math.max(scaleX, scaleY);
    map.setScale(scale).setScrollFactor(0);

    // add the player
    this.player = this.add.image(centerX, centerY, 'player');

    // a task list link
    const taskListLink = this.add.text(550, 100, 'My Tasks');
    taskListLink.setInteractive({ useHandCursor: true });
    taskListLink.on('pointerdown', () => this.viewTaskList());

    // a reviews link
    const reviewsLink = this.add.text(550, 120, 'My Reviews');
    reviewsLink.setInteractive({ useHandCursor: true });
    reviewsLink.on('pointerdown', () => this.viewReviewListLink());

    // add some "stores"
    const store1 = new Shop(
      C.STORE_GROCERY,
      [
        C.ITEM_CITRUS_FRUIT,
        C.ITEM_ENERGY_DRINK,
        C.ITEM_TOOTHPASTE,
        C.ITEM_INFINITY_MEAT,
        C.ITEM_FROZEN_PIZZA,
        C.ITEM_BANANA,
        C.ITEM_GMO_GREEN_LEAVES,
        C.ITEM_MEDICINE,
        C.ITEM_GRANOLA,
        C.ITEM_ICE_CREAM
      ],
      this.add.text(300, 50, C.STORE_GROCERY),
      () => this.travelTo(store1)
    );
    const store2 = new Shop(
      C.STORE_HARDWARE,
      [
        C.ITEM_DUCT_TAPE,
        C.ITEM_NAILS,
        C.ITEM_SHOVEL,
        C.ITEM_FISHING_POLE,
        C.ITEM_HAMMER,
        C.ITEM_CROWBAR,
        C.ITEM_CABLE,
        C.ITEM_FAN,
        C.ITEM_CARBONIZED_WOOD,
        C.ITEM_STERILIZED_CLEANING_FLUID
      ],
      this.add.text(50, 100, C.STORE_HARDWARE),
      () => this.travelTo(store2)
    );
    const store3 = new Shop(
      C.STORE_LIQUOR,
      [
        C.ITEM_VODKA,
        C.ITEM_WHISKEY,
        C.ITEM_TEQUILA,
        C.ITEM_DOWN_TOWNERS,
        C.ITEM_BEER,
        C.ITEM_WINE,
        C.ITEM_GLOW_STICKS,
        C.ITEM_DRINK_MIX,
        C.ITEM_RED_CUPS,
        C.ITEM_VISION_DROPS
      ],
      this.add.text(100, 200, C.STORE_LIQUOR),
      () => this.travelTo(store3)
    );

    // add some hoods
    const hood1 = new Neighborhood(
      NEIHBORHOOD_FOX_POINT,
      this.add.text(400, 20, NEIGHBORHOOD_FOX_POINT),
      () => this.travelTo(hood1)
    );
    const hood2 = new Neighborhood(
      NEIGHBORHOOD_OLNEYVILLE,
      this.add.text(400, 100, NEIGHBORHOOD_OLNEYVILLE),
      () => this.travelTo(hood2)
    );
    const hood3 = new Neighborhood(
      NEIGHBORHOOD_FEDERALL_HILL,
      this.add.text(400, 200, NEIGHBORHOOD_FEDERAL_HILL),
      () => this.travelTo(hood3)
    );
  }

  viewTaskList() {
    if (!isTraveling) {
      this.scene.switch(taskListSceneKey);
    }
  }

  travelTo(location) {
    const currentLocation = getCurrentLocation();

    if (!isTraveling) {
      isTraveling = true;

      if (currentLocation && location.name === currentLocation.name) {
        console.log('already there');
        this.switchToLocationScene();
      } else {
        const tween = this.tweens.add({
          targets: this.player,
          x: location.ref.x,
          y: location.ref.y,
          duration: 2000, // @todo travel time...
          ease: 'Power2',
        });

        tween.on('complete', () => this.switchToLocationScene(location));
      }
    }
  }

  switchToLocationScene(location) {
    isTraveling = false;
    setCurrentLocation(location);
    if (location instanceof Shop) {
      console.log('Switch to', shopViewSceneKey);
      this.scene.switch(shopViewSceneKey);
    } else {
      console.log('Switch to', taskListSceneKey);
      this.scene.switch(taskListSceneKey);
    }
  }

  viewReviewListLink() {
    this.scene.switch(reviewListSceneKey);
  }
}
