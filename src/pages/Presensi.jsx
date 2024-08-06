// import React from 'react'
import FormAddPresensi from '../components/FormAddPresensi'
import NavbarComp from '../components/Navbar'

function Presensi() {
  return (
    <>
        {/* semua navbar sudah di component FormAddPresensi */}
        <NavbarComp/>
        <FormAddPresensi/>
    </>
  )
}

export default Presensi