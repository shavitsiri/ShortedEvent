import React, { useState } from "react";
import ReactRoundedImage from "react-rounded-image";
import Popup from 'reactjs-popup';
// import ImageUploader from 'react-image-upload';
// import 'react-image-upload/dist/index.css';
import ImageUpload from 'image-upload-react';
import 'image-upload-react/dist/index.css';

import Avatar from 'react-avatar-edit';


export default function RoundedImage(props) {

  const [src, setSrc] = useState(null);
  const [priview, setPriview] = useState(null);

  const savePicture = () => {

  }

  const onClose = () => {
      savePicture();
      setAddPic(true);
  }

  const onCrop = (view) => {
      setPriview(view);
  }

  const [imageSrc, setImageSrc] = useState(null)

  const handleImageSelect = (e) => {
    console.log(e.target.files[0]);
    setImageSrc(URL.createObjectURL(e.target.files[0]))
    props.imageUser = e.target.files[0];
  }

  const [addPic, setAddPic] = useState(false);
  const setProfilePicture = () => {
    console.log("hoooodsa");
  }

  const getImageFileObject = (imageFile) => {
    console.log({ imageFile });
  }

  return (
    <div style={{ display: "flex",flexDirection:'column', cursor: 'pointer' , marginTop:'15px'}} >
      {props.imageUser !== null ? <ReactRoundedImage image={props.imageUser} roundedColor='white' roundedSize="13" onClick={() => setAddPic(!addPic)} /> : <ReactRoundedImage image={priview} roundedColor='white' roundedSize="13" onClick={() => setAddPic(!addPic)}/>}
      {addPic ? null : <Avatar 
            width={400}
            height={300}
            onCrop={onCrop}
            onClose={onClose}
            src={src}
            />}
      
      {/* <ImageUpload 
        handleImageSelect={handleImageSelect}
        imageSrc={imageSrc}
        setImageSrc={setImageSrc}
        style={{
          width: 50,
          height: 50,
          background: 'red'
        }}
      /> */}

    </div>
  )
}
