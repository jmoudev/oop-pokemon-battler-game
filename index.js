var inquirer = require('inquirer');
const { Trainer, Battle } = require('./pokemon-battler');
const { pokemon, misty } = require('./pokemon');

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const interval = 100;

// pokemon already created need to be imported
// trainer not yet created, however misty need to be created
// battle needs to be created

const trainerSetup = async () => {
  try {
    const { first_name, starter_pokemon } = await inquirer.prompt([
      {
        type: 'input',
        name: 'first_name',
        message: "What's your first name?"
      },
      {
        type: 'list',
        name: 'starter_pokemon',
        message: 'Please choose your starter Pokemon',
        choices: ['Bulbasaur', 'Charmander', 'Squirtle', 'Pikachu']
      }
    ]);

    console.log(`Hey ${first_name}....\n`);

    await timeout(interval);

    console.log(`Your starter Pokemon is ${starter_pokemon}!\n`);

    return new Trainer(first_name, [pokemon[starter_pokemon]]);
  } catch (err) {
    console.log(err.isTtyError);
  }
};

const battleMisty = async trainer => {
  try {
    const battle = new Battle(
      [trainer, misty],
      [trainer.storage[0]],
      [pokemon.Squirtle, pokemon.Staryu]
    );

    await timeout(interval);

    console.log('Misty wants to battle!\n');

    await timeout(interval);

    const { accept_battle } = await inquirer.prompt([
      {
        type: 'list',
        name: 'accept_battle',
        message: 'Do you accept?',
        choices: ['Yes', 'No']
      }
    ]);

    if (accept_battle === 'Yes') {
      console.log('\nin battle\n');

      while (battle.battleActive) {
        if (!battle.turn) {
          await timeout(interval);

          const trainer = battle.trainers[0];
          const attackingPokemon = battle.pokemon[0][battle.battlingPokemon[0]];

          console.log(
            `${attackingPokemon.name} is battling for ${trainer.name}`
          );

          await timeout(interval);

          const { move } = await inquirer.prompt([
            {
              type: 'list',
              name: 'move',
              message: 'Choose battle move',
              choices: attackingPokemon.moves
            }
          ]);

          battle.fight(move);

          await timeout(interval);

          console.log(battle.message);
        } else {
          // logic for when defending
          await timeout(interval);

          console.log('Misty is attacking with pokemon...');

          battle.fight('Tackle');

          await timeout(interval);

          console.log('pokemon uses tackle');
        }
      }

      const { fight_move } = await inquirer.prompt([
        {
          type: 'list',
          name: 'fight_move',
          message: 'Do you accept?',
          choices: ['Tackle', 'Ember']
        }
      ]);
    }
  } catch (err) {
    console.log(err.isTtyError);
  }
};

const pokemonGame = async () => {
  const trainer = await trainerSetup();
  await battleMisty(trainer);
};

pokemonGame();
// need to heal the pokemon once the battle is finished
