const mongoose = require("mongoose");

const connection = mongoose.connect(
  "mongodb+srv://reddyvaritejeshkumarreddy:reddy@cluster0.fohobtg.mongodb.net"
);

module.exports = {
  connection,
};
