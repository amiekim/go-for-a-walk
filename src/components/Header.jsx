import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

import { firebaseApp } from '../service/firebase';
import AuthService from "../service/auth_service"

const Header = (props) => {
  const authService = new AuthService(firebaseApp);
  const userEmail = localStorage.getItem("userEmail")
  const navigate = useNavigate();
  const onLogOut = () => {
    authService
    .logout()
    .then(() => {
      localStorage.removeItem("userEmail")
      navigate("/login")
    });
  }

  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={"md"} expand={"md"} className="border">
          <Container>
            <Navbar.Brand href="/">나의 산책이야기</Navbar.Brand>
            <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${"md"}`} />
            <Navbar.Offcanvas
              id={`offcanvasNavbar-expand-${"md"}`}
              aria-labelledby={`offcanvasNavbarLabel-expand-${"md"}`}
              placement="end"
            >
              <Offcanvas.Header closeButton>
                <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${"md"}`}>
                  나의 산책이야기
                </Offcanvas.Title>
              </Offcanvas.Header>
              <Offcanvas.Body>
                <Nav className="justify-content-end flex-grow-1 pe-3">
                  {userEmail && <Nav.Link href="/diary">글쓰기</Nav.Link>}
                  {userEmail ? (<div className='nav-link' onClick={onLogOut}>Logout</div>)
                  :(<Nav.Link href="/login">Login</Nav.Link>)
                  }
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;