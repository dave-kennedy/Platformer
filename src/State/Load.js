var Platformer = Platformer || {};
Platformer.State = Platformer.State || {};

Platformer.State.Load = function (game) {
  this.config;
  this.gameData;
};

Platformer.State.Load.prototype = {
  init: function (config, gameData) {
    this.config = config;
    this.gameData = gameData;
  },

  preload: function () {
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  },

  create: function () {
    this.state.start('Level', true, false, this.config, this.gameData);
  }
};

