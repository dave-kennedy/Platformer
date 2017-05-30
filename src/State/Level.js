var Platformer = Platformer || {};
Platformer.State = Platformer.State || {};

Platformer.State.Level = function (game) {
  this.collisionLayer;
  this.config;
  this.cursors;
  this.gameData;
  this.gameOver;
  this.player;
  this.stars;
  this.tilemap;
  this.tilemapData;
};

Platformer.State.Level.prototype = {
  init: function (config, gameData) {
    this.config = config;
    this.gameData = gameData;
  },

  preload: function () {
    this.load.onFileComplete.add(this.fileComplete, this);
    this.load.tilemap(this.gameData.level,
        `assets/levels/${this.gameData.level}.json`, null,
        Phaser.Tilemap.TILED_JSON);
  },

  fileComplete: function (progress, key, success) {
    if (key != this.gameData.level || progress != 100 || !success) {
      return;
    }
    this.tilemapData = this.cache.getTilemapData(this.gameData.level);
    this.tilemapData.data.tilesets.forEach(function (tileset) {
      let url = tileset.image.replace('..', 'assets');
      this.load.image(tileset.name, url);
    }, this);
  },

  create: function () {
    this.game.plugins.add(Phaser.Plugin.ArcadeSlopes);
    this.physics.startSystem(Phaser.Physics.ARCADE);
    this.physics.arcade.gravity.x = this.config.gravityX;
    this.physics.arcade.gravity.y = this.config.gravityY;
    this.add.sprite(0, 0, 'sky');
    this.tilemap = this.add.tilemap(this.gameData.level);
    this.tilemapData.data.tilesets.forEach(function (tileset) {
      this.tilemap.addTilesetImage(tileset.name, tileset.name);
    }, this);
    this.tilemapData.data.layers.forEach(function (layer) {
      let tilemapLayer = this.tilemap.createLayer(layer.name);
      if (layer.properties && layer.properties.collides) {
        this.collisionLayer = tilemapLayer;
        this.game.slopes.convertTilemapLayer(tilemapLayer, 'arcadeslopes');
        this.tilemap.setCollision(layer.data, true, tilemapLayer);
      }
      if (!layer.visible) {
        tilemapLayer.visible = false;
      }
    }, this);
    this.player = this.add.sprite(32, this.world.height - 150, 'dude');
    this.physics.arcade.enable(this.player);
    this.player.body.bounce.y = this.config.playerBounce;
    this.player.body.collideWorldBounds = true;
    this.player.animations.add('left', [0, 1, 2, 3], 10, true);
    this.player.animations.add('right', [5, 6, 7, 8], 10, true);
    this.stars = this.add.group();
    this.stars.enableBody = true;
    for (let i = 0; i < this.config.numStars; i++) {
      let star = this.stars.create(i * 70, 0, 'star');
      star.body.bounce.y = this.config.starBounceBase + Math.random() * 0.2;
      star.body.collideWorldBounds = true;
    }
    this.game.slopes.enable(this.player);
    this.game.slopes.enable(this.stars);
    this.game.slopes.preferY = true;
    this.player.body.slopes.pullDown = 100;
    this.cursors = this.input.keyboard.createCursorKeys();
  },

  update: function () {
    this.physics.arcade.collide(this.player, this.collisionLayer);
    this.physics.arcade.collide(this.stars, this.collisionLayer);
    this.physics.arcade.overlap(this.player, this.stars, this.collectStar,
        null, this);
    this.player.body.velocity.x = 0;
    if (this.cursors.left.isDown) {
      this.player.body.velocity.x = this.config.playerVelocityX * -1;
      this.player.animations.play('left');
    } else if (this.cursors.right.isDown) {
      this.player.body.velocity.x = this.config.playerVelocityX;
      this.player.animations.play('right');
    } else {
      this.player.animations.stop();
      this.player.frame = 4;
    }
    if (this.cursors.up.isDown && this.player.body.touching.down) {
      this.player.body.velocity.y = this.config.playerVelocityY * -1;
    }
    if (this.gameOver && this.input.keyboard.isDown(Phaser.Keyboard.ENTER)) {
      this.restart();
    }
  },

  collectStar: function (player, star) {
    star.kill();
    if (this.stars.countLiving()) {
      return;
    }
    this.nextLevel();
  },

  nextLevel: function () {
    let nextLevel = this.config.levels.indexOf(this.gameData.level) + 1;
    if (nextLevel > this.config.levels.length - 1) {
      this.gameOver = true;
      this.showGameOver();
      return;
    }
    this.gameData.level = this.config.levels[nextLevel];
    this.state.restart(true, false, this.config, this.gameData);
  },

  showGameOver: function () {
    this.add.text(318, 200, 'You win!', {
      fontSize: '32px',
      fill: '#f00'
    });
    this.add.text(264, 240, 'Press enter to restart', {
      fontSize: '24px',
      fill: '#fff'
    });
  },

  restart: function () {
    this.gameData.level = this.config.levels[0];
    this.state.restart(true, false, this.config, this.gameData);
  }
};

