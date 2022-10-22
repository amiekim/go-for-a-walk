import React, { useRef, useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faImage, faDeleteLeft } from '@fortawesome/free-solid-svg-icons'

const ImageFileInput = (props) => {
  const { setImgFile } = props;
  const { savedImgUrl, setSavedImgUrl } = props; //이미지 수정시에만 사용
  const { imageUploader, onFileChange } = props;
  const [tempImg, setTempImg] = useState(null);
  const inputRef = useRef();

  const onButtonClick = () => inputRef.current.click();

  const encodeFileToBase64 = (fileBlob) => {
    const reader = new FileReader();
    reader.readAsDataURL(fileBlob);
    return new Promise((resolve) => {
      reader.onload = () => {
        // 임시 이미지 보여주기
        setTempImg(reader.result);
        // 임시 이미지파일 저장
        setImgFile(fileBlob);
        // state savedImgUrl리펙토링 반드시 필요
        if(savedImgUrl) setSavedImgUrl(null);
        resolve();
      };
    });
  };

  const delTempImg = () => {
    inputRef.current.value = "";
    if(savedImgUrl) setSavedImgUrl(null);
    else {
      setTempImg(null);
      setImgFile(null);
    }
  }

  const onChange = (e) => {
    encodeFileToBase64(e.target.files[0]);
  }

  return (
    <div className='d-flex'>
      <input ref={inputRef} className='no-display' type="file" accept='image/*' name="file" onChange={onChange}/>
      <button className="btn box200 col-2" onClick={onButtonClick}>
        <FontAwesomeIcon icon={faImage} />
      </button>
      <div className='col-6'>
        {(savedImgUrl || tempImg) && (
        <div className="box200 img-bg-box">
          <button className='above-icon-align-left btn-no-border' onClick={delTempImg}>
            <FontAwesomeIcon className='f-size20' icon={faDeleteLeft} />
          </button>
          <img className="img-thumbnail" src={savedImgUrl || tempImg}/>
        </div>
        )}
      </div>
    </div>
  )
}

export default ImageFileInput