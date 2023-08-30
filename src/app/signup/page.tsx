"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { toast } from 'react-hot-toast';

const Signup = () => {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDistabled, setButtonDisabled] = React.useState(false);
    const [loading, setLoading] = useState(false);


    const onSignUp = async () => {
        try {
            setLoading(true);
            const response = await axios.post('/api/users/signup', user)
            console.log("Signup Success", response.data);
            router.push("/login");
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user])


    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-center text-black text-2xl'>{loading ? "Processing" : "Signup"}</h1>
            <label htmlFor="username">username</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="text" id='username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <label htmlFor="email">email</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="text" id='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

            <label htmlFor="password">password</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="password" id='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <button className='p-2 border border-gray-300 rounded-lg mb-4 focus:outline-none focus:border-gray-600' onClick={onSignUp}>{buttonDistabled ? "No Signup" : "Signup"}</button>
            <Link href={"/"}>Visit to login page</Link>
        </div>
    )
}

export default Signup;