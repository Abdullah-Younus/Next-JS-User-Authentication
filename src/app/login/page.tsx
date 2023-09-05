"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Loginpage = () => {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const [buttonDistabled, setButtonDisabled] = useState(false);
    const [loading, setLoading] = useState(false);


    const onlogin = async () => {

        try {
            setLoading(true);
            const res = await axios.post("/api/users/login", user);
            console.log("Login successfully", res.data);
            toast.success("login Success");
            router.push("/profile");
        } catch (error: any) {
            console.log("login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }

    }, [user])

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1>{loading ? "Processing" : "Login"}</h1>
            <hr />
            <label htmlFor="email">email</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="text" id='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

            <label htmlFor="password">password</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="password" id='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <button onClick={onlogin} className='border border-slate-800 p-5 px-10'>Login</button>
            <Link href={"/signup"} className='border border-slate-800 p-5 m-5 '>Sigup page</Link>
        </div>
    )
}

export default Loginpage;