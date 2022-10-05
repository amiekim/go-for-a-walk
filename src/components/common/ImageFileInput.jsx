import React, { useRef } from 'react'
import { useState } from 'react';

const ImageFileInput = (props) => {
  const { imageUploader, onFileChange, updateImgInfo=()=>{} } = props
  const [imgFile, setImgFile] = useState(null)
  const inputRef = useRef();
  const onButtonClick = () => {
    inputRef.current.click();
  }
  const saveImg = async() => {
    const uploaded = await imageUploader.upload(imgFile)
    if(!uploaded || !uploaded.url) {
      alert("일시적인 오류입니다. 다시 사진을 저장해주세요.")
    } else {
      updateImgInfo(uploaded);
    }
  }
  const onChange= (e) => {
    setImgFile(e.target.files[0])
  }

  return (
    <div className='input-group mb-3'>
      <input ref={inputRef} className="form-control" type="file" accept='image/*' name="file" onChange={onChange}/>
      <button className="btn btn-outline-secondary" onClick={saveImg} disabled={!imgFile}>선택완료</button>
    </div>
  )
}

export default ImageFileInput