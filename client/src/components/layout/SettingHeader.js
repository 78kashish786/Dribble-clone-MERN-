import React from 'react'
import profile from '../../assets/download.jpg'
const SettingHeader = () => {
  return (
    <nav className='flex justify-between items-center py-2'>
        <div className='flex justify-between items-center '>
            <div className='flex gap-2'>
            <img  className=' items-center h-[70px] w-[70px] rounded-full' src={profile} alt='Imagesof ?Id' />
                <div>
                    <h1>Kashish Kataria</h1>
                    <h1>Update</h1>
                </div>
            </div>
        </div>
        <div >
            <button className='px-8 text-sm border border-gray-300 flex flex-col -gap-1 justify-between items-center px-8 py-2 '>
                <h1 className='-mb-1 text-pink-600 font-[600] text-md '>Go Pro</h1>
                <h1 className='text-[11px]'>Get 3x more portfolio Views</h1>
            </button>
        </div>

    </nav>
  )
}

export default SettingHeader