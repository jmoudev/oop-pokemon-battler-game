var inquirer = require('inquirer');
inquirer
  .prompt([])
  .then(answers => {
    // Use user feedback for... whatever!!
  })
  .catch(error => {
    if (error.isTtyError) {
      // Prompt couldn't be rendered in the current environment
    } else {
      // Something else went wrong
    }
  });
