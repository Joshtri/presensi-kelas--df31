import React, { useEffect, useState } from "react";
import { Container, Row, Col, Form, Button, Card, InputGroup } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faAddressCard, faHourglassStart, faHourglassEnd, faFloppyDisk, faSearch } from "@fortawesome/free-solid-svg-icons";
import GreetingCard from "./GreetingCard";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import './formPresensi.css'; 
import { useNavigate } from "react-router-dom";

const FormAddPresensi = () => {
  const [pesertas, setPesertas] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredPesertas, setFilteredPesertas] = useState([]);
  const [selectedPeserta, setSelectedPeserta] = useState("");
  const [jamMasuk, setJamMasuk] = useState("");
  const [jamKeluar, setJamKeluar] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getPeserta();
  }, []);

  useEffect(() => {
    const results = pesertas.filter((peserta) =>
      peserta.nama_peserta.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredPesertas(results);

    if (searchQuery && results.length > 0) {
      setSelectedPeserta(results[0]._id);
    } else {
      setSelectedPeserta("");
    }

    if (searchQuery && results.length === 0) {
      toast.error("Nama Anda tidak ditemukan");
    }
  }, [searchQuery, pesertas]);

  const capitalizeWords = (text) => {
    return text
      .toLowerCase()
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(" ");
  };

  const getPeserta = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/api/peserta`);
      const capitalizedPesertas = response.data.map((peserta) => ({
        ...peserta,
        nama_peserta: capitalizeWords(peserta.nama_peserta),
      }));
      setPesertas(capitalizedPesertas);
      setFilteredPesertas(capitalizedPesertas);
    } catch (error) {
      console.log("Failed to fetch peserta:", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSelect = (e) => {
    setSelectedPeserta(e.target.value);
  };

  const savePresensi = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/api/presensi`, {
        pesertaId: selectedPeserta,
        jam_masuk: jamMasuk,
        jam_keluar: jamKeluar,
        live_sesi: 1,
      });
      toast.success("Presensi saved successfully!");
      navigate("/");

      console.log("Presensi saved successfully:", response.data);
    } catch (error) {
      if (error.response) {
        toast.error("Server responded with error: " + error.response.data);
        console.log("Server responded with error:", error.response.data);
      } else {
        toast.error("Failed to save presensi: " + error.message);
        console.log("Failed to save presensi:", error.message);
      }
    }
  };

  return (
    <Container className="mt-4 mb-4">
      <ToastContainer />
      <Card className="border-0 shadow-sm p-3 col-lg-10 mx-auto">
        <Card.Body>
          <GreetingCard />
          <hr />
          <Form onSubmit={savePresensi}>
            <h6 className="pb-3">Silahkan mengisi form berikut.</h6>
            <Row className="mx-auto mt-2">
              <Col lg={8} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faAddressCard} className="mx-1" style={{ color: "#dec054" }} /> Nama Peserta
                  </Form.Label>
                  <Col lg={6}>
                    <InputGroup size="sm">
                      <InputGroup.Text>
                        <FontAwesomeIcon icon={faSearch} />
                      </InputGroup.Text>
                      <Form.Control
                        type="text"
                        placeholder="Cari Nama Anda"
                        value={searchQuery}
                        onChange={handleSearch}
                      />
                    </InputGroup>
                  </Col>
                  <Form.Control
                    as="select"
                    name="nama_lengkap"
                    value={selectedPeserta}
                    onChange={handleSelect}
                    className="mt-2"
                    required
                    style={{ textTransform: "capitalize" }}
                  >
                    {searchQuery === "" ? <option value="">Pilih Nama Peserta</option> : null}
                    {filteredPesertas.map((peserta) => (
                      <option 
                        key={peserta._id} 
                        value={peserta._id}
                        className={selectedPeserta === peserta._id ? 'selected-option' : ''}
                      >
                        {peserta.nama_peserta}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>
              </Col>
            </Row>
            <Row className="mx-auto justify-content-center mt-2">
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faHourglassStart} className="mx-1" style={{ color: "#ca5858" }} /> Jam Masuk
                  </Form.Label>
                  <Form.Control type="time" value={jamMasuk} onChange={(e)=> setJamMasuk(e.target.value)} name="jam_masuk" required />
                  <Form.Text className="text-muted ms-1">
                    *) Jam Masuk (contoh: check in 09:00, maka jam masuk 10.00)
                  </Form.Text>
                </Form.Group>
              </Col>
              <Col lg={6} className="mb-3">
                <Form.Group>
                  <Form.Label>
                    <FontAwesomeIcon icon={faHourglassEnd} className="mx-1" /> Jam Keluar
                  </Form.Label>
                  <Form.Control type="time" value={jamKeluar} onChange={(e)=> setJamKeluar(e.target.value)} name="jam_keluar" required />
                  <Form.Text className="text-muted ms-1">
                    *) Jam Keluar (contoh: check out 09:00, maka jam keluar 10.00)
                  </Form.Text>
                </Form.Group>
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
