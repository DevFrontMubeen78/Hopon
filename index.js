const express = require('express');
const app = express();
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const UserRegd = require('./router/userRouter');
const UserLogin = require('./router/userRouter');
const forgottPassword = require('./router/userRouter');
const varify = require('./router/userRouter');
const resetPassword = require('./router/userRouter');
const getUserData = require('./router/userRouter');
const getUserDataById = require('./router/userRouter');
const getUserDataByIdAndUpdate = require('./router/userRouter');
const getUserDataByIdAndDel = require('./router/userRouter');

// user location
const AddUserLocation = require('./router/user.loc.router');
const getAllUserLocations = require('./router/user.loc.router');
const getUserLocationsById = require('./router/user.loc.router');
const UpdateUserLocationsById = require('./router/user.loc.router');
const DeleteUserLocationsById = require('./router/user.loc.router');

// vehicle detail
const AddVehicleDetail = require('./router/vehicle.det');
const getAllVehicleDetail = require('./router/vehicle.det');
const getVehicleDetailById = require('./router/vehicle.det');
const UpdateVehicleDetailById = require('./router/vehicle.det');
const DeleteVehicleDetailById = require('./router/vehicle.det');


// middleware
app.use(express.json());


//create database and serve
dotenv.config();
const PORT = process.env.PORT;
const MONGO_URL = process.env.MONGO_URL;
mongoose.connect(MONGO_URL).then(() => {
    console.log('Database Successfully connected');
    // create server
    app.listen(PORT, () => {
        console.log(`Now we are working on port ${PORT}`);

    })
});

app.use('/api', UserRegd);
app.use('/api', UserLogin);
app.use('/api', forgottPassword);
app.use('/api', varify);
app.use('/api', resetPassword);
app.use('/api', getUserData);
app.use('/api', getUserDataById);
app.use('/api', getUserDataByIdAndUpdate);
app.use('/api', getUserDataByIdAndDel);

// user location
app.use('/api', AddUserLocation);
app.use('/api', getAllUserLocations);
app.use('/api', getUserLocationsById);
app.use('/api', UpdateUserLocationsById);
app.use('/api', DeleteUserLocationsById);

// vehicle detail
app.use('/api', AddVehicleDetail);
app.use('/api', getAllVehicleDetail);
app.use('/api', getVehicleDetailById);
app.use('/api', UpdateVehicleDetailById);
app.use('/api', DeleteVehicleDetailById);
