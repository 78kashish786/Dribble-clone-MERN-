import React from 'react'
import {AiFillInstagram, AiFillFacebook, AiFillLinkedin} from 'react-icons/ai'
function Footer() {
  return (
    <>
    <section>
    <div className='flex justify-between py-8 items-center w-[70vw] mx-auto'>
      <h1>DesignMojo</h1>
      <ul className='flex font-[600]  gap-10 justify-between items-center'>
        <li>For designers</li>
        <li>Hire talent</li>
        <li>Inspiration</li>
        <li>Advertising</li>
        <li>Blog</li>
        <li>Careers</li>
        <li>Support</li>

      </ul>
      <div className='flex text-3xl justify-between gap-1 items-center'>
        <AiFillFacebook/>
        <AiFillLinkedin/>
        <AiFillInstagram/>
      </div>
    </div>

    <div className='flex justify-between pb-4 items-baseline text-sm text-gray-400 font-[400] px-20 '>
      <ul className='flex gap-5 px-20'>
        <li>@2023 Dribble</li>
        <li>Terms</li>
        <li>Privacy</li>
        <li>Cookies</li>
      </ul>
     <ul className='flex gap-5 px-20'>
      <li>Jobs</li>
      <li>Designer</li>
      <li>Freelancer</li>
      <li>Tags</li>
      <li>Resources</li>
      </ul>
    </div>
    </section>
    </>
  )
}

export default Footer;
