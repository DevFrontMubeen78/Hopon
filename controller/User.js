const User = require('../model/User');
const ResetOtp = require('../model/ResetOtp');
const accountMail = require('../utlils/nodemailer');
const generateOtp = require('../utlils/otp');
const validator = require('validator');
const bcrypt = require('bcrypt');
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


dotenv.config();
// User Register Api
const UserRegd = async (req, res) => {
    const { fullName, phone, email, password } = req.body;
    try {
        if (validator.isEmpty(fullName)) {
            res.status(400).json({ error: "FullName is Empty" });
        } else if (validator.isEmpty(phone)) {
            res.status(400).json({ error: "Phone is Empty" });
        } else if (!validator.isNumeric(phone)) {
            res.status(400).json({ error: "Phone Number Should be Numeric 123.." });
        } else if (validator.isEmpty(email)) {
            res.status(400).json({ error: "email is is Empty" });
        } else if (!validator.isEmail(email)) {
            res.status(400).json({ error: "email is incorrect (@gmail.com)" });
        } else if (validator.isEmpty(password)) {
            res.status(400).json({ error: "Password is Empty" });
        } else if (validator.isAlphanumeric(password)) {
            res.status(400).json({ error: "Password Should be Alpha Numeric ex. ABC 123" });
        }

        //exist email 
        const existEmail = await User.findOne({ email: email });
        if (existEmail) {
            res.status(500).json({ error: "Email Already Exist" });
        }

        //hast password
        const salt = await bcrypt.genSalt(12);
        const hashPass = await bcrypt.hash(password, salt);
        console.log(hashPass);
        // save data to database
        let UserDataSave = new User({
            fullName,
            phone,
            email: email.toLowerCase(),
            password: hashPass
        });

        // console.log(UserDataSave);
        await UserDataSave.save();
        res.status(200).json({ message: "Your Are Register Successfully", UserDataSave });

    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Intervel Server Error" });
    }
}

// login user api
const UserLogin = async (req, res) => {
    try {
        const { email } = req.body;
        const exEmail = await User.findOne({ email: email });
        if (!exEmail) {
            res.status(404).json({ error: "Invaild email" });
        }

        // compare password
        const comPass = await bcrypt.compare(req.body.password, exEmail.password);
        if (!comPass) {
            res.status(400).json({ error: "Password Do Not Match" });
        }

        //jwt token
        const token = jwt.sign({ user: "Passanger", id: exEmail._id }, process.env.JWT, { expiresIn: "30d" });
        const { password, ...other } = exEmail._doc;
        res.status(200).json({ message: "Successfully Login", ...other, token });

    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Intervel Server Error" });
    }
}

// forgott password
const forgottPassword = async (req, res) => {
    // console.log(req.body);
    try {
        const { email } = req.body;
        const emailEx = await User.findOne({ email: email });
        if (!emailEx) {
            res.status(404).json({ error: "Invaild email" });
        }
        await ResetOtp.deleteMany({ userId: emailEx._id });
        const otp = generateOtp();
        const saveData = new ResetOtp({
            userId: emailEx._id,
            otp
        });
        await saveData.save();
        accountMail(emailEx.email, "Varify Your OTP", otp, emailEx.fullName)
        res.status(200).json({ message: "Varify Your OTP", saveData });
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Intervel Server Error" });
    }
}

// varify otp
const varify = async (req, res) => {
    try {
        const { otp } = req.body;
        const exOtp = await ResetOtp.findOne({ otp: otp })
        if (!exOtp) {
            res.status(404).json({ error: "invaild OTP" });
        }
        res.status(200).json({ message: "Varify Your OTP" });
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Intervel Server Error" });
    }
}

// resetPassword
const resetPassword = async (req, res) => {
    // console.log(req.body);
    try {
        const { otp, password, confirmPassword } = req.body;
        const ExRestOtp = await ResetOtp.findOne({ otp: otp });
        if (!ExRestOtp) {
            res.status(404).json({ error: "Invaild OTP" });
        }
        if (password !== confirmPassword) {
            res.status(400).json({ error: "Password Do Not Match" });
        }

        const salt = await bcrypt.genSalt(12);
        const hash = await bcrypt.hash(password, salt);

        await User.findByIdAndUpdate(ExRestOtp.id, { $set: { password: hash } });
        await ResetOtp.deleteMany({ userId: ExRestOtp.userId });
        res.status(200).json({ message: "Your Password Successfully Update" });
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Intervel Server Error" });
    }
}

// get user data

const getUserData = async (req, res) => {
    // console.log(req.body);
    try {
        const findUser = await User.find();
        if (findUser.length === 0) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json(findUser);
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Intervel Server Error" });
    }
}

// get user Data by Id
const getUserDataById = async (req, res) => {
    try {
        const id = req.params.id;
        const getUserById = await User.findById(id);
        if (!getUserById) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json(getUserById);
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Intervel Server Error" });
    }
}

// update user data
const getUserDataByIdAndUpdate = async (req, res) => {
    try {
        const id = req.params.id;
        const getUserDataByIdAndUpdatee = await User.findByIdAndUpdate(id, req.body);
        if (!getUserDataByIdAndUpdatee) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json(getUserDataByIdAndUpdatee);
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Intervel Server Error" });
    }
}

// delete user data
const getUserDataByIdAndDel = async (req, res) => {
    try {
        const id = req.params.id;
        const getUserDataByIdAndDelete = await User.findByIdAndDelete(id);
        if (!getUserDataByIdAndDelete) {
            res.status(404).json({ error: "User Not Found" });
        }
        res.status(200).json({ message: "User Successfully Delete", getUserDataByIdAndDelete });
    } catch (error) {
        console.log(error);
        res.status(501).json({ error: "Intervel Server Error" });
    }
}
//export to router
module.exports = { UserRegd, UserLogin, forgottPassword, varify, resetPassword, getUserData, getUserDataById, getUserDataByIdAndUpdate, getUserDataByIdAndDel }