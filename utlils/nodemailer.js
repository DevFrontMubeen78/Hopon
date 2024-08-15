// create nodemailer to send mail on gmail
const nodemailer = require("nodemailer");
const dotenv = require("dotenv");

dotenv.config();
const accountMail = (email, subject, otp, fullName, res) => {

    const transporter = nodemailer.createTransport({
        service: "gmail",
        host: process.env.HOST,
        port: process.env.MAIL_PORT,
        secure: false, // Use `true` for port 465, `false` for all other ports
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD
        },
    });

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject,
        html: `
        <div style="background-color: black; padding: 20px 50px; width: 500px; height: 350px; margin: 0 auto; color: #fff; border-radius: 5px;">
            <h1 style="background-color: #ff5421; padding: 10px; border-radius: 5px;">HoponCars</h1>
            <h3>Hi ${fullName}</h3>
            <p>Thank you for choosing HoponCars. Use the following OTP to verify:</p>
            <div style="background-color: #ff5421; display: inline-block; padding: 10px; font-size: 26px; margin-top: 15px; border-radius: 5px;">
                ${otp}
            </div>
            <div style="margin-top: 30px;">
                <h3>Regards,</h3>
                <p>HoponCars</p>
            </div>
        </div>
        `
    };


    transporter.sendMail(mailOptions, (err) => {
        if (err) {
            res.status(404).json({ error: "Mail Not send" });
        }
        res.status(200).json({ message: "Mail send" });
    });
}

// export to controller

module.exports = accountMail;