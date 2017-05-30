var Platformer = Platformer || {};

Platformer.GameData = function (params) {
  params = params || {};

  this.level = params.level || 'level1';
  this.name = params.name || 'Player';
  this.score = params.score || 0;
};

