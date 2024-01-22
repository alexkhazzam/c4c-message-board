# c4c-message-board

## High level overview

let's start off with the languages I am using! This is a Node.js application that serves front-end code through the use of ejs, a templating engine. When the project is run, a web server can be viewed at localhost:3000, featuring a message board. Users can enter a message and post it to the message board, where other individuals can see that new message in real-time without refreshing their browser. Messages persist after a server reload, as they are stored in the file system. When the server is killed, existing messages can be found at ./data/messages.json; and when the server is restarted, these messages are loaded onto the page.

## Components and their interactions

The heart of this project and the runner code lies in ./index.js. This file is responsible for creating an Express server as well as rendering static html/css and client-side JavaScript. There is only one html page, which can be found at ./views/index.ejs. Technically this is an ejs file, but for the sake of simplicity we can treat it as "html with quirks." I am able to dynamically render server-side variables to this ejs file and interact with them; through this process, messages that are stored in the file system are transported to the front-end.

The only routes that are registered on the server are "/" and "/save-message." The default path, "/," is responsible for loading all existing messages onto the page and serving the index.ejs file. The path "/save-message" is a middleware that is called from the front-end. The code for this path can be found in ./restAPI/saveMessage.js. On the front-end, a POST request is made to this path from the file ./public/js/main.js, containing a message and created date. The message is then saved on the backend, filtered for any inappropriate language and stored in the file system. In response to the POST request, the message is sent back to the client, this time filtered for language.

As a side note, the helper file ./helpers/messageWorker.js is responsible for reading/writing files to the file system. Calls to this file are made from within ./index.js and ./restAPI/saveMessage.js.

Each time a message is created on the front-end, socket.io emits a "newMessage" alert, which is registered by the server. The server then emits a "broadcastMessage" alert to every existing process, pushing the new message to all devices in real-time. The server-side code for this can be found in ./index.js, lines 29-35, and the front-end code can be found in ./public/js/main.js, lines 4-9 and 47. Hopefully this provided a detailed explanation. If you have anymore questions on how the code is structured, please reach out to me!

## Additional Features

- **Allowed existing messages to survive browser reloads through using the file system**. I was considering using the browser's built-in indexDB or cookies, but decided against it. As a side note, since I am serving front-end code from a Node.js backend, it would be necessary for the project to be hosted on Heroku in order to have messages persist across different devices. However, this application works just fine on a single computer.

- **Used Socket.io to display messages in real-time without the need to reload a page**.

- **Filtered innapropriate language from messages**.

## Getting Started

**Important:** this application is built with Node.js and runs on port 3000 by default. Please ensure that this port is clear before running the code! If for some reason you cannot use port 3000, navigate to ./config.env and update the PORT variable.

### Quick Run

To install the required packages and spin up the development environment all in one step, run the following command in the root directory of the project.

```bash
$ sh run.sh
```

### Installation

```bash
$ npm install
```

### Running Project

Execute the following command to run the project `with` development environment.

```bash
$ npm run start:dev
```

Execute the following command to run the project `without` development environment.

```bash
$ npm start
```
