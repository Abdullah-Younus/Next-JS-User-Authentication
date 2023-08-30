"use client"

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Link from 'next/link';
import { Toast, toast } from 'react-hot-toast';
import { useRouter } from 'next/navigation';

const Profilepage = () => {

  const router = useRouter();

  const onLogout = async () => {
    try {
      await axios.get("/api/users/logout");
      toast.success('logout successfully');
      router.push("/login");
    } catch (error: any) {
      toast.error(error.message);
    }
  }

  return (
    <div>
      Profile Page
      <hr />
      <button onClick={onLogout} className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4'>
        Logout
      </button>

    </div>
  )
}

export default Profilepage