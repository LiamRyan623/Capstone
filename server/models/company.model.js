const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
    company: {
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
}
);

module.exports = mongoose.model("Company", CompanySchema);