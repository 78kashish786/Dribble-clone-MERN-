import React from 'react'
import {FaComment} from 'react-icons/fa'
import {AiFillHeart} from 'react-icons/ai'
import anime from '../assets/anime.jpg'
const EachCard = () => {
  return (
    <div className='w-[280px] m-4 '>
        <img className='h-[200px] w-[280px] rounded-md' src={anime} alt=""/>
        <div>
            <ul className='flex justify-end px-2 py-1 text-gray-400'>
                <li className='flex gap-1 items-center '>
                    <FaComment/>
                    <p>11</p>
                </li>
                <li className='flex gap-1 items-center '>
                    <AiFillHeart/>
                    <p>11</p>
                </li>
            </ul>   
        </div>
    </div>
  )
}

export default EachCard
