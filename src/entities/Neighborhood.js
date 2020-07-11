export default class {
  constructor(name, ref, clickHandler) {
    this.name = name;
    this.ref = ref;

    this.ref.setInteractive({ useHandCursor: true });
    this.ref.on('pointerdown', clickHandler);
  }
}