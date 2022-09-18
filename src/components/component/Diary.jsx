import React from 'react'
import { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';

import Footer from '../Footer'
import Header from '../Header'

const Diary = (props) => {
  const userInfo = useSelector(state => state.loginReducer)
  const { repositoryService } =props
  const formRef = useRef();
  const titleRef = useRef();
  const memoRef = useRef();

  const userEmail = localStorage.getItem("userEmail")

  const onSubmit = (e) => {
    e.preventDefalut();
    const diaryData = {
      id: Date.now(),
      title: titleRef.current.value,
      memo: memoRef.current.value,
      fileName: "",
      fileUrl: "",
    }
    formRef.current.reset();
  }
  const testWrite = () => {
    repositoryService
    .newDiary({userId:"test1", title: "title", memo: "memo"})
  }
  const testRead = () => {
    repositoryService
    .openDiary({userId:"test1"})
  }

  return (
    <>
      <Header />
      <button onClick={testRead}></button>
      <section className="bg-light">
        <section className="container defalt-height">
          <div className="write-sheet">
            <Form.Label className="mt-2" htmlFor="title">요약</Form.Label>
            <Form.Control
              ref={titleRef}
              className='mb-2 text-box'
              type="text"
              id="title"
              aria-describedby="passwordHelpBlock"
            />
            <Form.Label className="mt-2" htmlFor="title">기록</Form.Label>
            <textarea ref={memoRef} className="form-control textarea-box" id="memo" cols="30" rows="10"></textarea>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="mt-2">기억에 남는 사진 한장</Form.Label>
            <Form.Control type="file" />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant='outline-secondary'>저장</Button>
          </div>
        </section>
      </section>
      
      <Footer />
    </>
  )
}

export default Diary