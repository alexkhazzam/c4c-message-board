# c4c-message-board

### Additional Features

- **Allowed existing messages to survive browser reloads through using the file system**. I was considering using the browser's built-in indexDB or cookies, but decided against it. As a side note, since I am serving front-end code from a Node.js backend, it would be necessary for the project to be hosted on Heroku in order to have messages persist across different devices. However, this application works just fine on a single computer.

- **Used Socket.io to have messages displayed in real-time without the need to reload a page**.

- **Filtered innapropriate language from messages**.

## Getting Started

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
