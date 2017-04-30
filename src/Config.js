var Platformer = Platformer || {};

Platformer.Config = function (params) {
  params = params || {};

  this.firstLevel = params.firstLevel || 'Level1';
  this.gameHeight = params.gameHeight || 600;
  this.gameWidth = params.gameWidth || 800;
  this.numStars = params.numStars || 12;
  this.playerBounce = params.playerBounce || 0.2;
  this.playerGravity = params.playerGravity || 300;
  this.playerVelocityX = params.playerVelocityX || 150;
  this.playerVelocityY = params.playerVelocityY || 300;
  this.pointsPerSecond = params.pointsPerSecond || 10;
  this.pointsPerStar = params.pointsPerStar || 10;
  this.starBounceBase = params.starBounceBase || 0.5;
  this.starGravity = params.starGravity || 300;
  this.timeLimit = params.timeLimit || 20;
};

