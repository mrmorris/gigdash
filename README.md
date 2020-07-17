# Extra Miles - The game!

This game was designed and developed by:

Thomas Robertson
Liam McCartney
Ryan Morris
Nikki Love
Corey Plante

We grabbed and patched assets together from:

Overworld Map — LadyLuck
Character Icon(s) — derGriza (Shutterstock)
Cityscape — ansimuz
Buttons — Vecteezy
Music — “Miami Sky” by White Bat Audio
New Task Notification — “Insight”
Negative Review Notification — “Glitch in the Matrix”
Positive Review Notification — “Success 01”
Scooter Travel Music — originaljun
Death Sound LittleRobotSoundFactory

# Framework

We used Phaser 3 and the Phaser 3 project template, with ES6 support via [Babel 7](https://babeljs.io/) and [Webpack 4](https://webpack.js.org/)
that includes hot-reloading for development and production-ready builds.

Loading images via JavaScript module `import` is also supported.

## Requirements

[Node.js](https://nodejs.org) is required to install dependencies and run scripts via `npm`.

## Available Commands

| Command | Description |
|---------|-------------|
| `yarn install` | Install project dependencies |
| `yarn start` | Build project and open web server running project |
| `yarn run build` | Builds code bundle with production settings (minification, uglification, etc..) |

## Deploying Code
After you run the `npm run build` command, your code will be built into a single bundle located at 
`dist/bundle.min.js` along with any other assets you project depended. 

If you put the contents of the `dist` folder in a publicly-accessible location (say something like `http://mycoolserver.com`), 
you should be able to open `http://mycoolserver.com/index.html` and play your game.

## Credit where credit is due

I snagged some early artwork from these sources - they may not make it in the final build, however:

* [2 Minute Tabletop](https://2minutetabletop.com/product/bandit-camp-assets/)
