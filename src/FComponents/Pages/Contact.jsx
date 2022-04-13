import React from 'react';
import { useState } from 'react';
import HeaderCard from '../../Icons/HeaderCard';
import AlertSuccess from '../../Icons/AlertSuccess';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../Styles/ContactPage.css";
import { useNavigate } from 'react-router-dom';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { collection, addDoc } from "firebase/firestore"; 
import db from "../utils/Firebase";
import { TextareaAutosize } from '@mui/material';

export default function Contact() {

    const navigate = useNavigate();
    //הודעות הצלחה וכישלון
    const [flagAlertError, setFlagAlertError] = useState(false);
    const [flagAlertSuccess, setFlagAlertSuccess] = useState(false);
    const s = "success";
    const e = "error";
    const messageS = "You have Signed up successfully, You can Login now";
    const messageE = "שגיאה! אחד או יותר מהפרטים שהזנת שגויים";

    const [alertSuccess, setAlertSuccess] = useState(false);
    const [alertError, setAlertError] = useState(false);

    const closeAlert = () => {
        setAlertError(false);
        setAlertSuccess(false);
    }


    const [email, setEmail] = useState('');
    const [subject, setSubject] = useState('');
    const [message, setMessage] = useState('');

    const sendEmail = () => {
        if(email.length < 7 || subject.length < 2 || message.length < 5){
            setAlertSuccess(false);
            setAlertError(true);
            return;
        }
        setAlertError(false);
        setAlertSuccess(true);
    }

     const sendMessage = (e) => {
         e.preventDefault();
        try {
            const docRef =  addDoc(collection(db, "ContactUs"), {
                email: email,
                subject: subject,
                message: message,
            });
            console.log('working');
            alert("thanks for contact us")
            navigate('/')
          } catch (e) {
            console.error("Error adding document: ", e);
          }
    }

    return (
        <div  style={{textAlign:'center', minHeight:'76vh'}}>

            <div className="FormContactUs">

                <div style={{display:'flex', flexDirection:'coloumn',marginLeft:'30%'}} className="Alerts">
                    {flagAlertSuccess ? <AlertSuccess message = {messageS} severityAlert = {s} closeAlert = {closeAlert} /> : null} 
                    {flagAlertError ? <AlertSuccess message = {messageE} severityAlert = {e} closeAlert = {closeAlert} /> : null}
                </div>

                <Form  onSubmit={sendMessage}>

                    
                    <h1 style={{fontFamily:'Cursive',color:'black'}}> <b><u> יצירת קשר</u></b></h1>

                    <div style={{fontFamily:'Cursive',color:'black', textAlign:'right',marginRight:'50px', fontWeight:'bold'}} >
                    :                אם יש לך שאלות נוספות, צור איתנו קשר <br />
                    0526489553   :    <PhoneIphoneIcon/>  <br />
                        infoShorted@gmail.com        :        <EmailIcon/>  <br />
                        0526458989 :שירות לקוחות בוואטספ <WhatsAppIcon/>  <br />

                          <b>↓↓</b>                      או השאר הודעה כאן
                    </div>

                    <Form.Group size="lg" controlId="email">
                        <Form.Label>:אימייל </Form.Label>
                        <Form.Control autoFocus type="email" placeholder=' אימייל '
                            onChange={(e) => setEmail(e.target.value)}/>
                    </Form.Group>

                    <Form.Group size="lg" >
                        <Form.Label>:נושא</Form.Label>
                        <Form.Control autoFocus type="text" placeholder='נושא'
                            onChange={(e) => setSubject(e.target.value)}/>
                    </Form.Group>


                    <Form.Group size="lg" >
                        <Form.Label className='lblMessage' > :הודעה</Form.Label>
                        <TextareaAutosize className='messageBox' onChange={(e) => setMessage(e.target.value)}  style={{minHeight:'55px'}}  placeholder='...כתוב לנו'/>
                    </Form.Group>
                    <br />
                    <Button style={{borderRadius:'5px',width:'150px'}} size="lg" type="submit" > שלח </Button>

                </Form>
            </div>
        </div>
    )
}
