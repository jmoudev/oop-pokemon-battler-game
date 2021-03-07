var inquirer = require('inquirer');
const { Trainer, Battle } = require('./pokemon-battler');
const { pokemon, misty } = require('./pokemon');

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

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

    await timeout(1000);

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

    await timeout(1000);

    console.log('Misty wants to battle!\n');

    await timeout(1000);

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
