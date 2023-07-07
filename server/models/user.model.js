const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    headline:{
        type: String,
        required: false,
    },
    aboutMe: {
        type: String,
        required: false,
    },
}
);

module.exports = mongoose.model("User", UserSchema);