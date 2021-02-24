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

module.exports = { Pokemon, Trainer };
