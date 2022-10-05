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
  const [memo, setMemo] = useState("");
  const [imgFile, setImgFile] = useState({});
  const [confirmSave, setConfirmSave] = useState("");

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
  const updateImgInfo = (imgInfo) => {
    setImgFile(imgInfo);
    console.log("imgInfo::", imgInfo.url);
  }
  const onSubmit = (e) => {
    e.preventDefault();
    // for path
    if(confirmSave === userEmail) {
      let divTime = 0;
      const regTime = dayjs();
      const hourToSecond = regTime.hour() * 3600;
      const minuteToSecond = regTime.minute() * 60;
      const toSeconds = regTime.second();
      divTime =  `${regTime.format('MMMDD_YY')}_${hourToSecond + minuteToSecond + toSeconds}`;
  
      let result = false;
      let diaryData = {};
      const chkTitle = XSSCheck(title);
      const chkMemo = XSSCheck(memo);
      if(regTime && userEmail) {
        diaryData = {
          divTime,
          regTime: regTime.format('YYYY-MMM-DD HH:mm:ss'),
          userEmail,
          title: chkTitle,
          memo: chkMemo,
          imgName: imgFile.original_filename || "",
          imgUrl: imgFile.url || "",
        }
        repositoryService
        .newDiary({...diaryData});
        navigate("/");
      } else alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
    } else alert("로그인한 이메일과 다릅니다.");

  }

  return (
    <>
      <Header />
      <section className="bg-light">
        <section className="container defalt-height">
          <div className="d-flex justify-content-end mt-2">
          <div class="input-group mb-3">
            <input type="text" class="form-control" placeholder="이메일을 입력하고 일기 저장하기" onChange={(e) => setConfirmSave(e.target.value)}/>
            <Button variant='outline-secondary' onClick={onSubmit}>저장</Button>
          </div>
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
            <FileInput updateImgInfo={updateImgInfo}/>
            </Form.Group>
          </div>
        </section>
      </section>
      
      <Footer />
    </>
  )
}



export default Diary;




