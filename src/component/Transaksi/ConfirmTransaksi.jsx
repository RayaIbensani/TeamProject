import React from 'react'
import NavBar from '../Navbar/Navbar';

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
                    <label className="input-group-text" for="inputGroupSelect01">Nama Pemesan</label>
                    <input type="name" className="form-control" placeholder={get.dataPemesan.user}></input>
                  </div>
                </div>
                <div className="col-6 ">
                  <div className="input-group mb-3">
                    <label className="input-group-text" for="inputGroupSelect01">Email Pemesan</label>
                    <input type="name" className="form-control" id="exampleFormControlInput1" placeholder={get.dataPemesan.email}></input>
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-3">
                    <label className="input-group-text" for="inputGroupSelect01">Tujuan Destinasi</label>
                    <input type="name" className="form-control" id="exampleFormControlInput1" placeholder={get.pemenasan.tujuan}></input>
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-3">
                    <label className="input-group-text" for="inputGroupSelect01">Kota Destinasi</label>
                    <input type="name" className="form-control" id="exampleFormControlInput1" placeholder={get.pemenasan.kotaDestinasi}></input>
                  </div>
                </div>
                <div className="col-6">
                  <div className="input-group mb-3">
                    <label className="input-group-text" for="inputGroupSelect01">No Telpon</label>
                    <input type="number" className="form-control" id="exampleFormControlInput1" placeholder={get.dataPemesan.handphone}></input>
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