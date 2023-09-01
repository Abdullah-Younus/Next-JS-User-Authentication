import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        /// created token hashed
        const hashToken = await bcryptjs.hash(userId.toString(), 10);

        if (emailType === "VERIFY") {
            await User.findByIdAndUpdate(userId,
                { verifyToken: hashToken, verifyTokenExpiry: Date.now() + 3600000 })

        } else if (emailType === "RESET") {
            await User.findByIdAndUpdate(userId, { forgotPasswordToken: hashToken, forgotPasswordTokenExpiry: Date.now() + 3600000 })
        }
        var transport = nodemailer.createTransport({
            host: "sandbox.smtp.mailtrap.io",
            port: 2525,
            auth: {
                user: "c44e284d52b420",
                pass: "a8e1edbfe9e76a"
            }
        });
        const mailOptions = {
            from: 'for@mailinator.com',
            to: email,
            subject: emailType === "VERIFY" ? "Verify Your email" : "Reset Your Password",
            html: `<p>Click <a href="${process.env.domain}/verifyemail?token=${hashToken}">here</a> to ${emailType === "VERIFY" ? "verify your email" : "reset your password"} or copy and paste the link below in your browser <br> ${process.env.domain}/verifyemail?token=${hashToken} </p>`
        }

        const mailresponse = await transport.sendMail(mailOptions);

        return mailresponse;

    } catch (error: any) {
        throw new Error(error.message);
    }
}