/**
 * notifications start to the far left
 * @type {number}
 */
const startingPositionX = 0;

/**
 * notifications start at the bottom of our scene
 * could improve this by using the scene's height
 * @type {number}
 */
const startingPositionY = 570;

/**
 * height increment with which to position new notifications
 * @type {number}
 */
const notificationHeight = 35;

/**
 * timeout for fading out notifications
 * @type {number}
 */
const fadeDelay = 10000;
const notifications = [];

/**
 * keep track of where in the 'stack' of notifications the latest notification should be
 * @type {number}
 */
let currentPositionY = startingPositionY;

/**
 * keep track of our main Scene to render notifications into
 */
let mainScene;

/**
 * ability to set the "main" scene
 * doing this because we needed a central place for all notifications to show - as they aren't rendered across *all* scenes
 * @param scene
 */
export const setMainScene = (scene) => {
  mainScene = scene;
};

export const addNotification = (text, color = 'black', scene = mainScene) => {
  const alert = scene.add.text(startingPositionX, startingPositionY, text, {
    fontSize: '18px',
    color,
    backgroundColor: '#EAEAEA',
    padding: { left: 5, right: 5, top: 5, bottom: 5 },
    fixedWidth: 300,
    borderColor: '#000000',
  });
  const fade = scene.plugins.get('rexFade').fadeOutDestroy(alert, fadeDelay);

  notifications.forEach((el, i) => {
    scene.tweens.add({
      targets: el,
      x: el.x,
      y: currentPositionY + notificationHeight * i,
      duration: 100,
      ease: 'Power2',
    });
  });

  notifications.push(alert);

  fade.on('complete', () => {
    console.log('done fading');
    // as fades complete, we'll remove the oldest alert from our list and animate the rest "back down"
    notifications.shift();

    // move us "down" in the scene
    currentPositionY += notificationHeight;
  });

  // move is "up" in the scene
  currentPositionY -= notificationHeight;
};
