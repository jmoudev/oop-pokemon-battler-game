const { Pokemon, Trainer } = require('./pokemon-battler');

const pokemon = {
  Bulbasaur: new Pokemon('Bulbasaur', 50, 'arrghh', 'grass', [
    'Tackle',
    'Vine Whip'
  ]),
  Charmander: new Pokemon('Charmander', 55, 'charrmander', 'fire', [
    'Tackle',
    'Ember'
  ]),
  Squirtle: new Pokemon('Squirtle', 55, 'squirrtle', 'water', [
    'Tackle',
    'Water Gun'
  ]),
  Pikcahu: new Pokemon('Pikachu', 45, 'pikachuuu', 'electric', [
    'Quick Attack',
    'Thunder Shock'
  ]),
  Staryu: new Pokemon('Staryu', 55, 'zzzzzzzz', 'water', [
    'Tackle',
    'Water Gun'
  ])
};

const misty = new Trainer('Misty', [pokemon.Squirtle, pokemon.Staryu]);

module.exports = { pokemon, misty };
