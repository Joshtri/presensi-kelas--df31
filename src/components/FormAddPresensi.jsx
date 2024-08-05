// import React from 'react';
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faAddressCard,
  faHourglassStart,
  faHourglassEnd,
  faFloppyDisk,
} from "@fortawesome/free-solid-svg-icons";
import GreetingCard from "./GreetingCard";
import { useState } from "react";
import axios from "axios";

const FormAddPresensi = () => {

    const [pesertas, setPesertas] = useState([]);

    const getPeserta = async()=>{
        try {
            const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/peserta`);
        } catch (error) {
            console.error('failed to fetch peserta : ', error);
        }
    }
  return (
    <Container className="mt-5 mb-5">
      <Card className="border-0 shadow-sm p-3 col-lg-10 mx-auto">
        <Card.Body>
          <GreetingCard />
          <hr />

          <Form id="signature-form" action="/post" method="post">
            <h6 className="pb-3">Silahkan mengisi form berikut.</h6>
            <Row className="mx-auto mt-2">
              <Col lg={5} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon
                      icon={faAddressCard}
                      className="mx-1"
                      style={{ color: "#dec054" }}
                    />{" "}
                    Nama Lengkap
                  </Form.Label>
                  <Form.Control
                    type="text"
                    name="nama_lengkap"
                    placeholder="contoh: anton"
                    required
                  />
                </Form.Group>
              </Col>
            </Row>

            <Row className="mx-auto justify-content-center mt-2">
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon
                      icon={faHourglassStart}
                      className="mx-1"
                      style={{ color: "#ca5858" }}
                    />{" "}
                    Jam Masuk
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="jam_masuk"
                    placeholder="contoh: 2024-08-03T05:28:16.000Z"
                    required
                  />
                </Form.Group>
                <Form.Text className="text-muted ms-1">
                  *) Jam Masuk (contoh: check in 09:00, maka jam masuk 10.00)
                </Form.Text>
              </Col>

              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faHourglassEnd} className="mx-1" />{" "}
                    Jam Keluar
                  </Form.Label>
                  <Form.Control
                    type="time"
                    name="jam_keluar"
                    placeholder="contoh: 2024-08-03T05:28:16.000Z"
                    required
                  />
                </Form.Group>
                <Form.Text className="text-muted ms-1">
                  *) Jam Keluar (contoh: check out 09:00, maka jam keluar
                  10.00).
                </Form.Text>
              </Col>
            </Row>

            <hr />

            <Row className="justify-content-center mt-3">
              <Col lg={2} className="text-center">
                <Button type="submit" className="btn btn-primary">
                  <FontAwesomeIcon icon={faFloppyDisk} className="mx-1" /> Kirim
                </Button>
              </Col>
            </Row>
          </Form>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default FormAddPresensi;
