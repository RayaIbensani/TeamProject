import { Route, Routes } from "react-router-dom";
import Home from "./component/Home/Home";
import Sumbawa from "./component/sumbawa/Sumbawa";
import Ksb from "./component/ksb/Ksb";
import AboutUs from "./component/Aboutus/AboutUs";
import Transaksi from "./component/Transaksi/Transaksi";
import Login from "./component/Login/Login";
import Footer from "./component/Footer/Footer";
import Register from "./component/Register/Register";
import { AppContext } from './context/AppContext';
import { useState } from 'react';
import ConfirmTransaksi from "./component/Transaksi/ConfirmTransaksi";

function App() {
  const [language, setLanguage] = useState("en")
  return (
    <>
      <AppContext.Provider
        value={{
          lang: language,
          onchangeLang: setLanguage,
        }}
      >

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="sumbawa" element={<Sumbawa />} />
          <Route path="ksb" element={<Ksb />} />
          <Route path="aboutus" element={<AboutUs />} />
          <Route path="transaksi/:tujuan/:id" element={<Transaksi />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="confirmTransaksi" element={<ConfirmTransaksi />} />
        </Routes>
        <Footer />
      </AppContext.Provider>
    </>
  );
}

export default App;
