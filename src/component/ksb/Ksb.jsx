import React from 'react'
import NavBar from '../Navbar/Navbar'
import Card from 'react-bootstrap/Card'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
import { useState, useEffect } from 'react';
import axios from 'axios';
import './ksb.css'
import { useNavigate } from 'react-router-dom'
import { AppContext } from '../../context/AppContext'

function Ksb() {

  const navigate = useNavigate()
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  // const handleShow = () => setShow(true);
  const [modalReact, setModalReact] = useState({})

  const [DataSumbawa, setMyDataSumbawa] = useState([]);

  const getApiDataSumbawa = async () => {
    const dataSumbawa = await axios.get("https://631843e9f6b281877c677851.mockapi.io/sumbawa_barat");
    setMyDataSumbawa(dataSumbawa.data)
  }

  const trasnferDataModal = (data) => {
    setModalReact(data)
    setShow(true)
  }

  const handleBook = (id) => {
    navigate(`/transaksi/SumbawaBarat/${id}`, {state: modalReact})
  }

  useEffect(() => {
    getApiDataSumbawa()
  }, [])

  const context = React.useContext(AppContext)

  return (
    <>
      <NavBar />
      <div className='container' >
        <div className="row">

          {DataSumbawa.map((get) => {
            const { id, namaTempat, lokasi, images, price, Deskipsi } = get;

            return (

              <div key={id} className="col-lg-4 col-md-6 col-sm-6 py-3">
                <Card >
                  <Card.Img className='img' variant="top" src={images} />
                  <Card.Body>
                    <Card.Title>{namaTempat}</Card.Title>
                    <Card.Text>
                      {lokasi}
                    </Card.Text>
                    <Card.Text>
                      {price}
                    </Card.Text>
                  </Card.Body>
                  <Card.Footer>
                    <Button variant="primary" onClick={() => trasnferDataModal(
                      { id, namaTempat, lokasi, images, price, Deskipsi }
                    )}>
                      {context.lang==='en' ? 'Destination Details' : 'Detail Destinasi'}
                    </Button>

                  </Card.Footer>
                </Card>
              </div>

            )
          })}
          <Modal show={show} onHide={handleClose} animation={false}>
            <Modal.Header closeButton>
              <Modal.Title>{modalReact.namaTempat}</Modal.Title>
            </Modal.Header>
            <Modal.Body>{modalReact.Deskipsi}</Modal.Body>
            <Modal.Footer>
              <Button variant="primary" onClick={() => handleBook(modalReact.id)}>
              {context.lang==='en' ? 'Booking Ticket' : 'Pesan Tiket'}
              </Button>
            </Modal.Footer>
          </Modal>
        </div>
      </div>
    </>
  )
}

export default Ksb
