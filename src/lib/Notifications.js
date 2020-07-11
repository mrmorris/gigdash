const startingPositionX = 0;
const startingPositionY = 580;

let currentPositionY = startingPositionY;
const yIncrement = 20;

const fadeDelay = 3000;
const notifications = [];

let mainScene;

export const setMainScene = scene => {
  mainScene = scene;
};

export const addNotification = (text, scene = mainScene) => {
  const alert = scene.add.text(startingPositionX, startingPositionY, text);
  const fade = scene.plugins.get('rexFade').fadeOutDestroy(alert, fadeDelay);

  notifications.forEach((el, i) => {
    scene.tweens.add({
      targets: el,
      x: el.x,
      y: currentPositionY + (20 * i),
      duration: 100,
      ease: 'Power2',
    });
  });

  notifications.push(alert);

  //
  // scene.physics.world.enableBody(container);
  // container.body.setVelocity(0, 0);
  // container.body.setBounce(0, 0);
  // container.body.setCollideWorldBounds(true);
  // container.immovable = true;
  //
  // lastContainer && scene.physics.add.collider(
  //   container,
  //   lastContainer
  // );
  //
  // lastContainer = container;
  //
  fade.on('complete', () => {
    console.log('done fading' );
    // as fades complete, we'll remove the oldest alert from our list and animate the rest "back down"
    notifications.shift();

    // move us "down" in the scene
    currentPositionY += yIncrement;

    // notifications.forEach((el, i) => {
    //   scene.tweens.add({
    //     targets: el,
    //     x: el.x,
    //     y: currentPositionY - (20 * i),
    //     duration: 100,
    //     ease: 'Power2',
    //   });
    // });
  });

  // move is "up" in the scene
  currentPositionY -= yIncrement;
};
