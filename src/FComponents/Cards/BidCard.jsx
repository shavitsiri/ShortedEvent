import * as React from 'react';
import "../../Styles/Pages.css";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from "react-bootstrap/Button";
import { Input } from '@mui/material';
import "../../Styles/MyOffer.css";
import { collection, getDocs, doc, deleteDoc, addDoc } from "firebase/firestore";
import db from "../utils/Firebase"
import { useNavigate } from 'react-router-dom';


export default function BidCard(props) {

  //Navigation
  const navigate = useNavigate();

  //Functions
  const sendAnswerDecline = async () => {
    try {
      console.log("hii1");
      const querySnapshot = await getDocs(collection(db, "Bids"));
      querySnapshot.forEach(async (docEl) => {
        if (docEl.data().id === props.id) {
          await deleteDoc(doc(db, "Bids", docEl.id))
        }
      });
    }
    catch(e) {
      alert(e);
    }
  }

  const sendAnswerAccept = async () => {
    try {
      const docRef = addDoc(collection(db, "Deals"), {
        clientName: props.clientName,
        clientEmail: props.clientEmail,
        clientPhone: props.clientPhone,
        address: props.address,
        date: props.date,
        requireList: props.requireList,
        supllierType: props.supllierType,
        supllierPhone: props.supllierPhone,
        supllierName: props.supllierName,
        supllierEmail: props.supllierEmail,
        // commentFromSupllier : props.commentFromSupllier ,
        price: props.price
      });
      const querySnapshot = await getDocs(collection(db, "Bids"));
      querySnapshot.forEach(async (docEl) => {
        if (docEl.data().id === props.id) {
          const query = await getDocs(collection(db, "Tenders"));
          query.forEach(async (tender) => {
            if (tender.data().date === props.date && tender.data().email === props.clientEmail && tender.data().supllierType === props.supllierType && tender.data().id === props.id) {
              await deleteDoc(doc(db, "Tenders", tender.id));
            }
          })
          await deleteDoc(doc(db, "Bids", docEl.id))
        }
      });
      // sendAnswerDecline();
      navigate('/')
    }
    catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <div className="BidCard">
      <p>

        <b>מספר הזמנה: </b> {props.id} <br />
       

        <b>שם לקוח: </b> {props.clientName}<br />
        {props.clientEmail} <b>:אימייל לקוח</b><br />

        <b>שם ספק : </b> {props.supllierName} <br />
        {props.supllierEmail}<b> :אימייל ספק </b>  <br />

        <b> הערות נוספות מהספק: </b> {props.commentFromSupllier} <br />
        <b> מחיר: </b> {props.price} ש"ח <br />
      </p>
      <div style={{ display: 'flex', flexDirection: 'row' }} >
        <button style={{ paddingLeft: '15px', paddingRight: '15px', border: 'black solid 2px ', color: 'black', fontWeight: 'bold', backgroundColor: '#569FF2', margin: '10px', boxShadow: '-2px -2px 5px 5px #569FF2' }} onClick={sendAnswerAccept}  >אשר</button>
        <button style={{ paddingLeft: '15px', paddingRight: '15px', border: 'black solid 2px ', color: 'black', fontWeight: 'bold', backgroundColor: '#F5B758', margin: '10px', boxShadow: '-2px -2px 5px 5px #F5B758' }} onClick={sendAnswerDecline}  >סרב</button>
      </div>

      {/* <Popup trigger={<button>   מענה להצעת מחיר</button>} position="left center">
                        <div style={{boxShadow:'-2px 0px 5px 8px black',minHeight:'20vh', backgroundColor:'#D1D0D0',textAlign:'right',borderRadius:'10px',border:'black solid 2px ', fontSize:'20px'}}>
                            <label style={{marginTop:'15px',marginRight:'10px'}} htmlFor=""><b> : <u>  כתוב לספק </u> </b> </label> <br />
                            <Input style={{marginRight:'10px',marginLeft:'10px'}} type="text" ></Input> <br /> <br />
                            <div style={{ textAlign:'center'}} >
                                <Button style={{ border:'black solid 2px ',color:'black',fontWeight:'bold'}} onClick={sendAnswerAccept} type="submit">אשר</Button> &nbsp;
                                <Button style={{backgroundColor:'darkorange',border:'black solid 2px ',color:'black',fontWeight:'bold'}} onClick={sendAnswerDecline} type="decline">סרב</Button>
                            </div>
                            
                        </div>
                    </Popup>  */}
    </div>
  )
}
