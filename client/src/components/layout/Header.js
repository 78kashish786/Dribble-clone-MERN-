import React, { useState } from 'react'
import { useAuth } from '../../assets/context/Auth.js'
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast'
import profile from '../../assets/download.jpg'
import {BiMenu} from 'react-icons/bi'
import {GrClose} from 'react-icons/gr'

const Header = () => {

  const [openMenu, setOpenMenu] = useState(false);
  const[auth,setAuth]= useAuth();
  const Navigate = useNavigate();
  const handleLogout =()=>{
    setAuth({
      ...auth,
      user:null,
      token:""
    })
    localStorage.removeItem('auth');
    toast.success('Logout Successful')
    Navigate('/login')
  }

  return (
    <nav className='py-2 px-8 flex justify-between items-center bg-white border-b mb-5'>
        {/* <ul className='flex text-[12px] gap-3 font-[400] text-gray-500'>
            <li>About</li>
            <li>About</li>
            <li>About</li>
            <li>About</li>
            <li>About</li>
        </ul> */}
        <h1 className='text-3xl font-[600]'>Design Mojo</h1>
        <div className='flex gap-2'>
        {
          !auth.user ?( <>
          
          <button  onClick={()=>Navigate('/login')} className='px-4 py-2 rounded-full border border-gray-700  text-sm font-bold text-gray-800 '>Log In</button>
        <button  onClick={()=>Navigate('/register')} className='px-4 py-2 rounded-full border  text-sm font-bold  bg-gray-800 text-white'>Register</button>
          </>):(
            <>
            <div className='flex gap-1 items-center border px-2 py-1 rounded-full  '>
              <div className='h-[40px] w-[40px]'><img className='h-[40px] w-[40px] rounded-full'  src ={profile}alt="im"/></div>
              <h1 className='text-sm font-[600]'>{auth.user && auth.user.name}</h1>
             <div onClick={()=>setOpenMenu(!openMenu)} className='mx-3'>
             {
                openMenu ? (
                <GrClose size={30}/>
              ):(
                <BiMenu size={30}/>
              )
              }
             </div>
            </div>
            <div className={openMenu ? ' p-5 absolute right-5 rounded-2xl border border-gray-200 shadow-md  top-16 mx-3   h-[20vh] w-[20vw] bg-white':"hidden"}>
            <button onClick={handleLogout} className='px-4 py-2 rounded-full border  text-sm font-bold  bg-gray-800 text-white'>Log out</button>

            </div>
            
            </>
          )
        }
        </div>
    </nav>
  )
}

export default Header
