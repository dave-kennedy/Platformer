var Platformer = Platformer || {};

Platformer.GameData = function (params) {
  params = params || {};

  this.name = params.name || 'Player';
  this.score = params.score || 0;
};

