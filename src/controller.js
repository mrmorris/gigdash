import Phaser from 'phaser';

import TitleScene from './scenes/Title';
import WorldMapScene from './scenes/WorldMap';
import TaskListScene from './scenes/TaskList';
import ShopViewScene from './scenes/ShopView';
import TaskViewScene from './scenes/TaskView';
import ReviewListScene from './scenes/ReviewList';

import Shop from './entities/Shop';

import getDispatcher from './dispatcher';

import { setCurrentLocation, setCurrentTask } from './gameState';

/**
 * Controller
 * ==========
 * Manages rendering of all scenes in the game, either directly or reactively.
 * Also manages some game state, player location, current task
 */
class Controller extends Phaser.Scene {
  /**
   * renderSubScene
   * For a given scene class, render it in a zone "window" at the class's
   * specified location & dimensions
   */
  renderSubScene(subScene) {
    let sceneWindow = this.add
      .zone(subScene.x, subScene.y, subScene.width, subScene.height)
      .setInteractive()
      .setOrigin(0);

    let scene = new subScene(sceneWindow);
    this.scene.add(subScene.key, scene, true);
  }

  create() {
    // Grab the dispatcher instance so we can react to events
    const dispatcher = getDispatcher();

    // We always render these two subscenes, TaskList & WorldMap
    // TaskList is up for debate!
    this.renderSubScene(TaskListScene, 0, 0);
    this.renderSubScene(WorldMapScene, 200, 200);

    // Should move all event keys to constants file
    // The player has arrived at the location, we update the game state to that
    // location.
    // If the location is a shop, render its menu scene.
    dispatcher.on('arrived', (location) => {
      setCurrentLocation(location);
      if (location instanceof Shop) {
        this.renderSubScene(ShopViewScene);
      }
    });

    // The player clicked the "My Reviews" button
    dispatcher.on('show-reviews', () => {
      this.renderSubScene(ReviewListScene);
    });

    // The player clicked a task in their list
    dispatcher.on('view-task', (task) => {
      this.scene.remove(TaskViewScene.key);
      setCurrentTask(task);
      this.renderSubScene(TaskViewScene);
    });
  }
}

export default Controller;
