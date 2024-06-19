
# DC-Tracker

It is a discord bot that can track the words specified by the administrator

## Features

- You can find out how many times the word was mentioned on the server
- All users talked about a word
- Search for a specific word mentioned by the user, how many times the user mentioned the positive and negative word
- Sending a message to the server as a bot

## Screenshots
![Screenshot 2024-06-19 121901](https://github.com/Sosh79/dc-tracker/assets/167375751/27dae625-bf0a-46f0-aadc-66e64090b3ca)

![Screenshot 2024-06-19 122307](https://github.com/Sosh79/dc-tracker/assets/167375751/4156ab24-7d90-46ba-a89b-7e86c5c7cafd)

## Admin Account
#### You need this to log in
- [Admin Documents ](https://pastebin.com/0ydhnbbw)

## Environment Variables

To run this project, you will need to add the following environment variables to your .env file

`CONNECT`="mongodb://localhost:27017/Discord-bot?retryWrites=true&w=majority&appName=Cluster0"

`API_KEY`=For Gemini

`TOKEN`=For Discord-bot

`TOKEN_CHAT`=For Discord-bot-Chat

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

