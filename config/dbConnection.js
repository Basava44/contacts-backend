// here w euse mongoose which is used to connect mongoDB database

const mongoose = require("mongoose");

const connectDb = async () => {
  try {
    const connect = await mongoose.connect(process.env.CONNECTION_STRING);
    console.log(
      "Connection Established",
      connect.connection.name,
      connect.connection.host
    );
  } catch (error) {
    console.log(error);
    process.exit();
  }
};

module.exports = connectDb;
