const {signUp} = require("./src/controller/user")
require("./src/db/connection")
const process = require('process');
const args = process.argv;
console.log('Command line arguments:', args);
const params = args.slice(2);
console.log(params[0], params[1])
signUp(params[0], params[1])
  .then(result => console.log(result))
  .catch(error => console.error(error));