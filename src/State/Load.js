var Platformer = Platformer || {};
Platformer.State = Platformer.State || {};

Platformer.State.Load = function (game) {
  this.config;
  this.data;
};

Platformer.State.Load.prototype = {
  init: function (config, data) {
    this.config = config;
    this.data = data;
  },

  preload: function () {
    this.load.image('sky', 'assets/sky.png');
    this.load.image('platform', 'assets/platform.png');
    this.load.image('star', 'assets/star.png');
    this.load.spritesheet('dude', 'assets/dude.png', 32, 48);
  },

  create: function () {
    this.state.start(this.config.firstLevel, true, false, this.config,
        this.data);
  }
};

