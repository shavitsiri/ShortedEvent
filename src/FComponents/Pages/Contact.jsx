import { React, useState, useRef } from 'react';
import AlertSuccess from '../../Icons/AlertSuccess';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../Styles/ContactPage.css";
import { useNavigate } from 'react-router-dom';
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import { collection, addDoc} from "firebase/firestore";
import db from "../utils/Firebase";
import { TextareaAutosize } from '@mui/material';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import Select from 'react-select';
import options from '../utils/options';


export default function Contact() {

     // Navigation
    const navigate = useNavigate();

    //הודעות הצלחה וכישלון
    const [flagAlertError, setFlagAlertError] = useState(false);
    const [flagAlertSuccess, setFlagAlertSuccess] = useState(false);
    const s = "success";
    const e = "error";
    const messageS = "פנייתך נקלטה בהצלחה, נחזור אליך בהקדם ";
    const messageE = "שגיאה! אחד או יותר מהפרטים שהזנת שגויים";

    const closeAlert = () => {
        setFlagAlertError(false);
        setFlagAlertSuccess(false);
    }

    const email = useRef('');
    const [subject, setSubject] = useState('');
    const message = useRef('');

    const validateForm = () => {
        if (email.current.value.length > 5 && message.current.value.length > 4) {
            return true;
        }
        return false;
    }

    const sendMessage = (e) => {
        e.preventDefault();
        if (validateForm()) {
            try {
                const docRef = addDoc(collection(db, "ContactUs"), {
                    email: email.current.value,
                    subject: subject,
                    message: message.current.value,
                });
                setFlagAlertSuccess(true);
                setFlagAlertError(false);
            } catch (e) {
                console.error("Error adding document: ", e);
            }
        }
        else {
            setFlagAlertSuccess(false);
            setFlagAlertError(true);
        }
    }

    return (
        <div className='ContactBody'>

            <div className="FormContactUs">

                <div className="Alerts">
                    {flagAlertSuccess ? <AlertSuccess message={messageS} severityAlert={s} closeAlert={closeAlert} /> : null}
                    {flagAlertError ? <AlertSuccess message={messageE} severityAlert={e} closeAlert={closeAlert} /> : null}
                </div>

                <Form onSubmit={sendMessage}>
                    <h2 > <b><u> יצירת קשר</u></b></h2>
                    <div className='ContactWays' >
                        :                אם יש לך שאלות נוספות, צור איתנו קשר <br />
                        0526489553   :    <PhoneIphoneIcon />  <br />
                        infoShorted@gmail.com        :        <EmailIcon />  <br />
                        0526458989 :שירות לקוחות בוואטספ <WhatsAppIcon />  <br />

                        <ArrowDownwardIcon />                   או השאר הודעה כאן
                    </div>
                    <div className="contactFormBody">
                        <Form.Group size="lg" controlId="email">
                            <Form.Label>:אימייל </Form.Label>
                            <Form.Control autoFocus type="email" placeholder='אימייל '
                                ref={email} />
                        </Form.Group>

                        <div className='selectSubject'>
                        <Form.Group size="lg" >
                            <Form.Label>:נושא </Form.Label>
                            <Select className='selectCss' value={'בחר'} label='בחר' options={options.optionsSubject} onChange={e => setSubject(e.value)}/>
                        </Form.Group>
                        </div>


                        <Form.Group size="lg" >
                            <Form.Label className='lblMessage' > :הודעה</Form.Label>
                            <TextareaAutosize className='messageBox' ref={message} style={{ minHeight: '55px' }} placeholder='...כתוב לנו' />
                        </Form.Group>
                        <br />
                        <Button size="lg" type="submit" > שלח </Button>
                    </div>
                </Form>
            </div>
        </div>
    )
}
