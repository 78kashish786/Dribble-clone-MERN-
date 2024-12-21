import React, { useEffect, useState } from 'react'
import { useAuth } from '../assets/context/Auth'
import LoginHeader from '../components/LoginHeader';
import profile from '../assets/download.jpg'
import EachCard from '../components/EachCard';
import Footer from "../components/layout/Footer.js"
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import axios from 'axios';
import {BsThreeDots} from 'react-icons/bs'
import {MdKeyboardArrowDown, MdDelete} from 'react-icons/md'
function Profile() {

const[auth,setAuth] = useAuth();

const [profiledata,setProfileData] = useState([]);
const navigate = useNavigate();

const getALLUserPersonelPost = async()=>{
  try{
    const id = auth?.user?._id;
    const {data} = await axios.get(`http://localhost:8080/api/v1/profile/post/your-post/${id}`);
    if(data?.success){
      setProfileData(data?.yourPost);
      toast.success("Data Extracted")
    }
  }catch(err){
    console.log(err);
    toast.error('Unable To Extract the Posts')
  }
}

const deleteItem = async(id)=>{
  try {
    const deletePost = await axios.delete(`http://localhost:8080/api/v1/profile/post/delete-post/${id}`);
    toast.success('deletee Successfully')
    getALLUserPersonelPost();
  } catch (error) {
    toast.error('Not able to delete post')
  }
}
useEffect(()=>{
  getALLUserPersonelPost();

},[])
  

  return (
    <>
    <section>
      <LoginHeader/>

      <div className='flex justify-center items-center  h-[50vh] '>
        
      <div className='flex gap-4 items-center'>
        <div>
          <img className='h-[170px] w-[170px] rounded-full' src ={profile} alt='/'/>
        </div>
        <div>
          <h1 className='text-2xl font-[500]'>{auth?.user?.name}</h1>
          <h1 className='text-sm font-[600] text-gray-400 my-3'>{auth?.user?.address}</h1>
          <div className='flex gap-8 mt-3  justify-center items-center'>
            <button className='bg-white text-[14px] font-[600] px-6 py-4 rounded-full border border-2 border-gray-100 '>Edit Profile</button>
            <BsThreeDots className='p-4 rounded-full border border-2 border-gray-100' size={60}/>
            <p className=' p-1 mt-3 rounded-full text-blue-700 font-bold text-sm bg-blue-100'>Limited Account</p>
          </div>
        </div>
      </div>
      </div>
      <div className='flex justify-between px-20 py-2 '>
        <ul className='flex gap-12 text-sm font-bold  text-gray-700 '>
          <li className='px-2 py-2 hover:bg-blue-100 rounded-full'>Work</li>
          <li className='px-2 py-2 hover:bg-blue-100 rounded-full'>Boosted Shots</li>
          <li className='px-2 py-2 hover:bg-blue-100 rounded-full'>Collection</li>
          <li className='px-2 py-2 hover:bg-blue-100 rounded-full'>Liked</li>
          <li className='px-2 py-2 hover:bg-blue-100 rounded-full'>About</li>
        </ul>
        <div className='flex gap-10'>
          <button className='px-3  rounded-md text-sm border border-gray-200 flex gap-3 items-center justify-center'>Recent Shots <MdKeyboardArrowDown size={20}/></button>
          <p className=' p-1 mt-3 rounded-full text-pink-700 font-bold text-sm bg-pink-100'>Customize Pro</p>
        </div>
      </div>

      <hr className='px-16 border-1 mx-auto w-[80vw] '/> 
      <div className='flex   flex-wrap mx-auto px-16  mt-10' >

      {
        profiledata.length > 0 ? (
          profiledata.map((p)=>( 
            <>
            <div className='w-[330px] m-4   p-1 rounded-sm '>
        <img onClick={()=>navigate(`/shots/${p._id}`)}  className='h-[250px] w-[330px] object-cover mx-auto rounded-md mb-2' src={`http://localhost:8080/api/v1/profile/post/post-photo/${p._id}`} alt=""/>
        <div className='flex  justify-between items-center'>
          <h1>{p.title}</h1>
          <ul className='flex gap-2 justify-center items-center'>
            <li><button onClick={()=>navigate(`/update-post/${p._id}`)}>Update</button></li>
            <li><button onClick={()=>deleteItem(p._id)}><MdDelete/></button></li>
            </ul>   
        </div>
    </div>
            
            </>
          ))
        ) : (
          <div className='h-[20vh] flex justify-center items-center'>
            <h1 className='text-2xl font-[400] py-5 text-pink-400'>Share your First Post <button
            onClick={()=>navigate('/new-post')}
            className='bg-white bg-pink-500 text-sm  rounded-full px-4 py-3 text-white font-[300] mx-10'>Share Now</button></h1>
          </div>
        )
        }

        </div>

    </section>
    <Footer/>
    </>
  )
}

export default Profile
