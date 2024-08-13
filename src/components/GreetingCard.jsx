import React from "react";
import { Card } from "react-bootstrap";
import axios from 'axios';
import { useEffect, useState } from "react";

const GreetingCard = () => {
  const [liveKe, setLiveKe] = useState(null);

  const getSesiActive = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/set-sesi/latest`);

      if (response.data) {
        setLiveKe(response.data.sesiActive);
      }
      console.log(response.data);
    } catch (error) {
      console.log("Failed to fetch sesi:", error);
    }
  };

  useEffect(() => {
    getSesiActive();
  }, []);

  const quoteStyle = {
    fontStyle: "",
    color: "#555",
    padding: "10px",
    borderLeft: "4px solid #007bff",
    backgroundColor: "#f9f9f9",
    margin: "20px 0",
    fontSize: "0.88em",
  };

  const authorStyle = {
    textAlign: "right",
    fontWeight: "bold",
    marginTop: "10px",
    color: "#333",
  };

  return (
    <>
      <Card.Title>Hallo sahabat semua!</Card.Title>
      <Card.Text>
        Terima kasih sudah berpartisipasi dalam Pelatihan dengan Tema Database
        (Database Design & Programming with SQL) Live Session-{liveKe || "loading"}. Tetap semangat
        untuk pelatihan-pelatihan selanjutnya.
      </Card.Text>

      <Card.Text style={quoteStyle}>
        24 jam sehari adalah waktu yang panjang.<br />
        Banyak hal yang bisa dikerjakan dalam sehari.<br />
        Jangan membuang waktumu untuk hal yang tidak berguna.<br />
        Waktu adalah sumber daya yang lebih berharga dari pada uang.<br />
        Terus membangun, Candi Prambanan saja hanya di buat dalam semalam!
        <div style={authorStyle}>- Kalimasada</div>
      </Card.Text>

      <Card.Text>
        <p className="fw-bold">
          *Pastikan Anda sudah check out :)
        </p>
      </Card.Text>
    </>
  );
};

export default GreetingCard;
