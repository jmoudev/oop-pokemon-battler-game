const { strengths, weaknesses } = require('./pokemon-types');
const moves = require('./pokemon-moves');

class Pokemon {
  constructor(name, hitPoints, attackDamage, cry, type, moves) {
    this.name = name;
    this.hitPoints = hitPoints;
    this.attackDamage = attackDamage;
    this.cry = cry;
    this.type = type;
    this.moves = moves;
  }

  sound(n = 1) {
    const criesArr = [];

    for (let i = 0; i < n; i++) {
      criesArr.push(this.cry);
    }

    const cries = criesArr.join(' ');

    return `${this.name}: ${cries}...`;
  }
}

class Trainer {
  constructor(name, storage) {
    this.name = name;
    this.storage = storage;
  }

  checkMoves(pokemon) {
    const storageIndex = this.getPokemonIndexInStorage(pokemon);
    if (storageIndex === -1) return `${pokemon} is not available in storage.`;

    const pokemonMoves = this.storage[storageIndex].moves;
    const moveInfo = [];

    pokemonMoves.forEach(move => {
      moveInfo.push(
        `${move}: type: ${moves[move].type}, damage: ${moves[move].damage}.`
      );
    });

    return moveInfo.join('\n');
  }
  checkHealth(pokemon) {
    const storageIndex = this.getPokemonIndexInStorage(pokemon);
    if (storageIndex === -1) return `${pokemon} is not available in storage.`;

    const hp = this.storage[storageIndex].hitPoints;

    return `${pokemon} has ${hp} hp.`;
  }
  checkType(pokemon) {
    const storageIndex = this.getPokemonIndexInStorage(pokemon);
    if (storageIndex === -1) return `${pokemon} is not available in storage.`;

    const type = this.storage[storageIndex].type;
    const strength = strengths[type];
    const weakness = weaknesses[type];

    return `${pokemon} is a ${type} type pokemon. ${
      type.slice(0, 1).toUpperCase() + type.slice(1)
    } is strong against ${strength}, and weak against ${weakness}.`;
  }
  getPokemonIndexInStorage(pokemon) {
    const pokemonInStorage = this.storage.map(pokemon => pokemon.name);
    const storageIndex = pokemonInStorage.indexOf(pokemon);

    return storageIndex;
  }
}

class Battle {
  constructor(trainers, trainer1Pokemon, trainer2Pokemon) {
    this.trainers = trainers;
    this.turn = 0;
    this.message = '';

    const trainer1Name = trainers[0].name;
    const trainer2Name = trainers[1].name;

    const pokemonObj = {
      [trainer1Name]: trainer1Pokemon,
      [trainer2Name]: trainer2Pokemon
    };

    this.pokemon = pokemonObj;
  }
}

module.exports = { Pokemon, Trainer, Battle };
