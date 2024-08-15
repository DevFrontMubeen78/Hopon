const express = require('express');
const router = express.Router();
const { AddVehicleDetail, getAllVehicleDetail, getVehicleDetailById, UpdateVehicleDetailById, DeleteVehicleDetailById } = require('../controller/Vehicle.detailC');


router.post('/add-vehicle-detail', AddVehicleDetail);
router.get('/get-vehicle-detail', getAllVehicleDetail);
router.get('/get-vehicle-detail-by-id/:id', getVehicleDetailById);
router.patch('/update-vehicle-detail/:id', UpdateVehicleDetailById);
router.delete('/delete-vehicle-detail/:id', DeleteVehicleDetailById);


//export to index.js
module.exports = router;