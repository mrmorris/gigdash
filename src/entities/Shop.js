export default class Shop {
  constructor(name, inventory = [], ref, clickHandler) {
    this.name = name;
    this.inventory = inventory;
    this.ref = ref;

    this.ref.setInteractive({ useHandCursor: true });
    this.ref.on('pointerdown', clickHandler);
  }
}