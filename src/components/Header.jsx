import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';

const Header = () => {
  return (
    <>
      {['md'].map((expand) => (
        <Navbar key={"md"} bg="light" expand={"md"} className="">
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
                  <Nav.Link href="/login">Login</Nav.Link>
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