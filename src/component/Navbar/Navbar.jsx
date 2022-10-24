import React from 'react'
// import { Link } from 'react-router-dom'
import './NavStyle.css'
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
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
      <Navbar className='navbarr navbar-dark' expand="lg">
        <Container fluid>
          <Navbar.Brand href="#">NgiungTRVL</Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="mx-auto my-2 my-lg-0"
              style={{ maxHeight: '100px' }}
              navbarScroll
            >
              <Nav.Link href="/">{context.lang==='en' ? 'Home' : 'Beranda'}</Nav.Link>
              <NavDropdown title={context.lang==='en' ? 'Destination' : 'Destinasi'} id="navbarScrollingDropdown">
                <NavDropdown.Item href="/sumbawa">Sumbawa Besar</NavDropdown.Item>
                <NavDropdown.Item href="/ksb">
                  Sumbawa Barat
                </NavDropdown.Item>
              </NavDropdown>
              <Nav.Link href="/aboutus">
              {context.lang==='en' ? 'About' : 'Tentang'}
              </Nav.Link>
              {
                isLogin ?
                  <Nav.Link onClick={handleLogout}>{context.lang==='en' ? 'Logout' : 'Keluar'}</Nav.Link>
                  :
                  <Nav.Link href="/login">
                    {context.lang==='en' ? 'Login' : 'Masuk'}
                  </Nav.Link>
              }
            </Nav>
            <Button variant="outline-light" onClick={() => context.onchangeLang(context.lang === "en" ? "id" : "en")}>EN / ID</Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  )
}

export default NavBar