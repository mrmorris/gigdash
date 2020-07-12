import buttonActiveImg from "../assets/button-active.png";
import buttonInactiveImg from "../assets/button-inactive.png";
import buttonDisabledImg from "../assets/button-disabled.png";
import {menuButtonStyle} from './TextStyles'

const worldMapSceneKey = 'worldMapScene';
const taskListSceneKey = 'taskListScene';
const shopSceneKey = 'shopViewScene';
const reviewListSceneKey = 'reviewListScene';

const activeTint = [0xffffff, 0xffffff, 0x999999, 0x999999];

function viewScene(scene, key) {
  if (!isLocked) {
    scene.scene.switch(key);
  }
}

let isLocked = false;

export const lockMenu = () => {
  isLocked = true;
};

export const unlockMenu = () => {
  isLocked = false;
};

export const preloadMenu = (scene) => {
  scene.load.image('buttonActive', buttonActiveImg);
  scene.load.image('buttonInactive', buttonInactiveImg);
  scene.load.image('buttonDisabled', buttonDisabledImg);
};

export const renderMenu = (scene, currentSceneKey) => {
  const menuY = scene.sys.game.canvas.height - 50;
  const startX = 25;

  // a task list link
  if (currentSceneKey !== taskListSceneKey) {
    const taskListButton = scene.add.image(startX, menuY, 'buttonActive').setOrigin(0, 0).setScale(.5);
    taskListButton.setInteractive({ useHandCursor: true });
    taskListButton
      .on('pointerdown', () => viewScene(scene, taskListSceneKey))
      .on('pointerover', () => taskListButton.setTint(...activeTint))
      .on('pointerout', () => taskListButton.setTint());
  } else {
    const taskListButton = scene.add.image(startX, menuY, 'buttonInactive').setOrigin(0, 0).setScale(.5);
  }
  const taskListLink = scene.add.text(startX + 15, menuY + 8, 'Orders', menuButtonStyle);


  if (currentSceneKey !== worldMapSceneKey) {
    const mapLinkButton = scene.add.image(startX + 120, menuY, 'buttonActive').setOrigin(0, 0).setScale(.5);
    mapLinkButton.setInteractive({ useHandCursor: true });
    mapLinkButton
      .on('pointerdown', () => viewScene(scene, worldMapSceneKey))
      .on('pointerover', () => mapLinkButton.setTint(...activeTint))
      .on('pointerout', () => mapLinkButton.setTint());
  } else {
    const mapLinkButton = scene.add.image(startX + 120, menuY, 'buttonInactive').setOrigin(0, 0).setScale(.5);
  }
  const mapLink = scene.add.text(startX + 120 + 30, menuY + 8, 'Map', menuButtonStyle);

  if (currentSceneKey !== reviewListSceneKey) {
    const reviewButton = scene.add.image(startX + 250, menuY, 'buttonActive').setOrigin(0, 0).setScale(.5);
    reviewButton.setInteractive({ useHandCursor: true });

    reviewButton.setInteractive({useHandCursor: true})
      .on('pointerdown', () => viewScene(scene, reviewListSceneKey))
      .on('pointerover', () => reviewButton.setTint(...activeTint))
      .on('pointerout', () => reviewButton.setTint());
  } else {
    const reviewButton = scene.add.image(startX + 250, menuY, 'buttonInactive').setOrigin(0, 0).setScale(.5);
  }
  const reviewsLink = scene.add.text(startX + 250 + 10, menuY + 8, 'Reviews', menuButtonStyle);

  if (currentSceneKey !== shopSceneKey) {
    const shopButton = scene.add.image(startX + 380, menuY, 'buttonActive').setOrigin(0, 0).setScale(.85, .5);
    shopButton.setInteractive({ useHandCursor: true });

    shopButton.setInteractive({useHandCursor: true})
      .on('pointerdown', () => viewScene(scene, shopSceneKey))
      .on('pointerover', () => shopButton.setTint(...activeTint))
      .on('pointerout', () => shopButton.setTint());
  } else {
    const shopButton = scene.add.image(startX + 380, menuY, 'buttonInactive').setOrigin(0, 0).setScale(.85, .5);
  }
  const shopLink = scene.add.text(startX + 380 + 10, menuY + 8, 'Shop/Inventory', menuButtonStyle);
};