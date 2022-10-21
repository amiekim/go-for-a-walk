import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import dayjs from 'dayjs';

import Footer from '../Footer'
import Header from '../Header'
import { xssCheck } from "../../util/checkFunctions"


const Diary = (props) => {
  const { repositoryService, FileInput, imageUploader } = props
  const navigate = useNavigate();
  const { userInfo } = useSelector(state => state.loginReducer);
  const formRef = useRef();
  const titleRef = useRef();
  const memoRef = useRef();

  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [imgFile, setImgFile] = useState({});

  const saveImg = async() => {
    const uploaded = await imageUploader.upload(imgFile);
    if(!uploaded || !uploaded.url) {
      alert("일시적인 오류입니다. 다시 사진을 저장해주세요.");
    } else return uploaded;
  }
  const onSubmit = async(e) => {
    let imgResult = false;

    e.preventDefault();
      // 글 저장시 CLOUDINARY에 이미지 저장
      if(imgFile) imgResult = await saveImg();
      // for path
      let divTime = 0;
      const regTime = dayjs();
      const hourToSecond = regTime.hour() * 3600;
      const minuteToSecond = regTime.minute() * 60;
      const toSeconds = regTime.second();
      divTime =  `${regTime.format('MMMDD_YY')}_${hourToSecond + minuteToSecond + toSeconds}`;

      let diaryData = {};
      const chkTitle = xssCheck(title);
      const chkMemo = xssCheck(memo);
      if(regTime && userInfo && userInfo.userEmail) {
        diaryData = {
          divTime,
          regTime: regTime.format('YYYY-MM-DD HH:mm'),
          userEmail: userInfo.userEmail,
          title: chkTitle,
          memo: chkMemo,
          imgName: imgResult && imgResult.original_filename ? imgResult.original_filename : "",
          imgUrl: imgResult && imgResult.url ? imgResult.url : "",
        }
        const result = repositoryService.newDiary({...diaryData});
        if(result) navigate("/");
      } else alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
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
            <FileInput setImgFile={setImgFile} />
            </Form.Group>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant='outline-secondary' onClick={onSubmit}>저장</Button>
          </div>
        </section>
      </section>
      <Footer />
    </>
  )
}



export default Diary;




