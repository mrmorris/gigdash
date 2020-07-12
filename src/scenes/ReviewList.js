import Phaser from 'phaser';
import { getReviews } from '../gameState';
import getDispatcher from '../dispatcher';

class ReviewListScene extends Phaser.Scene {
  constructor(parent) {
    super(ReviewListScene.key);
    this.parent = parent;
    this.width = ReviewListScene.width;
    this.height = ReviewListScene.height;
    this.dispatcher = getDispatcher();
  }

  create() {
    const title = this.add.text(100, 100, 'Your Reviews');
    const backButton = this.add.text(100, 540, 'Back to Map');

    this.cameras.main.setViewport(
      this.parent.x,
      this.parent.y,
      this.width,
      this.height
    );
    this.cameras.main.setBackgroundColor(0x0055aa);

    backButton.setInteractive({ useHandCursor: true });
    backButton.on('pointerdown', () => this.backToMap());

    this.renderReviewList();
    this.events.on('wake', () => this.renderReviewList());

    this.dispatcher.emit('scene-opened');
  }

  renderReviewList() {
    const reviews = getReviews();

    reviews.forEach((review, index) => {
      this.add.text(
        100,
        140 + 20 * index,
        `${review.body} - ${review.customerName} - ${review.rating} stars`
      );
    });
  }

  backToMap() {
    this.dispatcher.emit('scene-closed');
    this.scene.remove(this.key);
  }
}

ReviewListScene.key = 'review-list';
ReviewListScene.x = 400;
ReviewListScene.y = 0;
ReviewListScene.width = 600;
ReviewListScene.height = 600;

export default ReviewListScene;
