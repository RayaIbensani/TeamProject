import React from 'react'
import './Footer.css'
import { FaFacebook, FaInstagram, FaTwitter } from 'react-icons/fa'


function Footer() {
  return (
    <div className='footer'>
      <div className="container">
        <div className="top">
          <h3>NgiungTravel</h3>
          <div className="social">
            <FaFacebook className='icon' />
            <FaInstagram className='icon' />
            <FaTwitter className='icon' />
          </div>
          <div className="right">
        <h6><small>Copyright &copy; 2022 - NgiungTRVL.</small></h6> 
        </div>
        </div>
          </div>
        </div>
  )
}

export default Footer
