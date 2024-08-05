import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';

const NavbarComp = () => {
  return (
    <div>
        <Navbar expand="lg" bg="dark" data-bs-theme="dark" className="bg-body-tertiary shadow shadow-lg">
        <Container>
            <Navbar.Brand className='fw-bold'>Presensi Kelas Database Oracle</Navbar.Brand>
        </Container>
        </Navbar>
    </div>
  )
}

export default NavbarComp