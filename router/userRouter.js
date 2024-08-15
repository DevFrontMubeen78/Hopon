const express = require('express');
const router = express.Router();
const { UserRegd, UserLogin, forgottPassword, varify, resetPassword, getUserData, getUserDataById, getUserDataByIdAndUpdate, getUserDataByIdAndDel } = require('../controller/User');


router.post('/user-register', UserRegd);
router.post('/user-login', UserLogin);
router.post('/user-forgottPassword', forgottPassword);
router.post('/user-varify', varify);
router.post('/user-resetPassword', resetPassword);
router.get('/user-getUserData', getUserData);
router.get('/user-getUserDataById/:id', getUserDataById);
router.patch('/user-getUserDataByIdAndUpdate/:id', getUserDataByIdAndUpdate);
router.delete('/user-getUserDataByIdAndDel/:id', getUserDataByIdAndDel);


// export to index.js 
module.exports = router;