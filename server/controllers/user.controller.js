// Bringing in installs & schema
const router = require("express").Router();
const User = require("../models/user.model.js");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;
const validateSession = require("../middleware/validate-session")

// Creating a user signup endpoint
//* http://localhost:4000/user/signup
router.post("/signup", async (req, res) => {
    try {
        // Making the info for a signup
        const user = new User ({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 13)
        });

        // Saving the user once input is added
        const newUser = await user.save();

        // Making sure our users have their own ID
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
}); //! WORKS :)))

// Login Endpoint
//* http://localhost:4000/user/login
router.post("/login", async (req, res) => {
    try {
        // Things in the body
        const { email, password } = req.body;

        // Finding the user
        const user = await User.findOne({email: email});

        // If no user = give error
        if (!user) throw new Error("User not found! :(");

        // Making sure our user/password match
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) throw new Error("Email or password does not match.");

        const token = jwt.sign({id: user._id}, SECRET, {expiresIn: 60 * 60 * 24});

        res.status(200).json({
            message: 'Back for the party?!',
            user,
            token
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}); //! WORKS :))

//? GET one user Endpoint
//* http://localhost:4000/user/info
router.get("/info", validateSession, async (req, res) => {
    try {
        // Finding User
        const locateUser = await User.findOne({_id: req.user._id});

        locateUser ?

        // Sending a response to the user
        res.status(200).json({
            msg: `User found!`,
            locateUser
        })

        : res.status(404).json({
            msg: "No user found :("
        })
    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
    }
});


//? Edit User Info Endpoint
//* http://localhost:4000/user/:id
router.patch("/:id", validateSession, async (req, res) => {
    try {
        // all the things inside the body that we want to change
        const { email, password, firstName, lastName } = req.body;
        // New info in the user
        const newUserInfo = { email, password, firstName, lastName };

        const returnOption = {new: true};

        // Finding the user for the update
        const updateUser = await User.findOneAndUpdate({_id: req.user._id}, newUserInfo, returnOption);


        // Sending a response to the user.
        updateUser ?
        res.status(200).json({
            message: `Updated User!`,
            updateUser,
        })
        : res.status(404).json({
            message: `User not found :(`
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}); //! WORKS :)))


//? Delete User Endpoint
//* http://localhost:4000/user/delete
router.delete('/delete', validateSession, async (req, res) => {
    try {
        // Pulling in the user we wanna delete.
        const deleteUser = await User.deleteOne({_id: req.user._id});

        // Sending a response to the user.
        deleteUser.deletedCount === 1 ?
        res.status(200).json({
            message: "User deleted!"
        })
        :res.status(404).json({
            message: "User not found :("
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}); //! WORKS :))

module.exports = router;