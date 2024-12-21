import React, { useEffect, useState } from 'react'
import Header from '../components/layout/Header'
import { useAuth } from '../assets/context/Auth.js'
import LoginHeader from '../components/LoginHeader';
import toast from 'react-hot-toast';
import axios from 'axios';
import {FaComment} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import Footer from '../components/layout/Footer';
import { useNavigate } from 'react-router-dom';
const LandingPage = () => {

  const [auth,setAuth]= useAuth();
  const [posts,setPosts]= useState([]);
  // const[postedBy, setPostedBy]= useState([]);
  const navigate = useNavigate();

  const GetAllPosts = async()=>{

    try {
      const {data} = await axios.get('http://localhost:8080/api/v1/profile/post/all-posts');
      if(data?.success){
        setPosts(data?.allposts)
        // setPostedBy(data?.allposts?.postedBy)
        console.log(data)
      }
    } catch (error) {
      console.log(error);
      toast.error('Unable to get Posts')
    }

  }

//   const getALLPhotos =  async()=>{
//     try{
//       const {data} = await axios.get('/api/v1/profile/post/post-photo').select('photo');
//       if(data?.success){
//         console.log(data)
//       }
//     }catch(err){
//   console.log(err);
// }  }

  useEffect(()=>{ GetAllPosts()
  },[])
  

  return (
    <>
    {auth ?<LoginHeader/>:<Header/>}
    <section>
      <div className='flex flex-wrap mx-auto justify-center  mt-[100px] '>
        {
          posts.map((p)=>( 
         
            <>
            <div className='w-[450px] m-4   p-1 rounded-sm ' >
        <img onClick={()=>navigate(`/shots/${p._id}`)} className='h-[350px] w-[450px] object-cover mx-auto rounded-md mb-2' src={`http://localhost:8080/api/v1/profile/post/post-photo/${p._id}`} alt=""/>
        <div>
          <h1>{p?.title}</h1>
            <ul className='flex justify-end px-2 py-1 text-gray-400'>
                <li className='flex gap-1 items-center '>
                 
                    {/* <FaComment>
                    <p>11</p> */}
                </li>
                <li className='flex gap-1 items-center '>
                    {/* <AiFillHeart/> */}
                    {/* <p>11</p> */}
                </li>
            </ul>   
        </div>
    </div>
            
            </>
            
           
          ))
        }
      </div>
    </section>
    <Footer/>
    </>
  )
}

export default LandingPage
