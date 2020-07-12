export default class {
  constructor(name, ref, clickHandler) {
    this.name = name;
    this.ref = ref;

    this.ref.setInteractive({ useHandCursor: true })
      .on('pointerdown', clickHandler)
      .on('pointerover', () => this.ref.setStyle({ color: 'grey'}))
      .on('pointerout', () =>  this.ref.setStyle({ color: 'black'}));
  }
}