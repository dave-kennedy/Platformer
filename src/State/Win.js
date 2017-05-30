var Platformer = Platformer || {};
Platformer.State = Platformer.State || {};

Platformer.State.Win = function (game) {
  this.config;
  this.gameData;
};

Platformer.State.Win.prototype = {
  init: function (config, gameData) {
    this.config = config;
    this.gameData = gameData;
  },

  create: function () {
    this.add.text(310, 260, `You win!`, {
      fontSize: '32px',
      fill: '#f00'
    });

    this.add.text(310, 300, `Score: ${this.gameData.score}`, {
      fontSize: '32px',
      fill: '#fff'
    });

    this.add.text(310, 340, `Press enter to restart`, {
      fontSize: '32px',
      fill: '#fff'
    });
  },

  update: function () {
    if (this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      this.gameData.score = 0;
      this.state.start(this.config.firstLevel, true, false, this.config,
          this.gameData);
    }
  }
};

