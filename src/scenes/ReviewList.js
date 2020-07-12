import Phaser from 'phaser';
import { getReviews, hasFailed } from '../gameState';
import { renderMenu } from '../lib/Menu';
import { renderStars, updateStars } from '../lib/Stars';
import { bodyStyle, headerStyle } from '../lib/TextStyles';
import { addSceneForNotification } from '../lib/Notifications';

const key = 'reviewListScene';
const xAlignment = 50;
const reviewLimit = 30;

const worldMapSceneKey = 'worldMapScene';

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
    renderStars(this);
    this.events.on('wake', () => this.renderReviewList());
    this.events.on('wake', () => renderStars(this));
  }

  renderReviewList() {
    const reviews = getReviews();

    refreshRefs.forEach((refreshRefs) => {
      refreshRefs.destroy();
    });
    refreshRefs = [];

    if (!reviews.length) {
      const noReviewsText = this.add.text(
        xAlignment,
        140,
        "You don't have any reviews yet",
        bodyStyle
      );
      refreshRefs.push(noReviewsText);
    }
    let lastReviewRef;
    reviews.slice(0, reviewLimit).forEach((review, index) => {
      let ref = this.add.text(
        xAlignment,
        (lastReviewRef ? 140 + lastReviewRef.height : 140) + 40 * index,
        `${review.rating ? '👍' : '👎'} ${review.body} - ${review.customerName}`,
        {
          ...bodyStyle,
          wordWrap: { width: 500 },
          color: review.rating ? 'green' : 'red'
        }
      );
      refreshRefs.push(ref);
      lastReviewRef = ref;
    });

    if (reviews.length > reviewLimit) {
      const divider = this.add.text(xAlignment, 550, `----`, bodyStyle);
      const moreReviewsText = this.add.text(
        xAlignment,
        560,
        `...you have ${reviews.length - reviewLimit} more reviews...`,
        bodyStyle
      );

      refreshRefs.push(divider);
      refreshRefs.push(moreReviewsText);
    }
  }

  update() {
    updateStars(this);

    if (hasFailed()) {
      this.scene.switch(worldMapSceneKey);
    }
  }
}
