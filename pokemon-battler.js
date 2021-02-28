const { strengths, weaknesses } = require('./pokemon-types');
const moves = require('./pokemon-moves');

class Pokemon {
  constructor(name, hitPoints, cry, type, moves) {
    this.name = name;
    this.hitPoints = hitPoints;
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
  healPokemon() {
    return 'All Pokémon are now healed!';
  }
}

class Battle {
  constructor(trainers, trainer1Pokemon, trainer2Pokemon) {
    this.trainers = trainers;
    this.turn = 0;
    this.message = '';
    this.battlingPokemon = [0, 0];

    const pokemon = [trainer1Pokemon, trainer2Pokemon];

    this.pokemon = pokemon;
    this.battleActive = true;
  }

  fight(move) {
    let attackingPokemon = this.pokemon[this.turn][
      this.battlingPokemon[this.turn]
    ];
    let defendingPokemon = this.pokemon[this.turn ? 0 : 1][
      this.battlingPokemon[this.turn ? 0 : 1]
    ];

    if (!attackingPokemon) {
      this.message = `Battle over. ${
        this.trainers[this.turn ? 0 : 1].name
      } wins!`;
    } else {
      const pokemonHasMove = attackingPokemon.moves.includes(move);
      const moveExists = !!moves[move];

      if (!pokemonHasMove || !moveExists) {
        this.message = `${attackingPokemon.name} does not know move ${move}.`;
      } else {
        let attackDamage = moves[move].damage;
        let message = `${attackingPokemon.name} used ${move}.`;

        const moveType = moves[move].type;
        const strength = strengths[moveType] === defendingPokemon.type;
        const weakness = weaknesses[moveType] === defendingPokemon.type;

        if (strength) {
          attackDamage *= 1.25;
          message += " It's super effective.";
        }
        if (weakness) {
          attackDamage *= 0.75;
          message += " It's not very effective.";
        }

        let defenderHitPoints = defendingPokemon.hitPoints - attackDamage;
        const fainted = defenderHitPoints <= 0;

        if (fainted) {
          message += `\n${defendingPokemon.name} fainted.`;
          defenderHitPoints = 0;
          this.battlingPokemon[this.turn ? 0 : 1] += 1;
        }
        defendingPokemon.hitPoints = defenderHitPoints;

        if (
          this.battlingPokemon[this.turn ? 0 : 1] >=
          this.pokemon[this.turn ? 0 : 1].length
        ) {
          message += `\n${
            this.trainers[this.turn ? 0 : 1].name
          } is out of usable Pokémon. ${this.trainers[this.turn].name} wins!`;
        }
        this.message = message;

        this.turn = this.turn ? 0 : 1;
      }
    }
  }
  checkBattlingPokemon() {
    if (!this.battleActive) return 'Battle is no longer active.';

    const attackingTrainer = this.trainers[this.turn].name;
    const defendingTrainer = this.trainers[this.turn ? 0 : 1].name;
    const attackingPokemon = this.pokemon[this.turn][
      this.battlingPokemon[this.turn]
    ].name;
    const defendingPokemon = this.pokemon[this.turn ? 0 : 1][
      this.battlingPokemon[this.turn ? 0 : 1]
    ].name;

    return `${attackingTrainer}\'s ${attackingPokemon} is attacking. ${defendingTrainer}\'s ${defendingPokemon} is defending.`;
  }
}

module.exports = { Pokemon, Trainer, Battle };
