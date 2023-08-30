import nodemailer from 'nodemailer';
import User from '@/models/userModel';
import bcryptjs from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
    try {
        /// created token hashed
        const hashToken = bcryptjs.hash(userId.toString(), 10)
    } catch (error: any) {
        throw new Error(error.message);
    }
}