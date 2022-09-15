import { useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { useNavigate } from 'react-router-dom';


const Header = (props) => {
  const navigate = useNavigate();
  const { authService, isLogin=false } = props;
  const onLogOut = () => {
    authService.logout();
  }

  useEffect(()=>{
    if(authService) {
    authService.onAuthChange((user) => {
      if(!user) {
        navigate("/")
      }
    })}
  },[]);

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
                  {isLogin ? (<Button onClick={onLogOut}>Logout</Button>)
                  :(<Nav.Link href="/login">Login</Nav.Link>)
                  }
                  
                  {/* <Nav.Link href="#action2">Link</Nav.Link> */}
                </Nav>
                {/* <Form className="d-flex">
                  <Form.Control
                    type="search"
                    placeholder="Search"
                    className="me-2"
                    aria-label="Search"
                  />
                  <Button variant="outline-success">Search</Button>
                </Form> */}
              </Offcanvas.Body>
            </Navbar.Offcanvas>
          </Container>
        </Navbar>
      ))}
    </>
  );
}

export default Header;