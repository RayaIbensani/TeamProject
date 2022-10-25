import React from 'react'
import { Link, NavLink } from 'react-router-dom'
import './NavStyle.css'
// import Form from 'react-bootstrap/Form';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import { CheckLogin } from "../../helpers/checkLogin"
import { useNavigate } from "react-router-dom"
import Swal from "sweetalert2";
import { AppContext } from '../../context/AppContext'

function NavBar() {
  const navigate = useNavigate()
  const { isLogin } = CheckLogin()
  const handleLogout = () => {
    localStorage.removeItem('login')
    Swal.fire({
      title: "Berhasil Log Out ",
      text: "Silahkan login kembali..",
      icon: "success",
      button: `/Login`,
    })
    navigate('/login')
  }
  const context = React.useContext(AppContext)

  return (
    <>
      <nav className='navbar navbar-expand-lg'>
        <div className="container-fluid">
          <Link to="/" className='navbar-brand'>NgiungTRVL</Link>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarScroll" aria-controls="navbarScroll" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon" style={{ color: "black" }}></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarScroll">
      <ul className="navbar-nav ms-auto my-2 my-lg-0 navbar-nav-scroll" style={{bsscrollheight: "100px"}}>
        <li className='nav-item'>
              <Link to="/" className='nav-link active'>{context.lang==='en' ? 'Home' : 'Beranda'}</Link>
              </li>
              <li className='nav-item dropdown'> 
              <div className=" nav-link dropdown-toggle" id="navbarScrollingDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              {context.lang==='en' ? 'Destination' : 'Destinasi'}
              </div>
              <ul className="dropdown-menu" aria-labelledby="navbarScrollingDropdown">
                <li><Link to="/sumbawa" className="dropdown-item">Sumbawa Besar</Link></li>
                <li><Link to="/ksb" className="dropdown-item">Sumbawa Barat</Link></li>
                </ul>  
              </li>

              <li className='nav-item'>
              <Link to="/aboutus" className='nav-link active'>
              {context.lang==='en' ? 'About' : 'Tentang'}
              </Link>
              </li>
              {
                isLogin ?
                <li className='nav-item'>
                  <Nav.Link onClick={handleLogout}>{context.lang==='en' ? 'Logout' : 'Keluar'}</Nav.Link>
             </li> :
              <li className='nav-item'>
                  <Link to="/login" className="nav-link active">
                    {context.lang==='en' ? 'Login' : 'Masuk'}
                  </Link>
                  </li>
              }
             </ul> 
            
            <button className="button" variant="outline-light" onClick={() => context.onchangeLang(context.lang === "en" ? "id" : "en")}>EN / ID</button>
          </div>
        </div>
      </nav>
    </>
  )
}

export default NavBar