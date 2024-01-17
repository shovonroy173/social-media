const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cors = require("cors");

const authRouter = require("./route/authRouter");

const app = express();
app.use(cors());
dotenv.config();
//MongoDB Connection
mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("Database connected");
  })
  .catch(() => {
    console.log("Database NOT connected");
  });

app.use(express.json());

app.use("/api/auth" , authRouter);


// port connection
app.listen(process.env.PORT, () => console.log("Server is running on port 5000"));
