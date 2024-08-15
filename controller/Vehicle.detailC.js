const VehicleDetail = require('../model/Vehicle.detail');

// Add User Location 
const AddVehicleDetail = async (req, res) => {
    try {
        const { select_multiple_vahicles, passangers, luggages, hand_luggage, allocate_driver, company_accounts, trip_detail } = req.body;

        // Create a new vehicle detail 
        const VehicleDetailSave = new VehicleDetail({
            select_multiple_vahicles,
            passangers,
            luggages,
            hand_luggage,
            allocate_driver,
            company_accounts,
            trip_detail
        });

        // Save the vehicle detail
        await VehicleDetailSave.save();

        return res.status(200).json({ message: 'Vehicle Detail Successfully Added', location: VehicleDetailSave });

    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
};

// get All vehicle detail 
const getAllVehicleDetail = async (req, res) => {
    try {
        const getVehicleDetail = await VehicleDetail.find()
        if (getVehicleDetail.length === 0) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json(getVehicleDetail);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// get vehicle detail by single id
const getVehicleDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const getVehicleDetById = await VehicleDetail.findById(id)
        if (!getVehicleDetById) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json(getVehicleDetById);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// update vehicle detail  by single id
const UpdateVehicleDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const UpdateVehDetailById = await VehicleDetail.findByIdAndUpdate(id, req.body)
        if (!UpdateVehDetailById) {
            return res.status(404).json({ error: "User Not Found" });
        }
        // res.status(200).json({message : "User Data sucksexxfully Updated"});
        res.status(200).json({ message: "User Data Successfully Updated", UpdateVehDetailById });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}

// delete vehicle detail  by single id
const DeleteVehicleDetailById = async (req, res) => {
    try {
        const id = req.params.id;
        const DelVehicleDetailById = await VehicleDetail.findByIdAndDelete(id)
        if (!DelVehicleDetailById) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json({ message: "User Location Successfully Delete", DelVehicleDetailById });
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
module.exports = { AddVehicleDetail, getAllVehicleDetail, getVehicleDetailById, UpdateVehicleDetailById, DeleteVehicleDetailById }