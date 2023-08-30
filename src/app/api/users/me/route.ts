import { getDataFromToken } from "@/helpers/getDataFromToken";
import { NextRequest, NextResponse } from "next/server";
import User from '@/models/userModel';
import { connect } from "@/dbConfig/dbConfig";


connect();

export async function GET(request: NextRequest, response: NextResponse) {
    try {
        const userId = await getDataFromToken(request);
        console.log('userID ===>',userId);
        const user = await User.findOne({ _id:userId }).select("-password");
        console.log(user);
        return NextResponse.json({
            message: "User Found",
            data: user
        });
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 400 })
    }
}
