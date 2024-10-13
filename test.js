const { Api, TelegramClient } = require("telegram");
const { StringSession } = require("telegram/sessions");
const input = require("input"); // npm install input
const fs = require('fs'); // File system to write to a file
const sleep = require('util').promisify(setTimeout); // Sleep function to avoid rate limiting

// Define your apiId and apiHash here
const apiId = 7841375;  // Replace with your actual API ID
const apiHash = '17b13f5282b4c076c638ea0d45c5e353';  // Replace with your actual API Hash

// Leave the session as an empty string for the first run
const session = new StringSession("");  // Empty string means a new session

const client = new TelegramClient(session, apiId, apiHash, {});

async function checkUsername(username) {
  try {
    const result = await client.invoke(
      new Api.account.CheckUsername({
        username: username,
      })
    );
    return result;  // Returns true if username exists
  } catch (e) {
    console.error(`Error checking username ${username}:`, e);
    return null;
  }
}

async function bruteforceUsernames() {
  const writeStream = fs.createWriteStream('existing_usernames.txt', { flags: 'a' });

  // Read the usernames from words.txt file
  const usernames = fs.readFileSync('words.txt', 'utf-8').split('\n').map(line => line.trim());

  // Iterate over each username from the file
  for (let username of usernames) {
    if (username) { // Only process non-empty lines
      console.log(`Checking username: ${username}`);

      const result = await checkUsername(username);

      // If username exists, write it to the file
      if (result === true) {
        writeStream.write(`${username}\n`);
        console.log(`Found existing username: ${username}`);
      }

      // Wait for 1 second to avoid rate limiting
      await sleep(1000);
    }
  }

  writeStream.end();
}

(async function run() {
  // Start the client and log in
  await client.start({
    phoneNumber: async () => await input.text("Please enter your phone number: "),
    password: async () => await input.text("Please enter your password (if 2FA is enabled): "),
    phoneCode: async () => await input.text("Enter the code you received: "),
    onError: (err) => console.log(err),
  });

  // Print the StringSession so you can save it and reuse it
  console.log("Your session string is: ");
  console.log(client.session.save());  // This prints out the session string you can reuse

  // Start bruteforcing usernames from words.txt
  await bruteforceUsernames();
})();
