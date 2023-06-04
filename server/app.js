//TODO do base port and require statements
require("dotenv").config();
const express = require("express");
const app = express();
// Points to our environment file and puts the value of PORT from that variable into this PORT variable.
const PORT = process.env.PORT;
const log = console.log;
// Console log check for port/server running

// ---------------------- Controllers: -------------------
/* const user = require("./controllers/user.controller");
const message = require("./controllers/message.controller");
const room = require("./controllers/room.controller");
 */
// Adding cors() to handle the preflight request for us (something Postman did for us), this is part of our server middleware required and called in the app.js
const cors = require('cors');


// Require in the mongoose middleware, pulled/used from node_modules
const mongoose = require("mongoose");
// Create a variable for our connection address variable from the .env
const MONGO = process.env.MONGODB;

mongoose.connect(`${MONGO}/`);

// Create a variable that is an event listener to check if connected.
const db = mongoose.connection;

// Use the above variable to trigger event listener to check connection
db.once("open", () => log(`Connected: ${MONGO}`));

// Added to allow us to accept JSON data from the body of our client.
app.use(express.json());

// Allowing the app to use cors
app.use(cors());

/* app.use("/user", user);
app.use("/room", room);
app.use("/message", message); */
app.listen(PORT, () => log(`Career Clash server on PORT: ${PORT}`));
