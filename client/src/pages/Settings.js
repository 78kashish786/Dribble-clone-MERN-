import React from 'react'
import SettingHeader from '../components/layout/SettingHeader'
import SettingSidebar from '../components/layout/SettingSidebar.js'

const Settings = () => {
  return (
    <div className='w-[50vw] mx-auto  '>
      <SettingHeader/>
      <div className='grid grid-cols-4'>
        <div><SettingSidebar/></div>
        <div className='col-span-3 bg-green-200'>hhh</div>
      </div>
    </div>
  )
}

export default Settings
