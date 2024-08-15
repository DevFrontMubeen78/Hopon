const mongoose = require('mongoose');

const VehicleDetail = mongoose.Schema({

    select_multiple_vahicles: {
        type: String,
        required: true
    },
    passangers: {
        type: String,
        required: true
    },
    luggages: {
        type: String,
        required: true
    },
    hand_luggage: {
        type: String,
        required: true
    },
    allocate_driver: {
        type: String,
        required: true
    },
    company_accounts: {
        type: String,
        required: true
    },
    trip_detail: {
        type: String,
        enum: ['lead', 'auto dispatch', 'bidding'],
        default: "lead"
    }
});


// export to controller
module.exports = mongoose.model("VehicleDetail", VehicleDetail);