import React from 'react'
import Header from './Header'
import Footer from './Footer'
import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';

const Home = () => {
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
            {Array.from({ length: 4 }).map((_, idx) => (
              <Col>
                <Card>
                  <Card.Img variant="top card-img-box" src="images/shepherd-dog.jpg" />
                  <Card.Body>
                    <Card.Title>Card title</Card.Title>
                    <Card.Text>
                      This is a longer card with supporting text below as a natural
                      lead-in to additional content. This content is a little bit
                      longer.
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </div>
      <Footer />
    </>
  )
}

export default Home
