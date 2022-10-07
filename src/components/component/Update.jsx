import React, { useState } from 'react'
import { useEffect, useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import dayjs from 'dayjs';

import Footer from '../Footer'
import Header from '../Header'
import {xssCheck} from "../../util/checkFunctions"


const Update = (props) => {
  const { repositoryService, FileInput, imageUploader } = props
  const { diaryIndex } = useParams();  
  const location = useLocation();
  const navigate = useNavigate();
  const titleRef = useRef();
  const memoRef = useRef();

  const { state } = location; 
  const [title, setTitle] = useState("");
  const [memo, setMemo] = useState("");
  const [imgFile, setImgFile] = useState(null);
  const [savedImgUrl, setSavedImgUrl] = useState(null);
  
  const userEmail = localStorage.getItem("userEmail");

  const saveImg = async() => {
    const uploaded = await imageUploader.upload(imgFile)
    if(!uploaded || !uploaded.url) {
      alert("일시적인 오류입니다. 다시 사진을 저장해주세요.");
    } else return uploaded;
  }
  const onSubmit = async(e) => {
    let imgResult = false;
    e.preventDefault();
      // 글 저장시 CLOUDINARY에 이미지 저장
      if(imgFile) imgResult = await saveImg();
      else if(savedImgUrl) {
        imgResult = {
          imgName:state.imgName || "",
          imgUrl:savedImgUrl
        }
      }

      // for path
      let divTime = 0;
      const regTime = dayjs();
  
      let diaryData = {};
      const chkTitle = xssCheck(title);
      const chkMemo = xssCheck(memo);
      if(diaryIndex && userEmail) {
        diaryData = {
          divTime: diaryIndex,
          userEmail,
          title: chkTitle,
          memo: chkMemo,
          imgName: imgResult && imgResult.original_filename ? imgResult.original_filename : "",
          imgUrl: imgResult && imgResult.url ? imgResult.url : "",
          updateTime: regTime.format('YYYY-MM-DD HH:mm'),
        }
        
        const result = await repositoryService.updateDiary({...diaryData});
        if(result) navigate("/");
      } else alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
  const delPage = async() => {
    if(diaryIndex && userEmail) {
      let diaryData = {
        divTime: diaryIndex,
        userEmail,
      }
      
      const result = repositoryService.delDiary({...diaryData});
      if(result) navigate("/");
    } else alert("일시적인 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
  }
  
  useEffect(() => {
    if(state) {
      setMemo(state.memo||"");
      setTitle(state.title||"");
      if(state.imgUrl) setSavedImgUrl(state.imgUrl);
    }
  },[])


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
            <FileInput setImgFile={setImgFile} savedImgUrl={savedImgUrl} setSavedImgUrl={setSavedImgUrl}/>
            </Form.Group>
          </div>
          <div className="d-flex justify-content-end">
            <Button variant='outline-danger mr2px' onClick={delPage}>삭제</Button>
            <Button variant='outline-secondary' onClick={onSubmit}>저장</Button>
          </div>
        </section>
      </section>
      
      <Footer />
    </>
  )
}



export default Update;




