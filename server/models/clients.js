const mongoose = require("mongoose");

const clientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: [true, "Please enter a first name"],
    },
    lastname: {
        type: String,
        required: [true, "Please enter a last name"],
    },
    phone: {
        type: String,
        required: [true, "Please enter a phone number"],
        match:[/^[1-9]\d{1,8}$/, "Please enter a valid phone number"],
        unique: true,
    },
    address: {
        type: String,
        required: [true, "Please enter an address"],
    },
    zip_code: {
        type: String,
        required: [true, "Please enter a zip code"],
    },
    city: {
        type: String,
        required: [true, "Please enter a city"],
    },
    email: {
        type: String,
        required: false,
        unique: true,
        trim: true,
        match : [/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Please enter a valid email address']
    },
});

module.exports = mongoose.model("Client", clientSchema);


