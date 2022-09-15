import React from 'react'
import { useRef } from 'react';
import { useState } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Footer from '../Footer'
import Header from '../Header'

const Diary = () => {
  const formRef = useRef();
  const titleRef = useRef();
  const memoRef = useRef();
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

  return (
    <>
      <Header />
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