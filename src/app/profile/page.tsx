"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Toast, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Profilepage = () => {

  const router = useRouter();
  const [data, setData] = useState<any>("nothing");
  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success('logout successfully');
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  }


  const getUserDataDecodedToken = async () => {
    try {
      const res = await axios.get("/api/users/me");
      console.log('res ===>',res.data.data);
      setData(res.data.data._id);
  
    } catch (error:any) {
        console.log(error.message);
    }
  }


  return (
    <div>
      Profile Page

      <hr />
      <h1 className="p-1 rounded ">{data === "nothing" ? "Nothing" : <Link href={`/profile/${data}`}>{data}</Link>}</h1>

      <hr />
      <button onClick={onLogout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
        Logout
      </button>

      <button onClick={getUserDataDecodedToken} className='bg-purple-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
        get User Details
      </button>

    </div>
  )
}

export default Profilepage