import Phaser from 'phaser';
import { getReviews } from '../gameState';
import {renderMenu} from "../lib/Menu";
import {
  addSceneForNotification,
} from '../lib/Notifications';

const key = 'reviewListScene';

let refreshRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const title = this.add.text(100, 100, 'Your Reviews');

    addSceneForNotification(this);

    this.renderReviewList();
    renderMenu(this, key);
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
}
