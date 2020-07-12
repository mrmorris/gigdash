import { getStars } from '../gameState';

const redrawRefs = [];
let currentStarsCount = 0;

export const renderStars = (scene) => {
  const starsY = scene.sys.game.canvas.height - 100;
  const horizontalIncrement = 50;
  const startX = 25;
  const starsCount = getStars();

  for (let i = 0; i < starsCount; i++) {
    let starRef = scene.add.image(
      startX + horizontalIncrement * i,
      starsY,
      'star'
    );
    redrawRefs.push(starRef);
  }
};

export const updateStars = (scene) => {
  const starsCount = getStars();
  if (starsCount != currentStarsCount) {
    currentStarsCount = starsCount;
    redrawRefs.forEach((ref) => ref.destroy());
    renderStars(scene);
  }
};
