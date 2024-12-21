import React, { useEffect, useState } from 'react'
import { useAuth } from '../assets/context/Auth';
import toast from 'react-hot-toast';
import axios from 'axios';
import {Select} from 'antd'
import TextArea from 'antd/es/input/TextArea';
import bgred from '../assets/uploadimage.png'
import {useNavigate} from 'react-router-dom'

const {Option} = Select
const NewPost = () => {

    const [categories,setCategories] = useState([]);
    const [auth,setAuth] = useAuth();
    const [photo,setPhoto] = useState("")
    const [title,setTitle] = useState("")
    const [desc,setDesc] = useState("")
    const [price,setPrice] = useState("")
    const [singleCategory,setSingleCategory] =  useState('');
    // const [postedBy,setPostedBy] = useState(auth?.user?.name);
    const navigate = useNavigate();

    //getAllCategories
    
    const getALLCategories = async()=>{
      try {
        
        const {data} = await axios.get('http://localhost:8080/api/v1/profile/category/categories');
        if(data?.success){
          toast.success('Getting')
          console.log(data)
          setCategories(data?.AllCategories);
        }
      } catch (error) {
        console.log(error);
        toast.error('Error in getting categories')
        
      }
    }

    
    const handleSubmit =async(e)=>{
      e.preventDefault();
      try {
        if(!title || !singleCategory ||!photo ||!desc){
          toast.error("Provide ALL Fields");
          return
          
        }
        const postData = new FormData();
        postData.append("title",title);
        postData.append("postedBy",auth?.user?._id);
        postData.append("category",singleCategory);
        // postData.append("price",price);
        postData.append("photo",photo);
        postData.append("description",desc);

        const {data} = axios.post('http://localhost:8080/api/v1/profile/post/create-post',postData);
          toast.success("Post Created Sucessfully");
          navigate('/profile');
      
      } catch (error) {
        console.log(error);
        toast.error('Unable to Create a Post')
      }
    }

    useEffect(()=>{
      getALLCategories();
    },[])

  return (
    <>
    <nav className='sticky bg-white z-10 top-0 py-3 flex justify-between items-center px-8 mb-10'>
    <button onClick={()=>navigate('/')} className='px-8 py-3 border border-gray-200 text-md font-800 bg-white hover:bg-pink-300 rounded-full hover:text-white'>Cancel</button> 
    <h1 className='font-bold text-3xl text-[#000300] my-4'>Share your New Post</h1> 
    <button onClick={handleSubmit} className='px-8 py-3 border font-600 text-white border-gray-200 text-md font-500 bg-black hover:bg-pink-300 rounded-full hover:text-black'>Post</button>  
    </nav>
      <div className='mx-auto flex justify-center flex-col w-[70vw]  gap-5  '>
        <div>
          <input placeholder='Type The Title ' type='text' value={title} onChange ={(e)=>setTitle(e.target.value) } className='p-2 outline-0 border-3 text-5xl font-bold opacity-50 decoration-none w-[60vw]' />
        </div>
        <div>
          <Select bordered={false} placeholder='Select or Search a Category' size='large' showSearch
          onChange={(value)=>{setSingleCategory(value)}}>
            {
              categories.map((x)=><Option key={x._id} value={x._id}>{x.name}</Option>)
            }
          </Select>
        </div>

          <div>
            <div className='flex flex-col relative outline-0 justify-center items-center rounded-md border border-2 border-dashed border-gray-300'>
             
              {photo ? (
<img  className='z-10 w-[40vw] h-[80vh]' src = {URL.createObjectURL(photo)} />
              ) :(<>
                <input type='file' accept='image/*'
                onChange={(e)=>setPhoto(e.target.files[0])}
                className='bg-red-200 opacity-0 z-30 w-[60vw] border h-[60vh]' placeholder='New Post Image'/>

                <div className=' absolute text-center flex flex-col justify-center items-center gap-5'>
               <img  className=' h-[100px] w-[100px] 'src ={bgred} alt ='image'/>
               <h1 className='text-sm font-[400] '>Browse any image from your computer </h1>
               <ul className='flex gap-10 text-[13px] text-gray-400'>
                <li>
                  <ul className='space-y-2 text-left'>
                    <li>hogh resolution images</li>
                    <li>animated Gif</li>
                  </ul>
                </li>
                <li>
                  <ul className='space-y-2 text-left'>
                    <li>Figma files</li>
                    <li>Only upload media own the right to</li>
  
                  </ul>
                </li>
               </ul>
               </div>
              </>)}
              {photo ? (  <button onClick={()=>setPhoto('')} className=' absolute left-3 bottom-3 bg-pink-700 px-8 py-2 rounded-xl  font-bold text-white '>Remove</button>) :""}
            </div>
            
          </div>

        <div>
          <div>
          <textarea name="textarea" value={desc} onChange={(e)=>setDesc(e.target.value)}  placeholder ='Write Anythig you Feel' className='p-2 outline-0 text-xl w-[100%]'rows={15}></textarea>
          </div>
        </div>
        
      </div>
    
    </>
    
  )
}

export default NewPost;
