import React from 'react'
import NavBar from '../Navbar/Navbar';
import './HomeStyle.css'
import { AppContext } from '../../context/AppContext'


function Home() {

  const context = React.useContext(AppContext)
  return (
    <>
    <div className="background">
        <NavBar />
        <div className='container'>
            <div className="titleHead">
                <h1 className='title hover-underline-animation'>{context.lang==='en' ? 'Welcome to' : 'Selamat Datang'} <span>{context.lang==='en' ? 'NgiungTRVL' : 'di NgiungTRVL'}</span></h1>
            </div>
            <div className="subHead">
                <h5 className="subtitle">
                  {context.lang==='en' ? 'Sumbawa Tourism Destinations West Nusa Tenggara' : 'Destinasi Wisata Sumbawa Nusa Tenggara Barat'}
                </h5>
            </div>

        </div>
    </div>
    </>
  )
}

export default Home