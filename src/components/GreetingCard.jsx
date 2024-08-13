// GreetingCard.js
// import React from "react";
import { Card } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from "react";

const GreetingCard = () => {
  const [liveKe, setLiveKe] = useState(null);


  const getSesiActive = async()=>{
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/set-sesi/latest`)

      if (response.data) {
        setLiveKe(response.data.sesiActive);
      }
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch sesi:", error);
    }
  }

  useEffect(()=>{
    getSesiActive();
  },[]);

  // const live_ke = 8;
  return (
    <>
      <Card.Title>Hallo sahabat semua!</Card.Title>
      <Card.Text>
        Terima kasih sudah berpartisipasi dalam Pelatihan dengan Tema Database
        (Database Design & Programming with SQL) Live Session-{liveKe || "loading"}. Tetap semangat
        untuk pelatihan-pelatihan selanjutnya.
      </Card.Text>
      
      <Card.Text>
        <p  className="fw-bold">
          *Pastikan Anda sudah check out :)
        </p>
      </Card.Text>
    </>
  );
};

export default GreetingCard;
