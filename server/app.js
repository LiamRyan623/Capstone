// ! MAKE COMMENTS
require('dotenv').config();
const express = require('express');
const app = express();
const PORT = process.env.port
const cors = require("cors");
app.use(express.json());
const mongoose = require("mongoose");

const MONGO = process.env.MONGODB;

mongoose.connect(`${MONGO}`);

const db = mongoose.connection;
db.once("open", () => console.log(`Connected: ${MONGO}`));


//* Controller Variables 
const users = require("./controllers/user.controller");

app.listen(PORT, () => console.log(`React Server on Port: ${PORT}`));