import React, { useRef, useState, useEffect } from 'react'
import './StyleTransaksi.css'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Navbar from '../Navbar/Navbar';
import axios from 'axios';
import { useParams, useLocation, json } from 'react-router-dom'
import Swal from "sweetalert2";
import { faCheck, faTimes, faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";


function Transaksi() {
  // penanda saat user select antara sumbawa besar dan barat
  // Sumbawa Besar || Sumbawa Barat
  const { state } = useLocation()
  const [destinationSelect, setDestinationSelect] = useState("")
  const [destinasiSumbawa, setDestinasiSumbawa] = useState([]);
  const [destinasiSumbawaBarat, setDestinasiSumbawaBarat] = useState([]);
  const [stateTransaksi, setStateTransaksi] = useState({});
  const [selectTrip, setSelectTrip] = useState("")
  const [booking, setBooking] = useState({
    kotaDestinasi: state.lokasi,
    tujuan: state.namaTempat,
    tipeTrip: "",
    date: ""
  })
  const { tujuan, id } = useParams();

  const handleChange = (event) => {
    setDestinationSelect(event.target.value);
    setSelectTrip(event.target.value);
  }

  const fetchPromise = async () => {
    const [firstResponse, secondResponse] = await Promise.all([
      axios.get(`https://631843e9f6b281877c677851.mockapi.io/sumbawa`),
      axios.get(`https://631843e9f6b281877c677851.mockapi.io/sumbawa_barat`)
    ]);
    setDestinasiSumbawa(firstResponse.data)
    setDestinasiSumbawaBarat(secondResponse.data)
  }

  useEffect(() => {
    fetchPromise()
    filteretSumbawa()
    filteretSumbawaBarat()
    setDestinationSelect(tujuan)
    // hendleKota()
    console.log(state);
  }, []);

  useEffect(() => {
    console.log(destinationSelect);
    console.log(booking);
  }, [destinationSelect, booking])

  const filteretSumbawa = () => {
    const selectTransaksi = destinasiSumbawa.filter((destinasi) => {
      return destinasi.id === id
    })
    setStateTransaksi(selectTransaksi)
    console.log(selectTransaksi);
  }

  const filteretSumbawaBarat = () => {
    const selectTransaksi = destinasiSumbawaBarat.filter((destinasiSbwBarat) => {
      return destinasiSbwBarat.id === id
    })
    setStateTransaksi(selectTransaksi)
    console.log(selectTransaksi);
  }


  const USER_REGEX = /^[A-z][A-z0-9-_" "|""]{3,23}$/;
  const ADDRESS_REGEX = /^[A-z][A-z0-9-_ " "|""]{6,23}$/;
  const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
  const PHONE_REGEX = /^(\+62|62|0)8[1-9][0-9]{6,9}$/;

  const userRef = useRef();
  const errRef = useRef();

  const [user, setUser] = useState('');
  const [validName, setValidName] = useState(false);
  const [userFocus, setUserFocus] = useState(false);

  const [address, setAdress] = useState('');
  const [validAddress, setValidAddress] = useState(false);
  const [addressFokus, setAddressFokus] = useState(false);

  const [email, setEmail] = useState('');
  const [validEmail, setValidEmail] = useState(false);
  const [emailFocus, setemailFocus] = useState(false);

  const [handphone, setHandphone] = useState('');
  const [validHandphone, setValidHandphone] = useState(false);
  const [handphoneFocus, setHandphoneFocus] = useState(false);

  useEffect(() => {
    userRef.current.focus();
  }, [])

  useEffect(() => {
    const result = USER_REGEX.test(user);
    setValidName(result)
  }, [user])

  useEffect(() => {
    const result = EMAIL_REGEX.test(email);
    setValidEmail(result)
  }, [email])

  useEffect(() => {
    const result = ADDRESS_REGEX.test(address);
    setValidAddress(result)
  }, [address])

  useEffect(() => {
    const result = PHONE_REGEX.test(handphone);
    setValidHandphone(result)
  }, [handphone])

  const biodata = (e) => {
    e.preventDefault()
    const data = {
      user: user,
      address: address,
      email: email,
      handphone: handphone
    }
    console.log(data);

    const body = {
      dataPemesan: data,
      pemenasan: booking
    }

    const userLogin = localStorage.getItem('login')
    const dataLogin = JSON.parse(userLogin)

    axios.put(`https://631843e9f6b281877c677851.mockapi.io/register/${Number(dataLogin.id)}`, { ...dataLogin, transaksi: dataLogin.transaksi.concat(body) })
      .then(result => {
        console.log(result.status)
        if (result.status === 200) {
          localStorage.setItem('login', JSON.stringify(result.data))
          Swal.fire({
            title: "Good job!",
            text: "Booking Tiket Berhasil",
            icon: "success",
            button: "Aww yiss!",
          }).then((result) => {
            if (result.value) {
              window.location.href = `/ConfirmTransaksi`
            }
          })
        } else {
          alert('tidak berhasil register')
        }
      })
  }

  return (
    <>
      <Navbar />
      <div name='payment' className='transaksi'>
        <div className="container">
          <div className="right">
            <h4>Biodata</h4>
            <div className="mb-3">
              <label htmlFor="user">
                <span className={validName ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validName || !user ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                placeholder="Nama Lengkap"
                id="inputNamaLengkap"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setUser(e.target.value)}
                value={user}
                required
                aria-invalid={validName ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setUserFocus(true)}
                onBlur={() => setUserFocus(false)}
                className="form-control rounded-pill border-0 shadow-sm px-4"
              />
              <p id="uidnote" className={userFocus && user && !validName ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                4 to 24 characters.<br />
                Must begin with a letter.<br />
                Letters, numbers, underscores, hyphens allowed.
              </p>
            </div>

            <div className="mb-3">
              <label htmlFor="address">
                <span className={validAddress ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>
                <span className={validAddress || !address ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="text"
                placeholder="Alamat Lengkap"
                id="inputAlamat"
                ref={userRef}
                autoComplete="off"
                onChange={(e) => setAdress(e.target.value)}
                value={address}
                required
                aria-invalid={validAddress ? "false" : "true"}
                aria-describedby="uidnote"
                onFocus={() => setAddressFokus(true)}
                onBlur={() => setAddressFokus(false)}
                className="form-control rounded-pill border-0 shadow-sm px-4"
              />
              <p id="uidnote" className={addressFokus && address && !validAddress ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                6 to 24 characters.<br />
              </p>
            </div>

            <div className="mb-3">
              <label htmlFor="email">
                <span className={validEmail ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>

                <span className={validEmail || !email ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
                {/* <FontAwesomeIcon icon={faCheck} className={validName ? "valid" : "hide"} /> */}
                {/*   faTimes} className={validName || !user ? "hide" : "invalid"} /> */}
              </label>
              <input
                type="email"
                placeholder="Email"
                id="email"
                //  ref={userRef}
                autoComplete="off"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                required
                aria-invalid={validEmail ? "false" : "true"}
                aria-describedby="emailnote"
                onFocus={() => setemailFocus(true)}
                onBlur={() => setemailFocus(false)}
                className="form-control rounded-pill border-0 shadow-sm px-4"
              />
              <p id="emailnote" className={emailFocus && email && !validEmail ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Invalid  your email
              </p>
            </div>

            <div className="mb-3">
              <label htmlFor="handphone">
                <span className={validHandphone ? "valid" : "hide"}>
                  <FontAwesomeIcon icon={faCheck} />
                </span>

                <span className={validHandphone || !handphone ? "hide" : "invalid"}>
                  <FontAwesomeIcon icon={faTimes} />
                </span>
              </label>
              <input
                type="number"
                placeholder="No Telpon"
                id="handphone"
                //  ref={userRef}
                autoComplete="off"
                onChange={(e) => setHandphone(e.target.value)}
                value={handphone}
                required
                aria-invalid={validHandphone ? "false" : "true"}
                aria-describedby="handphonenote"
                onFocus={() => setHandphoneFocus(true)}
                onBlur={() => setHandphoneFocus(false)}
                className="form-control rounded-pill border-0 shadow-sm px-4"
              />
              <p id="handphonenote" className={handphoneFocus && email && !validHandphone ? "instructions" : "offscreen"}>
                <FontAwesomeIcon icon={faInfoCircle} />
                Invalid  your Phone Number
              </p>
            </div>

            <Form>
              <fieldset>
                <h4><strong>Booking</strong></h4>
                <Form.Group className="mb-3 form-trs">
                  <Form.Label htmlFor="">Kota Destinasi</Form.Label>
                  <Form.Select value={destinationSelect} onChange={handleChange}>
                    <option>Search Your Destination</option>
                    <option value={'SumbawaBesar'}>Sumbawa Besar</option>
                    <option value={'SumbawaBarat'}>Sumbawa Barat</option>
                  </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3 form-trs">
                  <Form.Label htmlFor="">Tujuan Wisata</Form.Label>
                  <Form.Select id="">
                    <option>Daftar Destinasi</option>

                    {
                      destinationSelect === 'SumbawaBesar' && destinasiSumbawa.map((daftarNama) => (

                        <option selected={id === daftarNama.id} key={daftarNama.id} value={daftarNama.id}>{daftarNama.namaTempat}</option>

                      )
                      )
                    }

                    {
                      destinationSelect === 'SumbawaBarat' && destinasiSumbawaBarat.map((daftarNama) => (
                        <option selected={id === daftarNama.id} key={daftarNama.id} value={daftarNama.id}>{daftarNama.namaTempat}</option>
                      )
                      )
                    }
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 form-trs">
                  <Form.Label htmlFor="">Your Trip</Form.Label>
                  <Form.Select value={selectTrip} onChange={handleChange}>
                    <option>Choose Your Type</option>
                    <option value={'adventure'}>Adventure</option>
                    <option value={'camping'}>Camping</option>
                  </Form.Select>
                </Form.Group>
                <Form.Group className="mb-3 form-trs">
                  <Form.Label htmlFor="">Choose Ticket </Form.Label>
                  <input type="date"></input>
                </Form.Group>
                {/* <Button type="submit" onClick={biodata} >CHECKOUT</Button> */}
                <div className="d-grid gap-2 mt-2">
                  <button onClick={biodata} disabled={!validName || !validEmail || !validAddress || !validHandphone ? true : false}
                    className="btn btn-primary btn-block text-uppercase mb-2 rounded-pill shadow-sm">
                    CHECKOUT
                  </button>
                </div>
              </fieldset>
            </Form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Transaksi
