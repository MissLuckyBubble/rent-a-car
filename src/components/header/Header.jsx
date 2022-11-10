import './Header.scss';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Link }  from 'react-router-dom';

export function Header() {
    return (
        <Navbar bg="light" expand="lg" className='color-nav'>
        <img src="logo.png" className='img' alt='Rent' title="Rent-A-Car"/>
        <Container>
          <Navbar.Brand>Rent-A-Car</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto"> 
                <Link className="nav-link" to="/cars">Cars</Link>
                <Link className="nav-link" to="/cars/create">Add Car</Link>
                <Link className="nav-link" to="/users">Users</Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
}
