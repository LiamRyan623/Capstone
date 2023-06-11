// Bringing in installs & schema
const router = require("express").Router();
const Comp = require("../models/company.model")
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET = process.env.JWT;
const validateSession = require("../middleware/validate-session-company")

// Creating a company signup endpoint
//* http://localhost:4000/comp/signupComp
router.post("/signupComp", async (req, res) => {
    try {
        // Making the info for a signup
        const comp = new Comp ({
            company: req.body.company,
            email: req.body.email,
            password: bcrypt.hashSync(req.body.password, 13)
        });

        // Saving the user once input is added
        const newComp = await comp.save();

        // Making sure our users have their own ID
        const token = jwt.sign({id: comp._id}, SECRET, {expiresIn: "1day"});

        res.status(200).json({
            company: newComp,

            message: 'Welcome to Career Clash!', token
        });

    } catch (err) {
        res.status(500).json ({
            ERROR: err.message,
        });
    }
}); 

// Login Endpoint
//* http://localhost:4000/comp/loginComp
router.post("/loginComp", async (req, res) => {
    try {
        // Things in the body
        const { email, password } = req.body;

        // Finding the user
        const comp = await Comp.findOne({email: email});

        // If no user = give error
        if (!comp) throw new Error("Company not found! :(");

        // Making sure our user/password match
        const passwordMatch = await bcrypt.compare(password, comp.password);

        if (!passwordMatch) throw new Error("Email or password does not match.");

        const token = jwt.sign({id: comp._id}, SECRET, {expiresIn: 60 * 60 * 24});

        res.status(200).json({
            message: 'Back for the party?!',
            comp,
            token
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}); //! WORKS :))

//? GET one user Endpoint
//* http://localhost:4000/comp/compInfo
router.get("/compInfo", validateSession, async (req, res) => {
    try {
        // Finding company
        const locateComp = await Comp.findOne({_id: req.comp._id});

        locateComp ?

        // Sending a response to the user
        res.status(200).json({
            msg: `Company found!`,
            locateComp
        })

        : res.status(404).json({
            msg: "No company found :("
        })
    } catch (err) {
        res.status(500).json({
            Error: err.message
        })
    }
}); // ! WORKS :)))

//? Edit User Info Endpoint
//* http://localhost:4000/comp/:id
router.patch("/:id", validateSession, async (req, res) => {
    try {
        // all the things inside the body that we want to change
        const { email, password, company } = req.body;
        // New info in the user
        const newCompInfo = { email, password, company };

        const returnOption = {new: true};

        // Finding the user for the update
        const updateComp = await Comp.findOneAndUpdate({_id: req.comp._id}, newCompInfo, returnOption);

        // Sending a response to the user.
        updateComp ?
        res.status(200).json({
            message: `Updated Comp!`,
            updateComp,
        })
        : res.status(404).json({
            message: `Company not found :(`
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}); //! WORKS :)))


//? Delete User Endpoint
//* http://localhost:4000/comp/delete
router.delete('/delete', validateSession, async (req, res) => {
    try {
        // Pulling in the user we wanna delete.
        const deleteCompany = await Comp.deleteOne({_id: req.comp._id});

        // Sending a response to the user.
        deleteCompany.deletedCount === 1 ?
        res.status(200).json({
            message: "Company deleted!"
        })
        :res.status(404).json({
            message: "Company not found :("
        });
    } catch (err) {
        res.status(500).json({
            msg: err.message
        })
    }
}); //! WORKS :))

module.exports = router;