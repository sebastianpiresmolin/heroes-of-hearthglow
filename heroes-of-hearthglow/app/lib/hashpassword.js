// Hash a password using bcryptjs
// Usage: node app/lib/hashpassword.js <password>
// I've written this program to create hashed password ready to be manually inserted into the database.
// because there is no registration page to hash the password for the user.

const bcryptjs = require('bcryptjs');

const password = process.argv[2]; // Get password from command line argument

if (!password) {
  console.log('Please provide a password to hash as an argument.');
  process.exit(1);
}

const saltRounds = 10; // You can adjust the salt rounds as needed

bcryptjs.genSalt(saltRounds, function(err, salt) {
  if (err) {
    console.error('Error generating salt:', err);
    return;
  }

  bcryptjs.hash(password, salt, function(err, hash) {
    if (err) {
      console.error('Error hashing password:', err);
      return;
    }

    console.log('Hashed Password:', hash);
  });
});