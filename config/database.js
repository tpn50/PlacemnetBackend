const mongoose = require("mongoose");
require("dotenv").config();
const MONGODB_URL = process.env.DATABASE_URL;

exports.connectDB = () => {
  mongoose
    .connect(MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
      console.log("DB connected successfully");
    })
    .catch((err) => {
      console.log("DB CONNECTION ISSUES");
      console.error(err);
      process.exit(1);
    });
};
