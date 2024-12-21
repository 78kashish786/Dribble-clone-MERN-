import React, { useState } from 'react'
import pxFull from '../assets/pxfuel.jpg'
import anime from '../assets/anime.jpg'
import { useAuth } from '../assets/context/Auth.js'
import {  useNavigate } from 'react-router-dom'
const PageNotFound = () => {

const Navigate = useNavigate();
  return (
    <div className='grid grid-cols-3'>
         
      <div className='col-span-2 flex flex-col  text-4xl p-16 text-center justify-center '> 
      <h1>404</h1>
      <p>Page not Found</p>
      <button onClick={()=>Navigate('/')}>Back</button>
      </div>
      <img className='h-[100vh] object-cover w-full opacity-90' src ={pxFull} alt='/'/>
    </div>
 
  )
}

export default PageNotFound
