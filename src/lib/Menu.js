const worldMapSceneKey = 'worldMapScene';
const taskListSceneKey = 'taskListScene';
const shopSceneKey = 'shopViewScene';
const reviewListSceneKey = 'reviewListScene';

import {locationLabelStyle} from './TextStyles'

function viewScene(scene, key) {
  scene.scene.switch(key);
}

export const renderMenu = (scene, currentSceneKey) => {
  const menuY = scene.sys.game.canvas.height - 50;
  const horizontalIncrement = 100;
  const startX = 25;

  // a task list link
  const taskListLink = scene.add.text(startX, menuY, '[Orders]', {
    ...locationLabelStyle,
    backgroundColor: 'blue',
    fill: 'white',
  });
  if (currentSceneKey !== taskListSceneKey) {
    // @todo style it when inactive?
    taskListLink.setInteractive({ useHandCursor: true });
    taskListLink.on('pointerdown', () => viewScene(scene, taskListSceneKey));
  }

  const mapLink = scene.add.text(startX + 120, menuY, '[Map]', {
    ...locationLabelStyle,
    backgroundColor: 'blue',
    fill: 'white',
  });
  if (currentSceneKey !== worldMapSceneKey) {
    mapLink.setInteractive({useHandCursor: true});
    mapLink.on('pointerdown', () => viewScene(scene, worldMapSceneKey));
  }

  const reviewsLink = scene.add.text(startX + 240, menuY, '[Reviews]', {
    ...locationLabelStyle,
    backgroundColor: 'blue',
    fill: 'white',
  });
  if (currentSceneKey !== reviewListSceneKey) {
    reviewsLink.setInteractive({useHandCursor: true});
    reviewsLink.on('pointerdown', () => viewScene(scene, reviewListSceneKey));
  }

  const shopLink = scene.add.text(startX + 380, menuY, '[Shop/Inventory]', {
    ...locationLabelStyle,
    backgroundColor: 'blue',
    fill: 'white',
  });
  if (currentSceneKey !== shopSceneKey) {
    shopLink.setInteractive({useHandCursor: true});
    shopLink.on('pointerdown', () => viewScene(scene, shopSceneKey));
  }
};