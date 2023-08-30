import { connect } from "@/dbConfig/dbConfig";
import User from '@/models/userModel';
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from 'bcryptjs';
import jwt from "jsonwebtoken";

connect();


export async function POST(request: NextRequest, response: NextResponse) {
    try {

        const req = await request.json();

        const { email, password } = req;

        const user = await User.findOne({ email });
        if (!user) {
            return NextResponse.json({ error: "User does not exist" }, { status: 400 });
        }

        const validPassword = await bcryptjs.compare(password, user.password);
        if (!validPassword) {
            return NextResponse.json({ error: "Invaild password" }, { status: 400 });
        }
        const tokenData = {
            id: user._id,
            username: user.username,
            email: user.email
        }
        const token = await jwt.sign(tokenData, process.env.JWT_SECREY_KEY!, { expiresIn: "1d" })

        const response = NextResponse.json({
            message: "login Successfully",
            success: true,
        })
        response.cookies.set("token", token, { httpOnly: true });
        return response;
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 })
    }
}