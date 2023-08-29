"use client";
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Signup = () => {

    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    });
    const [buttonDistabled, setButtonDisabled] = React.useState(false);

    const onSignUp = async () => {

    }

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0 && user.username.length > 0) {
            setButtonDisabled(false);
        }else  {
            setButtonDisabled(true);
        }
    }, [user])


    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>
            <h1 className='text-center text-black text-2xl'>Signup</h1>
            <label htmlFor="username">username</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="text" id='username' value={user.username} onChange={(e) => setUser({ ...user, username: e.target.value })} />
            <label htmlFor="email">email</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="text" id='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

            <label htmlFor="password">password</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="password" id='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <button onClick={onSignUp}>SignUp Here</button>
            <Link href={"/"}>Visit to login page</Link>
        </div>
    )
}

export default Signup;