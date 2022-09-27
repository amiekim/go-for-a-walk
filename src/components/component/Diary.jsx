import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import { useSelector } from 'react-redux';
import dayjs from 'dayjs';

import Footer from '../Footer'
import Header from '../Header'
import { useNavigate } from 'react-router-dom';


const Diary = (props) => {
  const { repositoryService, FileInput } = props
  const navigate = useNavigate()
  const userInfo = useSelector(state => state.loginReducer)
  const formRef = useRef();
  const titleRef = useRef();
  const memoRef = useRef();

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("")

  const userEmail = localStorage.getItem("userEmail");

  const XSSCheck = (str, level) => {
    if (level == undefined || level == 0) {
      str = str.replace(/\<|\>|\"|\'|\%|\;|\(|\)|\&|\+|\-/g,"");
    } else if (level != undefined && level == 1) {
      str = str.replace(/\</g, "&lt;");
      str = str.replace(/\>/g, "&gt;");
    }
    return str;
  }
  const onSubmit = (e) => {
    e.preventDefault();
    const regTime = dayjs().format('YYYY-MM-DD_HH:mm:ss');
    let diaryData = {};
    const chkTitle = XSSCheck(title);
    const chkMemo = XSSCheck(memo);
    if(regTime && userEmail) {
      diaryData = {
        regTime,
        userEmail,
        chkTitle,
        chkMemo,
        fileName: "",
        fileUrl: "",
      }
      repositoryService
      .newDiary({...diaryData})
      navigate("/")
    } else alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.")
  }
  const readDiaryDatas = () => {
    // 읽어들이기
    repositoryService
    .openDiary({userEmail})
  }

  useEffect(() => {
    if(userEmail) readDiaryDatas();
  },[]);


  return (
    <>
      <Header />
      <section className="bg-light">
        <section className="container defalt-height">
          <div className="d-flex justify-content-end">
            <Button variant='outline-secondary' onClick={onSubmit}>저장</Button>
          </div>
          <div className="write-sheet">
            <Form.Label className="mt-2" htmlFor="title">요약</Form.Label>
            <Form.Control
              ref={titleRef}
              className='mb-2 text-box'
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <Form.Label className="mt-2" htmlFor="title">기록</Form.Label>
              <textarea ref={memoRef}
                className="form-control textarea-box"
                id="memo"
                cols="30"
                rows="10"
                value={memo}
                onChange={(e) => setMemo(e.target.value)}
              ></textarea>
            <Form.Group controlId="formFile" className="mb-3">
            <Form.Label className="mt-2">기억에 남는 사진 한장</Form.Label>
            <Form.Control type="file" />
            </Form.Group>
          </div>
        </section>
      </section>
      <FileInput />
      <Footer />
    </>
  )
}

export default Diary