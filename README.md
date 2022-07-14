# Discord Bot
Discord bot with the name **Olaf**.

# Serve
If not already installed, run the command `npm install -g yarn` to install yarn.  
Run the script `yarn start` to build the bot and serve it.

# Apply your parameters
- Create a file with the name `auth.json` containing the following code
  
  ```json
  {
    "token" : "secret_token"
  }
  ```

  Replace `secret_token` with your bot token.
- In the file `./src/parameters/config.json` and `./src/parameters/server.json` change the values of the keys so that it matches the id's of your discord server (client)

# The commands
## Hello
`/hello` is just used for checking if the bot is online. It can just be used by developers.

## User
`/user` can be used to get infos about yourself or another user.

## Miesmuschel
`/miesmuschel` lets the user ask a question and gets a random answer.