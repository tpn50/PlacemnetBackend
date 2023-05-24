const express = require("express");
const cors = require("cors"); // require CORS
const app = express();
require("dotenv").config();
const MONGODB_URL = process.env.DATABASE_URL;

const PORT = process.env.PORT || 8000;

app.use(cors()); // use CORS
app.use(express.json());

app.listen(PORT, () => {
  console.log(`App is listening at Port ${PORT}`);
});

const { connectDB } = require("./config/database");
connectDB();

const auth = require(`./routes/auth.js`);

app.use("/", auth);
