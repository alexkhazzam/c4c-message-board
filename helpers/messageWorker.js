const fs = require('fs');
const path = require('path');

module.exports.readMessages = cb =>
  fs.readFile(path.join(__dirname, '../data/messages.json'), (err, data) => {
    if (err) {
      throw err.message;
    } else {
      cb(JSON.parse(data).messages);
    }
  });

module.exports.writeMessage = (message, date, cb) => {
  this.readMessages(messages => {
    const parsedMessages = messages;
    parsedMessages.unshift({ date, message });

    fs.writeFile(
      path.join(__dirname, '../data/messages.json'),
      JSON.stringify({ messages: parsedMessages }),
      err => {
        if (err) {
          throw err.message;
        } else {
          cb();
        }
      }
    );
  });
};
