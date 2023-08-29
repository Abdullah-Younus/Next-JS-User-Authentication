"use client";
import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import axios from 'axios';

const Loginpage = () => {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    });

    const onlogin = () => {

    }

    return (
        <div className='flex flex-col items-center justify-center min-h-screen py-2'>

            <label htmlFor="email">email</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="text" id='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />

            <label htmlFor="password">password</label>
            <input className='p-2 border border-gray-300 rounded-lg mb-2 focus:outline-none' type="password" id='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />

            <button onClick={onlogin}>Login</button>
            <Link href={"/signup"}>Sigup page</Link>
        </div>
    )
}

export default Loginpage;