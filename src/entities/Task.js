export default class {
  constructor(id, name, customerName, destination, items = [], positiveReview, negativeReview) {
    this.id = id;
    this.name = name;
    this.customerName = customerName;
    this.items = items;
    this.isComplete = false;
    this.isFailed = false;
    this.destination = destination;
    this.positiveReview = positiveReview;
    this.negativeReview = negativeReview;

    this.difficulty = 'hard';
    if (this.items.length === 1) {
      this.difficulty = 'easy';
    } else if (this.items.length < 4) {
      this.difficulty = 'medium';
    }
  }
}
