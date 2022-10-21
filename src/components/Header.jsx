import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';

import { firebaseApp } from '../service/firebase';
import AuthService from "../service/auth_service"
import { useDispatch, useSelector } from 'react-redux';

const Header = (props) => {
  const authService = new AuthService(firebaseApp);
  const { userInfo } = useSelector(state => state.loginReducer);
  const { userEmail } = userInfo;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const onLogOut = async() => {
    authService
    .logout()
    .then(() => {
      dispatch({type:"LOGOUT", payload: {} });
      navigate("/");
    });
  }

  return (
    <>
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
                  {userEmail ?
                    (
                      <div className='nav-link btn-cursor-pointer' onClick={onLogOut}>Logout</div>
                    ):
                    (<Nav.Link href="/login">Login</Nav.Link>)
                  }
                </Nav>
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
    </>
  );
}

export default Header;