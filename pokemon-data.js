const moves = {
  Tackle: { type: 'normal', damage: 40 },
  'Vine Whip': { type: 'grass', damage: 45 },
  'Quick Attack': { type: 'normal', damage: 40 },
  'Thunder Shock': { type: 'electric', damage: 40 },
  'Water Gun': { type: 'water', damage: 40 },
  Ember: { type: 'fire', damage: 45 }
};

const types = {
  strengths: {
    fire: 'grass',
    water: 'fire',
    grass: 'water',
    electric: 'water'
  },
  weaknesses: { fire: 'water', water: 'grass', grass: 'fire' }
};

module.exports = { moves, types };
