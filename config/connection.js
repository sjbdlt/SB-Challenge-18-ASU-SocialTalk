const { connect, connection } = require('mongoose');

const connectionString =
  process.env.MONGODB_URI || `mongodb+srv://sjbdlt:root@cluster0.wj6j9lt.mongodb.net/socialTalkDB`;

connect(connectionString);

module.exports = connection;
