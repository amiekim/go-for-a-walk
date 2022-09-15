import React from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Footer from './Footer';
import Header from './Header';

const Login = () => {
  return (
    <>
      <Header />
      <section className="container defalt-height">
        <div className="d-flex justify-content-center py-5">
          <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Id</Form.Label>
                <Form.Control type="text" placeholder="Enter id" />
                <Form.Text className="text-muted">
                  아이디를 입력하세요.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formBasicCheckbox">
                <Form.Check type="checkbox" label="Check me out" />
              </Form.Group>
              <Button variant="primary" type="submit">
                Submit
              </Button>
          </Form>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Login
