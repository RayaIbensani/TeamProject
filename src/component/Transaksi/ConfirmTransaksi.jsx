import React from 'react'
import NavBar from '../Navbar/Navbar';
// import Form from 'react-bootstrap/Form';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from "react-router-dom";

function ConfirmTransaksi() {
  const [BookingRegister, setBookingRegister] = useState([])


  const getBookingTour = async () => {
    const booking = await axios.get("https://631843e9f6b281877c677851.mockapi.io/register")
    // console.log(booking.data);

    const userLogin = JSON.parse(localStorage.getItem('login'))
    // console.log(userLogin.email)
    const findUser = booking.data.find(user => {
      return user.email === userLogin.email
    })

    // console.log(findUser, 'ini yang ketemu');
    setBookingRegister(findUser.transaksi)
  }

  useEffect(() => {
    getBookingTour()
  }, [])

  return (
    <>
      <NavBar />
      {
        BookingRegister.map((get) => {
          return (
            <div className="container" key={get.id}>
              <div className="row" >
                <div className="col-6">
                  <div className="input-group mb-3">
                    <label>Nama Pemesan</label>
                    <input className="form-control" placeholder={get.dataPemesan.user} disabled />
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="input-group mb-3">
                    <label>Email Pemesan</label>
                    <input className="form-control" placeholder={get.dataPemesan.email} disabled />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-3">
                    <label>Tujuan Destinasi</label>
                    <input className="form-control" placeholder={get.pemenasan.tujuan} disabled />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-3">
                    <label>Kota Destinasi</label>
                    <input className="form-control" placeholder={get.pemenasan.kotaDestinasi} disabled />
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-3">
                    <label>No Telpon</label>
                    <input className="form-control" placeholder={get.dataPemesan.handphone} disabled />
                  </div>
                </div>
                <hr/>
              </div>
            </div> 
          )
        })
      }
      <div className="container">
        <Link to="/">
          <button type="button" className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">
            Home
          </button>
        </Link>
      </div>


    </>
  )
}

export default ConfirmTransaksi