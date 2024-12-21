import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import toast from 'react-hot-toast';
import profile from '../assets/download.jpg'
import { AiOutlineHeart } from 'react-icons/ai'
import { BsBookmark } from 'react-icons/bs'
import { FaRegComment } from 'react-icons/fa'
import { CiExport } from 'react-icons/ci'
import { BiSolidUserDetail } from 'react-icons/bi'
import Footer from '../components/layout/Footer.js'


const Shots = () => {

    const [shotTitle, setshotTitle] = useState('');
    const [shotDesc, setshotDesc] = useState('');
    const [shotPhoto, setshotPhoto] = useState({});
    const [shotPosted, setshotPosted] = useState('');
    const [shotCategory, setshotCategory] = useState('');

    const [ids,setId] = useState("");
    const navigate = useNavigate();


    const params = useParams();
    const getSinglePost = async () => {
        try {
            const { data } = await axios.get(`http://localhost:8080/api/v1/profile/post/posts/${params.id}`)
            const { photoData } = await axios.get(`http://localhost:8080/api/v1/profile/post//singlePost-photo/${params.id}`)
            console.log(data);
            setshotTitle(data?.singlePost?.title)
            setshotDesc(data?.singlePost?.description)
            setshotCategory(data?.singlePost?.category?.name)
            setshotPosted(data?.singlePost?.postedBy.name);
            setshotPhoto(photoData.yourPostPhoto.photo);
            setId(photoData?.postedBy?._id);

            console.log(data)
        } catch (err) {
            console.log(err);
        }
    }
    useEffect(() => {
        getSinglePost();
    }, [])

    return (
        <>

            <div className='fixed top-20 right-12  flex flex-col gap-5  '>
                
                <img onClick={()=>navigate(`/watch-profile/${ids}`)} className=' items-center h-[50px] w-[50px] rounded-full' src={profile} alt='Imagesof ?Id' />
                <ul className='flex flex-col gap-10 items-center'>
                    <li className='p-3 border border-gray-200 rounded-full hover:shadow-md'><AiOutlineHeart /></li>
                    <li className='p-3 border border-gray-200 rounded-full hover:shadow-md'><BsBookmark /></li>
                    <li className='p-3 border border-gray-200 rounded-full hover:shadow-md'><FaRegComment /></li>
                    <li className='p-3 border border-gray-200 rounded-full hover:shadow-md'><CiExport /></li>
                    <li className='p-3 border border-gray-200 rounded-full hover:shadow-md'><BiSolidUserDetail /></li>
                </ul>

            </div>

            <section className=' w-[57vw] mx-auto'>
                
                {/* Profue id  */}
                <div className='flex justify-between items-center mt-10 px-20 '>
                    <div className='flex items-center gap-2  '>
                        <img onClick={()=>navigate(`/watch-profile/${ids}`)}  className='h-[70px] w-[70px] rounded-full' src={profile} alt='Imagesof ?Id' />
                        <div>
                            <h1 className='font-[500] text-xl '>{shotTitle}</h1>
                            <h1 className='text-gray-600 font-[300] '>{shotPosted}</h1>
                        </div>
                    </div>
                    <button className='bg-gray-800 text-white px-4 py-3 rounded-full text-sm '>Work with me</button>
                </div>
                <div>
                    <img className='w-[65vw] h-[auto] rounded-xl  mt-10  flex justify-center' src={`http://localhost:8080/api/v1/profile/post/post-photo/${params.id}`} alt="Puc/" />
                    <div className='py-5 text-2xl px-2 leading-loose '>
                        <button className='text-[12px] font-[400] text-gray-400 text-left '>Category<br/><p className='text-xl font-[500] text-gray-700'>{shotCategory}</p></button>
                        <hr className='mb-5'/>
                        <p>{shotDesc}</p>
                    </div>
                </div>
                <div className='flex justify-between items-center py-10'>
                    <hr className='border border-2'/>
                    <div className='text-center'>
                        <img className='h-[80px] w-[80px] rounded-full ' src ={profile}/>
                        <h1>{shotPosted}</h1>
                        <button className='bg-white rounded-full border px-2 py-1 text-sm '>Follow</button>
                    </div>
                    <hr className='border-border-2'/>
                </div>

                {/* Shots Details */}
            </section>
            <Footer/>
        </>
    )
}

export default Shots
