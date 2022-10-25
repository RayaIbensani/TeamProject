import React from 'react'
import NavBar from '../Navbar/Navbar'
import './StyleAbout.css'
import Carousel from 'react-bootstrap/Carousel';
import Card from 'react-bootstrap/Card';
import { AppContext } from '../../context/AppContext'


// import gambar1 from '../../assets/background/bg1.jpg';
import gambar2 from '../../assets/background/bg2.jpg';
import gambar3 from '../../assets/background/bg4.jpg';
import AboutTeam from './AboutTeam';

function AboutUs() {

  const context = React.useContext(AppContext)
  return (
    <>
      <NavBar />
      <div className="container">
        <div className="row">
          <Carousel variant="dark">
            <Carousel.Item>
              <img
                className="d-block w-100"
                src={gambar3}
                alt="First slide"
              />
              <Carousel.Caption>
                <h1 className='title hover-underline-animation'>{context.lang === 'en' ? 'Welcome to' : 'Selamat Datang'} <span>{context.lang === 'en' ? 'NgiungTravel' : 'di NgiungTravel'}</span></h1>
                <h5 className="subtitle">{context.lang === 'en' ? 'Sumbawa Tourism Destinations West Nusa Tenggara' : 'Destinasi Wisata Sumbawa Nusa Tenggara Barat'}</h5>
              </Carousel.Caption>
            </Carousel.Item>
          </Carousel>
          <div className="logo col-lg-4 col-md-5 col-sm-1 py-2 mt-3">
            <Card style={{ width: '18rem' }}>
              <Card.Img variant="top" src={gambar2} />
            </Card>
          </div>
          <div className="col-lg-8 col-md-7 py-2">
            <h1>{context.lang === 'en' ? 'About Us' : 'Tentang Kami'}</h1>
            <p className='subAbout'> {context.lang === 'en' ?
              'Welcome to NgiungTravel, we are an organizer of travel activities by offering packages in several locations in Sumbawa and West Sumbawa which are very amazing and in demand by both domestic and foreign tourists and are one of the most trusted Web Travel in Sumbawa. We are here to help you with all your travel needs with the best quality. We have an experienced team so that customer satisfaction is always our priority. Our services start from tour packages for individuals, honeymoons, families and groups and others. Come on, prove it by being one of our customers.' :
              'Selamat datang di NgiungTravel, kami adalah penyelenggara kegiatan perjalanan wisata dengan menawarkan paket dibeberapa lokasi di Sumbawa dan Sumbawa Barat yang sangat menakjubkan dan diminati oleh wisatawan baik domestik ataupun mancanegara dan merupakan salah satu Web Travel terpercaya di Sumbawa. Kami hadir untuk membantu perjalanan wisata anda dengan segala kebutuhan perjalanan wisata dengan kualitas terbaik. Kami memiliki team yang perpengalaman sehingga kepuasan costumer selalu menjadi prioritas kami. Pelayanan kami mulai dari Paket wisata untuk perorangan, honeymoon, keluarga maupun rombongan dan lain-lain. Ayo buktikan dengan menjadi salah satu pelanggan kami.'}</p>
          </div>
        </div>
      </div>

      <AboutTeam />
    </>
  )
}

export default AboutUs