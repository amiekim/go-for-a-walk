import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Footer from './Footer';
import Header from './Header';
import { useDispatch } from 'react-redux';

const Login = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { authService } = props;

  const successLogin = (userInfo) => {
    const userId = userInfo.uid;
    const userEmail = userInfo.email;
    localStorage.setItem("userEmail", userEmail);
    dispatch({type:"LOGIN", payload: {userInfo: {userId, userEmail}}});
    navigate("/diary");
  }
  const onLogin = (e) => {
    // 버튼에 있는 텍스트 이용
    authService
    .login(e.currentTarget.textContent)
    .then((data) => {
      successLogin(data.user)
    });
  }
  useEffect(() => {
    // onAuthChange 함수 호출
    authService
    .onAuthChange((user) => {
    // 사용자가 바뀌면
      if(user) successLogin(user)
      else {
        localStorage.removeItem("userId");
        localStorage.removeItem("userEmail");
      }
    });
  },[])

  return (
    <>
      <Header />
      <section className="container defalt-height">
        <div className="d-flex justify-content-center py-5">
          <div>
            <p>외부 로그인</p>
            <Button variant="primary" onClick={onLogin}>Google</Button>
          </div>
        </div>
      </section>
      <Footer />
    </>
  )
}

export default Login
