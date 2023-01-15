const Filter = require('bad-words');
const { writeMessage } = require('../helpers/messageWorker');

module.exports.postSaveMessage = (req, res) => {
  const data = [];

  req.on('data', chunk => {
    data.push(chunk);
  });

  req.on('end', () => {
    const { message, date } = JSON.parse(data.toString());

    const filteredMessage = new Filter().clean(message);

    writeMessage(filteredMessage, date, () => {
      res.json({ filteredMessage, date });
    });
  });
};
