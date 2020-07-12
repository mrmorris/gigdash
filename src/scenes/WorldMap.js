import Phaser from 'phaser';

import worldMapImg from '../assets/world-map.png';
import playerImg from '../assets/player.png';
import {
  addTask,
  getCurrentLocation,
  setCurrentLocation,
  getTasks,
  addReview,
} from '../gameState';
import Shop from '../entities/Shop';
import Review from '../entities/Review';
import Neighborhood from '../entities/Neighborhood';
import {
  setMainScene as setMainSceneForNotifications,
  addNotification,
} from '../lib/Notifications';

import * as C from '../constants';
import TASKS from '../tasks';

const key = 'worldMapScene';
const taskListSceneKey = 'taskListScene';
const shopViewSceneKey = 'shopViewScene';
const reviewListSceneKey = 'reviewListScene';

const locationLabelStyle = {
  fontSize: '18px',
  color: 'black',
  backgroundColor: '#EAEAEA',
  padding: { left: 5, right: 5, top: 5, bottom: 5 },
  borderColor: '#000000',
  align: 'center',
};

const coordinates = [
  { x: 245, y: 150 },
  { x: 50, y: 50 },
  { x: 500, y: 450 },
  { x: 50, y: 450 },
  { x: 260, y: 320 },
  { x: 480, y: 260 }, // federal hill
];

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

    // a task list link
    const taskListLink = this.add.text(550, 100, 'My Tasks', {
      ...locationLabelStyle,
      backgroundColor: 'blue',
      fill: 'white',
    });
    taskListLink.setInteractive({ useHandCursor: true });
    taskListLink.on('pointerdown', () => this.viewTaskList());

    // a reviews link
    const reviewsLink = this.add.text(550, 120, 'My Reviews', {
      ...locationLabelStyle,
      backgroundColor: 'blue',
      fill: 'white',
    });
    reviewsLink.setInteractive({ useHandCursor: true });
    reviewsLink.on('pointerdown', () => this.viewReviewListLink());

    setMainSceneForNotifications(this);

    // add some "stores"
    const store1 = new Shop(
      C.SHOP_GROCERY,
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
        C.ITEM_ICE_CREAM,
      ],
      this.add.text(
        coordinates[0].x,
        coordinates[0].y,
        C.SHOP_GROCERY,
        locationLabelStyle
      ),
      () => this.travelTo(store1)
    );
    const store2 = new Shop(
      C.SHOP_HARDWARE,
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
        C.ITEM_STERILIZED_CLEANING_FLUID,
      ],
      this.add.text(
        coordinates[1].x,
        coordinates[1].y,
        C.SHOP_HARDWARE,
        locationLabelStyle
      ),
      () => this.travelTo(store2)
    );
    const store3 = new Shop(
      C.SHOP_LIQUOR,
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
        C.ITEM_VISION_DROPS,
      ],
      this.add.text(
        coordinates[2].x,
        coordinates[2].y,
        C.SHOP_LIQUOR,
        locationLabelStyle
      ),
      () => this.travelTo(store3)
    );

    // add some hoods
    const hood1 = new Neighborhood(
      C.NEIGHBORHOOD_FOX_POINT,
      this.add.text(
        coordinates[3].x,
        coordinates[3].y,
        C.NEIGHBORHOOD_FOX_POINT,
        locationLabelStyle
      ),
      () => this.travelTo(hood1)
    );
    const hood2 = new Neighborhood(
      C.NEIGHBORHOOD_OLNEYVILLE,
      this.add.text(
        coordinates[4].x,
        coordinates[4].y,
        C.NEIGHBORHOOD_OLNEYVILLE,
        locationLabelStyle
      ),
      () => this.travelTo(hood2)
    );
    const hood3 = new Neighborhood(
      C.NEIGHBORHOOD_FEDERAL_HILL,
      this.add.text(
        coordinates[5].x,
        coordinates[5].y,
        C.NEIGHBORHOOD_FEDERAL_HILL,
        locationLabelStyle
      ),
      () => this.travelTo(hood3)
    );

    // add the player
    this.player = this.add.image(centerX, centerY, 'player').setScale(0.2);

    // Kick off the task queuer
    this.queueNextAssignment(C.SETTING_INITIAL_ASSIGNMENT_DELAY);
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
        this.switchToLocationScene();
      } else {
        console.dir(location.ref);
        const tween = this.tweens.add({
          targets: this.player,
          x: location.ref.x + location.ref.width / 2,
          y: location.ref.y + location.ref.height / 2,
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
      this.scene.switch(shopViewSceneKey);
    } else {
      this.scene.switch(taskListSceneKey);
    }
  }

  viewReviewListLink() {
    this.scene.switch(reviewListSceneKey);
  }

  assignNewTask() {
    const assignedTaskIds = getTasks().map((t) => t.id);
    const unassignedTasks = TASKS.filter(
      (t) => !assignedTaskIds.includes(t.id)
    );
    // If there are no more unassigned tasks, do nothing for now
    if (!unassignedTasks.length) {
      return;
    }
    const selectedTask =
      unassignedTasks[Math.floor(Math.random() * unassignedTasks.length)];
    addTask(selectedTask);
    addNotification('You got a new task');

    // tasks will automatically fail if they aren't completed in... 1 minute
    setTimeout(() => {
      if (!selectedTask.isComplete) {
        selectedTask.isFailed = true;
        selectedTask.isComplete = true;
        addNotification('You just got a negative review!', 'red');
        addReview(
          new Review(selectedTask.negativeReview, selectedTask.customerName, 0)
        );
      }
    }, 1000 * 60 * 1); // 1 minutes
  }

  queueNextAssignment(timeout) {
    this.assignNewTask();
    const nextAssignmentTimeout = timeout * 0.9;
    this.time.addEvent({
      delay: nextAssignmentTimeout,
      callback: this.queueNextAssignment,
      args: [nextAssignmentTimeout],
      callbackScope: this,
    });
  }
}
