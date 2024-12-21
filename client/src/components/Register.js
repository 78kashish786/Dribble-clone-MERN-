import React, { useState } from 'react'
import anime from '../assets/anime.jpg'
import axios from 'axios'
import toast from 'react-hot-toast'
import {useNavigate} from 'react-router-dom'


const Register = () => {


  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');

  const navigate = useNavigate();


  const handleSubmit = async(e)=>{
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8080/api/v1/auth/register',{name,email,password,phone,address});
      if(response.data.success){  
        toast.success(response.data.message);
        navigate('/login')
      }else{
        toast.error(response.data.message)
      }
    } catch (err) {
      console.log(err)
      alert('Something went wrong');
    }

  }


  return (
    <section className=' '>
      <div className='grid grid-cols-4 h-[100vh]'>
        <div className='bg-red-100 '>
          <img className='h-[100vh] object-cover' src={anime} alt='/' />
          <h1 className='absolute top-2 px-2 py-5 text-3xl font-[600] text-white '>Design Mojo</h1>
          <div>

          </div>
        </div>
        <div className='col-span-3 px-16 my-auto'>
          <div className='flex flex-col  gap-2'>
            <h1 className='text-4xl font-[600] mb-5 '>Register  </h1>
            <div className='px-7 w-[45%]'>

              <div className=' pt-1'>
                <h1 className='text-sm font-bold  '>Name</h1>
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className='w-full outline-none px-2 py-3 mt-1 border border border-gray-300 decoration-none rounded-md' />

              </div>

              <div className='pt-1 '>
                <h1 className='text-sm font-bold '>Email Address</h1>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  
                  className='w-full  outline-none px-2 py-3 mt-1 border border border-gray-300 decoration-none rounded-md' />
              </div>

              <div className='pt-1 '>

                <h1 className='text-sm font-bold '>Password</h1>

                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className=' w-full outline-none  px-2 py-3 mt-1 border border border-gray-300 decoration-none rounded-md' />
              </div>
              <div className=' pt-1'>
                <h1 className='text-sm font-bold '>Address</h1>

                <input
                  onChange={(e) => setAddress(e.target.value)} value={address} className='w-full outline-none  px-2 py-3 mt-1 border border border-gray-300 decoration-none rounded-md' />
              </div>

              <div className='pt-1'>
                <h1 className='text-sm font-bold '>Phone Number</h1>
                <input value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  className='w-full outline-none  px-2 py-3 mt-1 border border border-gray-300 decoration-none rounded-md' />
              </div>

            </div>
            <div className='my-3 px-4 w-[45%] text-center '>
              <button type='submit' onClick={handleSubmit} className='px-10 py-4 bg-gray-900  text-white  rounded-full w-full hover:shadow-md'>Register</button>
              <h1 className='text-[12px] my-2'> Have an account ? <span onClick={()=>navigate('/login')} className='font-bold underline cursor-pointer mx-1 '>Login</span></h1>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}

export default Register
