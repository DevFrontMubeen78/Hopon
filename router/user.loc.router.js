const express = require('express');
const router = express.Router();
const { AddUserLocation, getAllUserLocations, getUserLocationsById, UpdateUserLocationsById, DeleteUserLocationsById } = require('../controller/User.LocationC');


router.post('/user-add-location', AddUserLocation);
router.get('/get-user-locations', getAllUserLocations);
router.get('/get-user-locations-by-id/:id', getUserLocationsById);
router.patch('/update-user-locations/:id', UpdateUserLocationsById);
router.delete('/delete-user-locations/:id', DeleteUserLocationsById);


//export to index.js
module.exports = router;