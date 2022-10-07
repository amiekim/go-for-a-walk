import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';
import { useState } from 'react';
import { MAIN_DUMMY_DATA } from "../util/data"
import { useNavigate } from 'react-router-dom';

const Home = (props) => {
  const { repositoryService } = props;
  const navigate = useNavigate();
  const [myDiary, setMyDiary] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  const getData = (data) => {
    setMyDiary(Object.values(data)||[]);
  }
  const readDiaryDatas = async() => {
    // 읽어들이기
    repositoryService.openDiary({userEmail, getData});
  }
  const goDetail = (i) => {
    navigate(`/update/${i.memoIndex}` , {state : i});
  }

  useEffect(() => {
    if(userEmail) readDiaryDatas();
  },[]);

  return (
    <>
      <Header />
        <section className="py-5 text-center container">
          <div className="row py-lg-5">
            <div className="col-lg-6 col-md-8 mx-auto">
              <h1 className="fw-light">나의 산책이야기</h1>
              <p className='lead text-muted'>걸으면서 찾은 나의 일상 이야기</p>
            </div>
          </div>
        </section>
        <div className="album py-5 bg-light">
          <Row xs={1} sm={2} lg={3} xl={4} className="g-4">
            {
              (
                userEmail ?
                myDiary :
                MAIN_DUMMY_DATA.length > 0 ?
                MAIN_DUMMY_DATA :
                []
              ).map((i, idx) => (
                <Col key={idx}>
                  <Card>
                    {i.imgUrl?
                      (<Card.Img variant="top card-img-box" src={i.imgUrl} />)
                      :(<div className='card-img-top card-img-box no-diary-img'>
                          <div>
                          글로 표현한 마음 속 풍경
                          </div>
                        </div>)
                    }
                    <Card.Body className='box-height140' onClick={() => goDetail(i)}>
                      <div className='card-text'>
                        {i.regTime}
                      </div>
                      <Card.Title className='text-summerize-line1'>{i.title}</Card.Title>
                      <Card.Text className='text-summerize-line2'>
                        {i.memo}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                )
              )
            }
          </Row>
        </div>
      <Footer />
    </>
  )
}

export default Home
