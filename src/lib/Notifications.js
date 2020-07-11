const startingPositionX = 0;
const startingPositionY = 570;

let currentPositionY = startingPositionY;
const yIncrement = 35;

const fadeDelay = 10000;
const notifications = [];

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
      y: currentPositionY + yIncrement * i,
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
    currentPositionY += yIncrement;
  });

  // move is "up" in the scene
  currentPositionY -= yIncrement;
};
