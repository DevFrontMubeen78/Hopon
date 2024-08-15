const mongoose = require('mongoose');

const userRegSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    verified: {
        type: Boolean,
        default: false
    }
});

// Export to controller
module.exports = mongoose.model('userRegSchema', userRegSchema);
