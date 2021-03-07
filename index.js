var inquirer = require('inquirer');

const timeout = ms => {
  return new Promise(resolve => setTimeout(resolve, ms));
};

const CLIStarter = async () => {
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
  } catch (err) {
    console.log(err.isTtyError);
  }
};

const CLIBattle = async () => {
  try {
    await timeout(1000);

    console.log('Misty wants to battle!\n');

    await timeout(1000);

    const { battle } = await inquirer.prompt([
      {
        type: 'list',
        name: 'battle',
        message: 'Do you accept?',
        choices: ['yes', 'no']
      }
    ]);

    if (battle) {
      console.log('\nin battle\n');
    }
  } catch (err) {
    console.log(err.isTtyError);
  }
};

const pokemonGame = async () => {
  await CLIStarter();
  await CLIBattle();
};

pokemonGame();
