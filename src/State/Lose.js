var Platformer = Platformer || {};
Platformer.State = Platformer.State || {};

Platformer.State.Lose = function (game) {
  this.config;
  this.data;
};

Platformer.State.Lose.prototype = {
  init: function (config, data) {
    this.config = config;
    this.data = data;
  },

  create: function () {
    this.add.text(310, 260, `You lose!`, {
      fontSize: '32px',
      fill: '#f00'
    });

    this.add.text(310, 300, `Score: ${this.data.score}`, {
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
      this.data.score = 0;
      this.state.start(this.config.firstLevel, true, false, this.config,
          this.data);
    }
  }
};

