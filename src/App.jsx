// import { useState } from 'react'
import { BrowserRouter, Routes, Route } from "react-router-dom";

// import './App.css'
// import NavbarComp from './components/Navbar'
// import FormAddPresensi from './components/FormAddPresensi'
import Presensi from "./pages/Presensi";


function App() {

  return (
    <>
      <BrowserRouter basename='/'>
        <Routes>
          <Route path="/" element={<Presensi/>}/>
        </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
