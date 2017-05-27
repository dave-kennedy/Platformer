var Platformer = Platformer || {};
Platformer.State = Platformer.State || {};

Platformer.State.Level2 = function (game) {
  this.config;
  this.data;
  this.player;
  this.platforms;
  this.cursors;
  this.stars;
  this.scoreText;
  this.timeLeft;
  this.timeText;
};

Platformer.State.Level2.prototype = {
  init: function (config, data) {
    this.config = config;
    this.data = data;
  },

  create: function () {
    // We're going to be using physics, so enable the Arcade Physics system
    this.physics.startSystem(Phaser.Physics.ARCADE);

    // A simple background for our game
    this.add.sprite(0, 0, 'sky');

    // The platforms group contains the ground and the 2 ledges we can jump on
    this.platforms = this.add.group();

    // We will enable physics for any object that is created in this group
    this.platforms.enableBody = true;

    // Here we create the ground.
    let ground = this.platforms.create(0, this.world.height - 64, 'platform');

    // Scale it to fit the width of the game (the original sprite is 400x32 in size)
    ground.scale.setTo(2, 2);

    // This stops it from falling away when you jump on it
    ground.body.immovable = true;

    // Now let's create two ledges
    let ledge = this.platforms.create(400, 250, 'platform');
    ledge.body.immovable = true;

    ledge = this.platforms.create(-150, 350, 'platform');
    ledge.body.immovable = true;

    // The player and its settings
    this.player = this.add.sprite(32, this.world.height - 150, 'dude');

    // We need to enable physics on the player
    this.physics.arcade.enable(this.player);

    // Player physics properties. Give the little guy a slight bounce.
    this.player.body.bounce.y = this.config.playerBounce;
    this.player.body.gravity.y = this.config.playerGravity;
    this.player.body.collideWorldBounds = true;

    // Our two animations, walking left and right.
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);

    // Finally some stars to collect
    this.stars = this.add.group();

    // We will enable physics for any star that is created in this group
    this.stars.enableBody = true;

    // Here we'll create 12 of them evenly spaced apart
    for (let i = 0; i < this.config.numStars; i++) {
      // Create a star inside of the 'stars' group
      let star = this.stars.create(i * 70, 0, 'star');

      // Let gravity do its thing
      star.body.gravity.y = this.config.starGravity;

      // This just gives each star a slightly random bounce value
      star.body.bounce.y = this.config.starBounceBase + Math.random() * 0.2;
    }

    // The score
    this.scoreText = this.add.text(16, 16, `Score: ${this.data.score}`, {
      fontSize: '32px',
      fill: '#000'
    });

    // Our controls.
    this.cursors = this.input.keyboard.createCursorKeys();

    // Create the timer and start it
    this.createTimer();
  },

  update: function () {
    // Collide the player and the stars with the platforms
    this.physics.arcade.collide(this.player, this.platforms);
    this.physics.arcade.collide(this.stars, this.platforms);

    // Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
    this.physics.arcade.overlap(this.player, this.stars, this.collectStar, null, this);

    // Reset the players velocity (movement)
    this.player.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      // Move to the left
      this.player.body.velocity.x = this.config.playerVelocityX * -1;

      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      // Move to the right
      this.player.body.velocity.x = this.config.playerVelocityX;

      this.player.animations.play('right');
    } else {
      // Stand still
      this.player.animations.stop();

      this.player.frame = 4;
    }

    // Allow the player to jump if they are touching the ground.
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = this.config.playerVelocityY * -1;
    }
  },

  collectStar: function (player, star) {
    // Removes the star from the screen
    star.kill();

    // Add and update the score
    this.data.score += this.config.pointsPerStar;
    this.scoreText.text = `Score: ${this.data.score}`;

    if (!this.stars.countLiving()) {
      this.data.score += this.timeLeft * this.config.pointsPerSecond;
      this.state.start('Level3', true, false, this.config, this.data);
    }
  },

  createTimer: function () {
    if (!this.config.timeTimit) {
      return;
    }

    let timer = this.time.create(false);
    timer.loop(1000, this.updateTimer, this);
    timer.start();

    this.timeLeft = this.config.timeLimit;

    this.timerText = this.add.text(200, 16, `Time Left: ${this.timeLeft}`, {
      fontSize: '32px',
      fill: '#000'
    });
  },

  updateTimer: function () {
    if (this.timeLeft == 0) {
      this.state.start('Lose', true, false, this.config, this.data);
      return;
    }
    --this.timeLeft;
    this.timerText.text = `Time Left: ${this.timeLeft}`;
  }
};

