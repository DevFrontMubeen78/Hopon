const mongoose = require('mongoose');

const resetOtpSc = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "userRegSchema",
        required: true
    },
    otp: {
        type: Number,
        required: true
    }
});

// Export to controller
module.exports = mongoose.model('resetOtpSc', resetOtpSc);
