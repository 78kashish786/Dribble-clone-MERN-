import React from 'react'

const SettingSidebar = () => {
  return (
    <div className='p-4'>
        <h1>General</h1>
        <ul className='flex flex-col gap-2'>
            <li>Edit Profile</li>
            <li>Password</li>
            <li>Edit Posts</li>
            <li>Social Profiles</li>
            <li>Delete Account</li>
        </ul>
    </div>
  )
}

export default SettingSidebar
