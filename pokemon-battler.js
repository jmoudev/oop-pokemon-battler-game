const { strengths, weaknesses } = require('./pokemon-types');

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
}

class Battle {
  constructor(trainers) {
    this.trainers = trainers;
    this.turn = 0;
    this.message = '';
  }
}

module.exports = { Pokemon, Trainer, Battle };
