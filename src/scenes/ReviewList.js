import Phaser from 'phaser';
import { getReviews } from '../gameState';

const key = 'reviewListScene';
const worldMapSceneKey = 'worldMapScene';

let refreshRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const title = this.add.text(100, 100, 'Your Reviews');
    const backButton = this.add.text(100, 540, 'Back to Map');

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToMap());

    this.renderReviewList();
    this.events.on('wake', () => this.renderReviewList());
  }

  renderReviewList() {
    const reviews = getReviews();

    refreshRefs.forEach((refreshRefs) => {
      refreshRefs.destroy();
    });
    refreshRefs = [];

    reviews
      .forEach((review, index) => {
        let ref = this.add.text(
          100,
          140 + 20 * index,
          `${review.body} - ${review.customerName} - ${review.rating} stars`
        );
        refreshRefs.push(ref);
      });
  }

  backToMap() {
    this.scene.switch(worldMapSceneKey);
  }
}