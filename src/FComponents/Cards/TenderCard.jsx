import * as React from 'react';
import "../../Styles/CardTender.css";
import { useEffect,useState } from 'react';

import { collection, addDoc } from "firebase/firestore"; 
import db from "../utils/Firebase";

import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import Button from "react-bootstrap/Button";
import { Input } from '@mui/material';


export default function TenderCard(props) {

    const [price, setPrice] = useState(0);
    const [commentFromSupllier, setCommentFromSupllier] = useState('');
    const [supllierPhone, setSupllierPhone] = useState('');
    

    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
    let supllier = false;

    if(sessionUser.type !== 'לקוח' && sessionUser.type !== 'מנהל'){
        supllier = true;
    }

    const sendOffer = (e) => {
        e.preventDefault();
            try {
                const docRef =  addDoc(collection(db, "Bids"), {
                    clientName: fullName,
                    clientEmail: email,
                    phoneNumber:phoneNumber,
                    adress: city + " " + street + " " + houseNumber,
                    requireList: requireList,
                    supllierName: sessionUser.fullName,
                    supllierEmail: sessionUser.emailUser,
                    price : price,
                    id: id,
                    date: date,
                    supllierPhone:supllierPhone,
                    commentFromSupllier : commentFromSupllier
                });
                alert("הצעת המחיר נשלחה בהצלחה")
                } 
            catch (e) {
                console.error("Error adding document: ", e);
                }
    }


     const {fullName, email,city,date,houseNumber,phoneNumber,street,supllierType,changeToSenfOffer,requireList,comment,id} = props;

    return (
            <div className="TenderCard">
                <p>
                     <b>שם מלא: </b> {fullName} <br/> 
                      {email}<b>: אימייל</b>  <br/> 
                       
                    <b>מספר: </b> {id}<br/>
                    <b>עיר: </b> {city}<br/>
                    <b>רחוב: </b>{street} <br/>
                    <b>מספר בית: </b> {houseNumber} <br/>
                    <b>תאריך : </b> {date} <br/>
                    <b>מספר טלפון: </b> {phoneNumber} <br/>
                    <b>סוג ספק: </b> {supllierType} <br/>
                    <b> רשימת דרישות: </b> {requireList} <br/>
                    <b>  הערות: </b> {comment} <br/>

                    
                </p>
                {supllier? <Popup trigger={<button> שלח הצעת מחיר</button>} position="right center">
                        <div style={{minHeight:'30vh',backgroundColor:'pink',textAlign:'right',border:'black solid 5px ',fontFamily:'cursive', fontSize:'20px'}}>
                            <label style={{marginTop:'15px',marginRight:'10px'}}  htmlFor=""><b> :מחיר </b> </label> <br />
                            <Input style={{width:'75%',marginRight:'10px'}} type="numbers"onChange={(e) => setPrice(e.target.value)} ></Input>  
                            <label style={{marginTop:'15px',marginRight:'10px'}} htmlFor=""><b> :הערות נוספות </b> </label> <br />
                            <Input style={{width:'75%',marginRight:'10px'}} type="numbers" onChange={(e) => setCommentFromSupllier(e.target.value)} ></Input> <br /> <br />
                            
                            <label style={{marginTop:'15px',marginRight:'10px'}} htmlFor=""><b> : מספר טלפון </b> </label> <br />
                            <Input style={{width:'75%',marginRight:'10px'}} type="numbers" onChange={(e) => setSupllierPhone(e.target.value)} ></Input> <br /> <br />
                            
                            
                            <Button onClick={sendOffer} type="submit">שלח</Button>
                        </div>
                    </Popup>  : null} 
            </div>
    )
}
