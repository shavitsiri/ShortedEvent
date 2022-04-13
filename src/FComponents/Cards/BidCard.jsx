import * as React from 'react';
import "../../Styles/Pages.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from "react-bootstrap/Button";
import { Input } from '@mui/material';

import { collection, getDocs, doc, deleteDoc , addDoc} from "firebase/firestore"; 
import db from "../utils/Firebase"


export default function BidCard(props) {

  const sendAnswerAccept =  (e) => {
    console.log("hii");
    e.preventDefault();
      try {
          const docRef =  addDoc(collection(db, "Deals"), {
            clientName : props.clientName,
            clientEmail: props.clientEmail,
            supllierName: props.supllierName,
            supllierEmail : props.supllierEmail,
            commentFromSupllier : props.commentFromSupllier ,
            price: props.price
          });
          } 
      catch (e) {
          console.error("Error adding document: ", e);
          }
    
  }

  const sendAnswerDecline = async (event) => {
    event.preventDefault();
    try{
      console.log("hii1");
      const querySnapshot = await getDocs(collection(db, "Bids"));
      querySnapshot.forEach(async(docEl) => {
          if(docEl.data().id === props.id){
              await deleteDoc(doc(db,"Bids",docEl.id))
          }
      });
  }
  catch{
      alert("wrong")
  }
  }

  return (
            <div className="TenderCard">
                <p>
                     {/* <b>שם מלא: </b> {fullName} <br/> 
                      {email}<b>: אימייל</b>  <br/>  */}
                       
                    <b>שם לקוח: </b> {props.clientName}<br/>
                    {props.clientEmail} <b>:אימייל לקוח</b><br/>
                    
                    <b>שם ספק : </b> {props.supllierName} <br/>
                    {props.supllierEmail}<b> :אימייל ספק </b>  <br/>
                    
                    <b> הערות נוספות מהספק: </b> {props.commentFromSupllier} <br/>
                    <b> מחיר: </b> {props.price} <br/>
                </p>
                <Popup trigger={<button>   מענה להצעת מחיר</button>} position="right center">
                        <div style={{minHeight:'30vh',backgroundColor:'pink',textAlign:'right',border:'black solid 5px ',fontFamily:'cursive', fontSize:'20px'}}>
                            <label style={{marginTop:'15px',marginRight:'10px'}} htmlFor=""><b> : כתוב לספק </b> </label> <br />
                            <Input style={{width:'75%',marginRight:'10px'}} type="numbers" ></Input> <br /> <br />
                            <Button onClick={sendAnswerAccept} type="submit">אשר</Button> &nbsp;
                            <Button style={{backgroundColor:'darkorange'}} onClick={sendAnswerDecline} type="decline">סרב</Button>
                        </div>
                    </Popup> 
            </div>
  )
}
