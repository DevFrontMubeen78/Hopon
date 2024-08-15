// generate otp
const generateOtp = () => {
    const otp = Math.floor(100000 + Math.random() * 900000);
    return otp;
}

// expor to controller
module.exports = generateOtp;