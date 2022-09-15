import React, { useEffect } from 'react'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';

const Login = (props) => {
  const navigate = useNavigate();
  const { authService } = props;

  const successLogin = (userId) => {
    navigate("/diary", {
      state: {
        id: {id: userId}
      }
    })
  }
  const onLogin = (e) => {
    // 버튼에 있는 텍스트 이용
    authService
    .login(e.currentTarget.textContent)
    .then((data) => successLogin(data.user.uid));
  }
  useEffect(() => {
    // onAuthChange 함수 호출
    authService
    .onAuthChange((user) => {
      // 사용자가 바뀌면
      user && successLogin(user.uid);
    });
  },[])

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
          <ul>
            <li>
              <button onClick={onLogin}>Google</button>
            </li>
          </ul>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Login
