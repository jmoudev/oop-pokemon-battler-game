const { strengths, weaknesses } = require('./pokemon-types');

class Pokemon {
  constructor(name, hitPoints, attackDamage, cry, type) {
    this.name = name;
    this.hitPoints = hitPoints;
    this.attackDamage = attackDamage;
    this.cry = cry;
    this.type = type;
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
