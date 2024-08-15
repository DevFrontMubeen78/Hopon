const userLocation = require('../model/User.location');

// Add User Location 
const AddUserLocation = async (req, res) => {
    try {
        const {
            pickup_date, pickup_hour, pickup_time, pickup_location, destination_location, trip_type } = req.body;

        // Create a new user location instance with the provided data
        const locationSave = new userLocation({
            pickup_date,
            pickup_hour,
            pickup_time,
            pickup_location,
            destination_location,
            trip_type
        });

        // Save the user location to the database
        await locationSave.save();

        // Return a success response with the saved location data
        return res.status(200).json({ message: 'User Location Successfully Added', location: locationSave });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// get All User location
const getAllUserLocations = async (req, res) => {
    try {
        const getUserLocations = await userLocation.find()
        if (getUserLocations.length === 0) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json(getUserLocations);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// get User location by single id
const getUserLocationsById = async (req, res) => {
    try {
        const id = req.params.id;
        const getAllUsrLocationsById = await userLocation.findById(id)
        if (!getAllUsrLocationsById) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json(getAllUsrLocationsById);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// update User location by single id
const UpdateUserLocationsById = async (req, res) => {
    try {
        const id = req.params.id;
        const UpdateAllUsrLocationsById = await userLocation.findByIdAndUpdate(id, req.body)
        if (!UpdateAllUsrLocationsById) {
            return res.status(404).json({ error: "User Not Found" });
        }
        // res.status(200).json({message : "User Data sucksexxfully Updated"});
        res.status(200).json({ message: "User Data Successfully Updated", UpdateAllUsrLocationsById });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// delete User location by single id
const DeleteUserLocationsById = async (req, res) => {
    try {
        const id = req.params.id;
        const delUsrLocationsById = await userLocation.findByIdAndDelete(id)
        if (!delUsrLocationsById) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json({ message: "User Location Successfully Delete", delUsrLocationsById });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = { AddUserLocation, getAllUserLocations, getUserLocationsById, UpdateUserLocationsById, DeleteUserLocationsById }