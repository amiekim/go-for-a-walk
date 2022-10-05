import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { useEffect } from 'react';
import { useState } from 'react';

const Home = (props) => {
  const { repositoryService } = props;
  const [myDiary, setMyDiary] = useState([]);
  const userEmail = localStorage.getItem("userEmail");

  const getData = (data) => {
    setMyDiary(Object.values(data)||[]);
  }
  const readDiaryDatas = async() => {
    // 읽어들이기
    repositoryService.openDiary({userEmail, getData});
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
            {userEmail?
            (
              myDiary.map((i, idx) => (
                <Col key={idx}>
                  <Card>
                    {i.imgUrl?
                      (
                        <Card.Img variant="top card-img-box" src={i.imgUrl} />
                      )
                      :(
                        <div className='card-img-top card-img-box no-diary-img'>
                          <div>
                          글로 표현한 마음 속 풍경
                          </div>
                        </div>
                      )
                    }
                    <Card.Body>
                      <Card.Title>{i.title}</Card.Title>
                      <Card.Text>
                        {i.memo}
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            )
            :(
              Array.from({ length: 4 }).map((_, idx) => (
              <Col key={idx}>
                <Card>
                  <Card.Img variant="top card-img-box" src="images/shepherd-dog.jpg" />
                  <Card.Body>
                    <Card.Title>제목</Card.Title>
                    <Card.Text>
                      내용
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))
            )}
          </Row>
        </div>
      <Footer />
    </>
  )
}

export default Home
