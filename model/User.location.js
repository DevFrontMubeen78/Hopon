const mongoose = require('mongoose');

const userLocation = mongoose.Schema({
    pickup_date: {
        type: Date,
        required: true
    },
    pickup_hour: {
        type: String,
        required: true
    },
    pickup_time: {
        type: String,
        required: true
    },
    pickup_location: {
        type: String,
        required: true
    },
    destination_location: {
        type: String,
        required: true
    },
    trip_type: {
        type: String,
        enum: ["one way", "return", "W/R"],
        default: "one way"
    }
});

// export to controller
module.exports = mongoose.model("userLocation", userLocation);