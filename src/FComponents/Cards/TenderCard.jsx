import * as React from 'react';
import "../../Styles/CardTender.css";
import { useEffect, useState } from 'react';
import { collection, addDoc, getDocs, deleteDoc, doc } from "firebase/firestore";
import db from "../utils/Firebase";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { Input, Button } from '@mui/material';
import ReactJsAlert from "reactjs-alert";



export default function TenderCard(props) {
    const { fullName, email, city, date, houseNumber, phoneNumber, street, supllierType, changeToSenfOffer, requireList, comment, id, showTenders } = props;
    const [price, setPrice] = useState(0);
    const [commentFromSupllier, setCommentFromSupllier] = useState('');
    const [supllierPhone, setSupllierPhone] = useState('');
    const [sentOffer, setSentOffer] = useState(false);

    //Alert States
    const [statusAlert, setStatusAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState("success");
    const [titleAlert, setTitleAlert] = useState("This is a alert");


    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
    const [supllier, setSupllier] = useState(false);



    const sendOffer2Client = (e) => {
        e.preventDefault();
        console.log("im send offer");
        console.log(price);
        console.log(sessionUser.phoneNumber);
        console.log(supllierType);
        console.log(id);
        try {
            const docRef = addDoc(collection(db, "Bids"), {
                clientName: fullName,
                clientEmail: email,
                phoneNumber: phoneNumber,
                address: city + " " + street + " " + houseNumber,
                requireList: requireList,
                supllierName: sessionUser.fullName,
                supllierEmail: sessionUser.emailUser,
                price: price,
                id: id,
                date: date,
                supllierPhone: sessionUser.phoneNumber,
                commentFromSupllier: commentFromSupllier,
                supllierType: supllierType
            });
            setSentOffer(true);
            setStatusAlert(true);
            setTypeAlert('success');
            setTitleAlert('הצעת המחיר נשלחה בהצלחה');
        }
        catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const DeleteTender = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Tenders"));
            querySnapshot.forEach(async (docEl) => {
                if (docEl.data().id === id) {
                    await deleteDoc(doc(db, "Tenders", docEl.id))
                }
            });
            showTenders();
        }
        catch (e) {
            alert(e)
        }
    }

    useEffect(() => {
        if (sessionUser.type !== 'לקוח' && sessionUser.type !== 'מנהל') {
            setSupllier(true);
        }
    }, [])

    console.log(date);


    return (
        <div className="TenderCard">
            <ReactJsAlert
                            status={statusAlert} // true or false
                            type={typeAlert} // success, warning, error, info
                            title={titleAlert}
                            Close={() => setStatusAlert(false)}
                        />
            <div>
                <label style={{ fontSize: '24px' }} > <b>   מספר אסמכתא:  </b> {id} </label> <br />
                <b>שם מלא: </b> {fullName} <br />
                {email}<b>: אימייל</b>  <br />
                <b>עיר: </b> {city}<br />
                <b>רחוב: </b>{street} <br />
                <b>מספר בית: </b> {houseNumber} <br />
                <b>תאריך : </b> {date} <br />
                <b>מספר טלפון: </b> {phoneNumber} <br />
                <b>סוג ספק: </b> {supllierType} <br />
                <b> רשימת דרישות: </b> {requireList} <br />
            </div>
            {supllier ? <Popup className='popUp' trigger={<button> שלח הצעת מחיר</button>} position="right center">
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', minHeight: '25vh', backgroundColor: 'pink', border: 'black solid 2px ', fontFamily: 'cursive', fontSize: '20px' }}>
                    <label style={{ marginTop: '15px', marginRight: '10px' }} htmlFor=""><b> :מחיר </b> </label>
                    <Input style={{ width: '75%', marginRight: '10px' }} type="numbers" onChange={(e) => setPrice(e.target.value)} ></Input>
                    <label style={{ marginTop: '15px', marginRight: '10px' }} htmlFor=""><b> :הערות נוספות </b> </label>
                    <Input style={{ width: '75%', marginRight: '10px' }} type="numbers" onChange={(e) => setCommentFromSupllier(e.target.value)} ></Input>
                    <Button onClick={(e) => sendOffer2Client(e)} > שלח </Button>
                    {/* <Popup trigger={<button style={{ marginTop: '10px' }} onClick={(e)=>sendOffer2Client(e)} >שלח</button>} position="right center">
                        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '35vh', backgroundColor: 'lightgreen', border: 'black solid 2px ', fontFamily: 'cursive', fontSize: '20px' }}>
                            <label style={{ padding: '25px' }} ><b> הצעת המחיר נשלחה בהצלחה</b> </label>
                        </div>
                    </Popup> */}

                </div>
            </Popup> : null}

            {!supllier ? <button className='BtnDeleteTender' onClick={() => DeleteTender()} >  מחק  </button> : null}
        </div>
    )
}
