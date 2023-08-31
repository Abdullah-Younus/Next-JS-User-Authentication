import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';
import { sendEmail } from "@/helpers/mailer";

connect();


export async function POST(request: NextRequest, response: NextResponse) {
    try {
        const req = await request.json();

        const { username, email, password } = req;

        const user = await User.findOne({ email });

        if (user) {
            return NextResponse.json({ error: "user already exists" }, { status: 400 })
        }

        const salt = await bcryptjs.genSalt(10);
        const hashPassword = await bcryptjs.hash(password, salt)

        const newUser = new User({
            username,
            email,
            password: hashPassword
        });

        const saveUser = await newUser.save();
        console.log('saveUser ===>',saveUser);
        await sendEmail({ email, emailType: "VERIFY", userId: saveUser._id });

        return NextResponse.json({
            message: "user created",
            success: true,
            saveUser
        })


    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}