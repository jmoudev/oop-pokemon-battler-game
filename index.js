var inquirer = require('inquirer');
inquirer
  .prompt([
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
  ])
  .then(({ first_name, starter_pokemon }) => {
    console.log(`Hey ${first_name}....`);
    setTimeout(() => {
      console.log(`Your starter Pokemon is ${starter_pokemon}!`);
    }, 1000);
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
