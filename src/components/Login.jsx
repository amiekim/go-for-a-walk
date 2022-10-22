import React, { useEffect } from 'react'
import { Button } from 'react-bootstrap';
import Footer from './Footer';
import Header from './Header';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Login = (props) => {  
  const navigate = useNavigate()
  const dispatch = useDispatch();
  const { authService } = props;

  const loggedOut = () => dispatch({type:"LOGOUT", payload: {} })
  const successLogin = (userInfo) => {
    // stsTokenManager.accessToken
    const userId = userInfo.uid;
    const userEmail = userInfo.email;
    dispatch({type:"LOGIN", payload: { userId, userEmail }});
    navigate("/");
  }
  
  const onLogin = async(e) => {
    // 버튼에 있는 텍스트 이용
    const result = await authService.login(e.currentTarget.textContent);
    if(result) successLogin(result.user);
  }
  
  useEffect(() => {
    // onAuthChange 함수 호출
    authService.onAuthChange((user) => {
    // 페이지에 들어오면 사용자 있는지 여부 확인
      if(user) successLogin(user)
      else loggedOut();
    });
  },[]);

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
