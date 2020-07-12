import Phaser from 'phaser';
let dispatcher = null;

class Dispatcher extends Phaser.Events.EventEmitter {
  constructor() {
    super();
  }
}

const getDispatcher = () => {
  if (dispatcher == null) {
    dispatcher = new Dispatcher();
  }
  return dispatcher;
};

export default getDispatcher;
