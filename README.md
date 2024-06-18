
# DC-Tracker

It is a discord bot that can track the words specified by the administrator

## Features

- You can find out how many times the word was mentioned on the server
- All users who talked about a word?
- Search for a specific word mentioned by the user, how many times the user mentioned the positive and negative word
- Sending a message to the server as a bot


## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CONNECT` .For DB

`API_KEY`  .For Gemini

`TOKEN`   .For Discord-bot

`TOKEN_CHAT`  .For Discord-bot-Chat

`AUTH_SECRET`  =123456

`AUTH_URL`   =http://localhost:3000/api/auth

## Run Locally

Clone the project

```bash
  git clone https://github.com/Sosh79/dc-tracker.git
```

Go to the frontEnd directory

```bash
  cd frontEnd-project
```

Install modules

```bash
  npm i
```

Start the server

```bash
  npm run dev
```
#
Go to the backEnd directory

```bash
  cd backEnd-project
```

Install modules

```bash
  npm i
```

Start the backEnd

```bash
  node ./src/index.js
```

