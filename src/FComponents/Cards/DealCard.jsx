import React, { useState } from 'react';
import "../../Styles/MyDeals.css";
import ReactStars from "react-rating-stars-component";
import db from "../utils/Firebase";
import { collection, addDoc, getDocs, updateDoc, doc } from "firebase/firestore";
import { SecurityUpdateWarningTwoTone } from '@mui/icons-material';


export default function (props) {
  const { clientName, clientEmail, supllierName, supllierEmail, price, commentFromSupllier, supllierPhone, address, supllierType, clientPhone, date, requireList } = props;
  let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`));
  let rateObj;
  const [rate, setRate] = useState();
  let rateTemp = 0;

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setRate(newRating);
    rateTemp = newRating;
    addRate();
  };

  // Functions 
  const addRate = async () => {
    console.log(rateTemp);
    let exist = false;
    try {
      const querySnapshot = await getDocs(collection(db, "Rates"));
      querySnapshot.forEach(async (docEl) => {
        if (docEl.data().rater === sessionUser.emailUser && docEl.data().supllierEmail === supllierEmail) {
          exist = true;
          rateObj = {
            rater: sessionUser.emailUser,
            supllierEmail: supllierEmail,
            rate: rateTemp,
          }
          updateRate(docEl.id)
        }
      })
      if (!exist) {
        const docRef = addDoc(collection(db, "Rates"), {
          rater: sessionUser.emailUser,
          supllierEmail: supllierEmail,
          rate: rateTemp,
        });
      }
    }
    catch (errorCode) {
      console.log(errorCode.code);
    }
  }

  const updateRate = async (rateId) => {
    const rateDoc = doc(db, "Rates", rateId);
    await updateDoc(rateDoc, rateObj);
  }


  return (
    <div className="DealCard">
      <p>
        {/* <b>שם מלא: </b> {fullName} <br/> 
          {email}<b>: אימייל</b>  <br/>  */}

        <b>שם לקוח: </b> {clientName}<br />
        {clientEmail} <b>:אימייל לקוח</b><br />
        {clientPhone}<b> :טלפון לקוח </b>  <br />
        <b>שם ספק : </b> {supllierName} <br />
        {supllierEmail}<b> :אימייל ספק </b>  <br />


        {supllierPhone}<b> :טלפון ספק </b>  <br />
        <b> כתובת: </b> {address}<br />
        <b> תאריך: </b> {date}<br />

        <b> סוג ספק: </b> {supllierType}<br />


        {/* <b> רשימת דרישות: </b> {requireList.map((req) => <span  >{req.label}, </span>   )} <br/> */}
        <b> רשימת דרישות: </b> {requireList} <br />

        <b> הערות נוספות מהספק: </b> {commentFromSupllier} <br />
        <b> מחיר: </b> {price}  ש"ח <br />
      </p>
      <label htmlFor=""> דרג ספק </label>
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        activeColor="#ffd700"
      />


    </div>
  )
}
