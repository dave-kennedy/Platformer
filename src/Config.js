var Platformer = Platformer || {};

Platformer.Config = function (params) {
  params = params || {};

  this.gameHeight = params.gameHeight || 512;
  this.gameWidth = params.gameWidth || 768;
  this.gravityX = params.gravityX || 0;
  this.gravityY = params.gravityY || 300;
  this.levels = params.levels || ['level1', 'level2'];
  this.numStars = params.numStars || 11;
  this.playerBounce = params.playerBounce || 0.2;
  this.playerVelocityX = params.playerVelocityX || 150;
  this.playerVelocityY = params.playerVelocityY || 300;
  this.starBounceBase = params.starBounceBase || 0.5;
};

