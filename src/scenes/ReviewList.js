import Phaser from 'phaser';
import { getReviews } from '../gameState';
import {renderMenu} from "../lib/Menu";
import {bodyStyle, headerStyle} from "../lib/TextStyles";
import {
  addSceneForNotification,
} from '../lib/Notifications';

const key = 'reviewListScene';
const xAlignment = 50;
const taskViewLimit = 30;

let refreshRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const title = this.add.text(xAlignment, 50, 'Your Reviews', headerStyle);

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

    if (!reviews.length) {
      const noReviewsText = this.add.text(xAlignment, 140, 'You don\'t have any reviews yet', bodyStyle);
      refreshRefs.push(noReviewsText);
    }
    reviews
      .forEach((review, index) => {
        let ref = this.add.text(
          xAlignment,
          140 + 40 * index,
          `${review.body} - ${review.customerName} - ${review.rating} stars`,
          bodyStyle
        );
        refreshRefs.push(ref);
      });
  }
}
