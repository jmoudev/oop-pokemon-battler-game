class Pokemon {
  constructor(name, hitPoints, attackDamage, cry) {
    this.name = name;
    this.hitPoints = hitPoints;
    this.attackDamage = attackDamage;
    this.cry = cry;
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
