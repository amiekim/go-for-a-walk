import React, { useRef } from 'react'

const ImageFileInput = (props) => {
  const { imageUploader, onFileChange } = props
  const inputRef = useRef();
  const onButtonClick = () => {
    inputRef.current.click();
  }
  const onChange = async(event) => {
    const uploaded = imageUploader.upload(event.target.files[0])
    console.log(uploaded,"...")
    // onFileChange({
    //   name: "fileName",
    //   url:""
    // });
    
  }

  return (
    <div>
      <input ref={inputRef} type="file" accept='image/*' name="file" onChange={onChange}/>
      <button onClick={onButtonClick}>확인</button>
    </div>
  )
}

export default ImageFileInput