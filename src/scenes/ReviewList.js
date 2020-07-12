import Phaser from 'phaser';
import { getReviews } from '../gameState';
import { renderMenu } from '../lib/Menu';
import { renderStars, updateStars } from '../lib/Stars';
import { bodyStyle, headerStyle } from '../lib/TextStyles';
import { addSceneForNotification } from '../lib/Notifications';

const key = 'reviewListScene';
const xAlignment = 50;
const taskViewLimit = 30;

let refreshRefs = [];

export default class extends Phaser.Scene {
  constructor() {
    super({ key });
  }

  create() {
    const title = this.add.text(xAlignment, 100, 'Your Reviews', headerStyle);

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

    reviews.forEach((review, index) => {
      let ref = this.add.text(
        xAlignment,
        140 + 20 * index,
        `${review.body} - ${review.customerName} - ${review.rating} stars`,
        bodyStyle
      );
      refreshRefs.push(ref);
    });
    renderStars(this);
  }

  update() {
    updateStars(this);
  }
}
