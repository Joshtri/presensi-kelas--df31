// GreetingCard.js
// import React from "react";
import { Card } from "react-bootstrap";

const GreetingCard = () => {

  const live_ke = 8;
  return (
    <>
      <Card.Title>Hallo sahabat semua!</Card.Title>
      <Card.Text>
        Terima kasih sudah berpartisipasi dalam Pelatihan dengan Tema Database
        (Database Design & Programming with SQL) Live Session-{live_ke}. Tetap semangat
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
