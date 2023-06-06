// Bringing in installs & schema
const router = require("express").Router();
const User = require("../models/user.model.js");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;

// Creating a user endpoint
//* http://localhost:4000/user/signup
router.post("/signup", async (req, res) => {
    try {
        const user = new User ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 13)
        });

        const newUser = await user.save();

        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: "1day"});

        res.status(200).json({
            user: newUser,

            message: 'Welcome to Career Clash!', token
        });

    } catch (err) {
        res.status(500).json ({
            ERROR: err.message,
        });
    }
});

// ? Login Endpoint


