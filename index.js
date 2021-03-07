var inquirer = require('inquirer');

const CLIStarter = async () => {
  const timeout = ms => {
    return new Promise(resolve => setTimeout(resolve, ms));
  };

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

    console.log(`Hey ${first_name}....`);

    await timeout(1000);

    console.log(`Your starter Pokemon is ${starter_pokemon}!`);
  } catch (err) {
    console.log(err.isTtyError);
  }
};

const CLIBattle = async () => {};

const pokemonGame = async () => {
  await CLIStarter();
  await CLIBattle();
};
