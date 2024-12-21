import React, { useState } from 'react'
import profile from '../assets/download.jpg'
import { Link, useNavigate } from 'react-router-dom';
import {useAuth} from '../assets/context/Auth.js'
import toast from 'react-hot-toast';

const LoginHeader = () => {

  const [hovering,setHovering] =  useState(false);
  const [auth,setAuth]  = useAuth();
  const navigate = useNavigate();


  const handleMouseOver = ()=>{
    setHovering(!hovering);
  }
  // const handleMouseOut = ()=>{
  //   setHovering(false);
  // }

  const handleLogout = ()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth')
    toast.success('Logout Successfully')
    navigate('/login'); 
  }

  return (
    <nav className='flex bg-white justify-between items-center px-16 py-3  top-0 fixed w-full'>
        <ul className='flex gap-7 text-[14px] font-[500] tracking-wider '>
            <li className='hover:text-gray-300'>Find Talent</li>
            <li className='hover:text-gray-300'>Inspiration</li>
            <li className='hover:text-gray-300'>Learn Design</li>
            <li className='hover:text-gray-300'>Jobs</li>
            <li className='hover:text-gray-300'>Go Pro</li>
        </ul>
        
        <div className='flex gap-5 items-center'>
            <input className='bg-gray-100 border  border-gray-200 px-8 py-4  rounded-full ' placeholder='Search'/>
            <button
            onClick={()=>navigate('/new-post')}
            className='bg-gray-800 rounded-full px-4 py-3 text-white font-[600]'>Share Work</button>
       
            <img onClick={handleMouseOver}    className='  hover:border border-black h-[50px] w-[50px] rounded-full ' src ={profile} alt= "/profile image"/>
       
        </div>
        { 
          hovering?(
            <>
            <div className='absolute top-20 right-20 bg-red-100 px-16 py-12 bg-white shadow-sm rounded-xl border border-gray-100'   >
              {
                auth?.user ?(
                  <ul  className='text-md  '>
                <li className='mb-4'>
                  <div className='text-center -gap-1'>
                    <img className='h-[90px]'  src ={profile} alt ='heel'/>
                    <h1 >{auth?.user?.name}</h1>
                  </div>
                </li>
                <li>
                  <h1 onClick={()=>navigate('/profile')}>Profile</h1>
                </li>
                <li> 
                  <button onClick={handleLogout}>Sign out</button>
                </li>
              </ul>
                ):
                (
                  <div className='text-center font-[600]'>
                <h1 className='font-[500'>Login to watch Profile </h1>
                <button onClick={()=>navigate('/login')} className='bg-pink-600 px-4 py-2 text-white rounded-md'>Log in</button>
              </div>
          
                )
              }
              
              

              
        </div>
            </>
          ):('')
        }

    </nav>
  )
}

export default LoginHeader
