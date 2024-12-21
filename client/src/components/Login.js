import React ,{useState} from 'react'
import pxFull from '../assets/pxfuel.jpg'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import {useAuth} from '../assets/context/Auth.js'


const Login = () => {

  const [email,setEmail] = useState('');
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [auth,setAuth]= useAuth();

  const handleLoginSubmit = async(e)=>{
    e.preventDefault();
    try {
      const response  = await axios.post(`http://localhost:8080/api/v1/auth/login`,{email,password})

      if(response && response.data.success){
        toast.success(response.data && response.data.message);
        setAuth({
          ...auth,
          user:response.data.user,
          token:response.data.token
        })
        localStorage.setItem('auth', JSON.stringify(response.data));
        navigate('/');
      }else{
        toast.error(response.data.message)
      }
      
    } catch (error) {
      console.log(error);
      toast.error("Something Went Wrong");
    }
  }


  return (
    <section className=' '>
        <div className='grid grid-cols-4 h-[100vh]'>
            <div className='bg-red-100'>
              <img className='h-[100vh] object-cover' src ={pxFull} alt='/'/>
              <h1 className='absolute top-2 px-2 py-5 text-3xl font-[600] text-white '>Design Mojo</h1>
              <div>
                
              </div>
            </div>
            <div className='col-span-3 px-16 my-auto'>
              <div className='flex flex-col  gap-2'>
                <h1 className='text-4xl font-[600] mb-5 '>Login   </h1>
                <div className='px-7 w-[45%]'>
                  <div className='py-2 '>
                    <h1 className='text-sm font-bold '>Email Address</h1>
                    <input
                    value={email}
                    onChange={(e)=>setEmail(e.target.value)}
                    className='w-full  outline-none px-2 py-3 mt-1 border border border-gray-300 decoration-none rounded-md'/>
                 
                  </div>

                  <div className='py-2 '>
                    <div className='flex justify-between items-center'>
                    <h1 className='text-sm font-bold '>Password</h1>
                    <p className='text-[10px] font-[400] cursor-pointer hover:font-[500]'>Forget Passwod ?</p>
                    </div>
                    <input
                    value={password}
                    onChange={(e)=>setPassword(e.target.value)}
                    className=' w-full outline-none  px-2 py-3 mt-1 border border border-gray-300 decoration-none rounded-md'/>
                  
                  </div>

                </div>
                <div className='my-3 px-4 w-[45%] text-center '>
                  <button 
                  type="submit"
                  onClick={(e)=>handleLoginSubmit(e)}
                  className='px-10 py-4 bg-gray-900  text-white  rounded-full w-full hover:shadow-md'>Log in</button>
                  <h1 className='text-[12px] my-2'>Don't havea an account ? <span onClick={()=>navigate('/register')} className='font-bold underline cursor-pointer mx-1 '>Register</span></h1>
                  </div>

              </div>
            </div>
        </div>
    </section>
  )
}

export default Login
