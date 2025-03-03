import React from 'react'
import { Link } from 'react-router-dom'
import Logo from '../Logo'
import Container from '../container/Container'

function Footer() {
  
  return (
    <footer className='bg-[#222831] text-[#EEEEEE] py-6' style={{ fontFamily: "'Open Sans', serif" }}>
      <Container>
        <div className='flex flex-col md:flex-row justify-between'>

          {/* Logo Section */}
          <Link to='/'>
            <Logo />
            <div className='ml-2 text-left text-sm font-bold text-gray-300'>
              <p>--Your Photo--</p>
              <p>--Your Passion--</p>
            </div>
          </Link>

          {/* About Section */}
          <div className='mb-6 md:mb-0'>
            <h2 className='text-lg font-semibold my-3'>About LensCraft 📸</h2>
            <p className="text-sm leading-relaxed max-w-4xl">
              LensCraft is more than just a platform—it's a creative space where passionate photographers from all backgrounds can connect, learn, and showcase their work. 🌍✨ Whether you’re an amateur capturing your first sunset 🌅 or a professional sharing your latest project 🖼️, LensCraft provides the tools you need to upload, categorize, and describe your images in a personalized gallery. 🖌️💾 Join a community that celebrates creativity, growth, and the art of photography. 📷💡
            </p>
          </div>

          {/* Navigation Links */}
          <div className='mb-6 md:mb-0'>
            <ul className='space-y-2'>
              <li><Link to="/" className='hover:text-gray-400'>Home</Link></li>
              <li><Link to="/all-posts" className='hover:text-gray-400'>All Images</Link></li>
              <li><Link to="/add-post" className='hover:text-gray-400'>Add Image</Link></li>
              <li><Link to="/login" className='hover:text-gray-400'>Login</Link></li>
              <li><Link to="/signup" className='hover:text-gray-400'>Signup</Link></li>
            </ul>
          </div>
        </div>
        <div className='text-center mt-6'>
          <p className='text-xs'>
            &copy; {new Date().getFullYear()} LensCraft. Crafted with passion and creativity..
          </p>
        </div>
      </Container>
    </footer>
  )
}

export default Footer
