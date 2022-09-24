import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import * as Validation from "../utils/Validation";
import "../../Styles/SignUp.css";
import { collection, addDoc } from "firebase/firestore";
import db from "../utils/Firebase";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../utils/Firebase';
import Alert from '../../Icons/Alert';
import ReactJsAlert from "reactjs-alert";

export default function SignUp() {

    var hash = require('hash.js');

    //Alert States
    const [statusAlert, setStatusAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState("success");
    const [titleAlert, setTitleAlert] = useState("This is a alert");

    // Navigation
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login')
    }

    // שינוי תצוגת שדה הקליטה בעט לחיצה
    const [name, setName] = useState('');
    const handleChange = (event) => {
        setName(event.target.value);
    }

    // Consts Strings
    const s = "success";
    const e = "error";
    const messageS = "You have Signed up successfully, You can Login now";
    const messageE = "שגיאה! אחד או יותר מהפרטים שהזנת שגויים";
    const options = [{ value: 'קייטרינג', label: 'קייטרינג' }, { value: 'דיגיי', label: 'דיגיי' }, { value: 'בר', label: 'בר' }, { value: 'ציוד', label: 'ציוד' },];
    const optionsTypeUser = [{ value: 'לקוח', label: 'לקוח' }, { value: 'ספק', label: 'ספק' }];
    const [error, setError] = useState(false);

    // Alerts States
    const [flagAlertError, setFlagAlertError] = useState(false);
    const [flagAlertSuccess, setFlagAlertSuccess] = useState(false);
    // Inputs States
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [supllier, setSupllier] = useState(false);
    const [client, setClient] = useState(false);

    // Functions 
    const register = async (e) => {
        e.preventDefault();
        try {
            if (validation()) {
                const user2Auth = await createUserWithEmailAndPassword(auth, email, password);
                console.log(user2Auth);
                const docRef = addDoc(collection(db, "Users"), {
                    firstName: firstName,
                    lastName: lastName,
                    phoneNumber: phoneNumber,
                    email: email,
                    password: hash.sha256().update(password).digest('hex'),
                    type: type,
                });
                console.log("Document written with ID: ", docRef.id);
                let user = { emailUser: email, passUser: password, type: type, fullName: firstName + " " + lastName, phoneNumber: phoneNumber };
                sessionStorage.setItem('login_user', JSON.stringify(user));
                navigate('/Profile');
            }
        }
        catch (errorCode) {
            setError(!error);
            console.log(errorCode.code);
            if (errorCode.code === "auth/email-already-in-use") {
                setStatusAlert(true);
                setTypeAlert('warning');
                setTitleAlert('האימייל כבר קיים במערכת');
                // alert("האימייל כבר קיים במערכת")
            }
            else {
                alert(errorCode.code)
            }
        }
    }

    const closeAlert = () => {
        setFlagAlertError(false);
        setFlagAlertSuccess(false);
    }

    useEffect(() => {
        if (client === true) {
            setType("לקוח");
            setSupllier(false);
        }
        else {
            setClient(false);
        }
    }, [client] || [supllier])


    const validation = () => {
        if (Validation.validFirstName(firstName) === false || Validation.validFirstName(lastName) === false) {
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('שם פרטי ושם משפחה חייבים להכיל אותיות בעברית');
            return false;
        }
        if(Validation.validPhoneNumber(phoneNumber) === false){
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('מספר טלפון חייב להכיל 10 מספרים ללא אותיות/תווים');
            return false;
        }
        if(Validation.validEmail(email) === false){
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('האימייל לא תקין');
            return false;
        }
        if (Validation.validPassword(password) === false) {
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('הסיסמא חייבת להכיל לפחות 6 תווים');
            return false;
        }
        if(type === null || type === undefined || type === ''){
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('חייב לבחור סוג משתמש');
            return false;
        }
        if(type === 'ספק'){
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('חייב לבחור סוג ספק');
            return false;
        }
        return true;
    }


    return (

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }} >
            <div className="SignUpForm">
                <div className='form' >
                    <Form >
                        <ReactJsAlert
                            status={statusAlert} // true or false
                            type={typeAlert} // success, warning, error, info
                            title={titleAlert}
                            Close={() => setStatusAlert(false)}
                        />
                        <h2 style={{ fontFamily: 'Cursive' }}> <b><u>טופס הרשמה</u></b></h2>

                        <Form.Group size="lg" controlId="firstName">
                            <Form.Label>:שם פרטי</Form.Label>
                            <Form.Control className="w-50" autoFocus type="text" placeholder='הכנס שם פרטי'
                                onChange={e => setFirstName(e.target.value)} />
                        </Form.Group>

                        <Form.Group size="lg" controlId="LastName">
                            <Form.Label>:שם משפחה</Form.Label>
                            <Form.Control className="w-50" autoFocus type="text" placeholder='הכנס שם משפחה'
                                onChange={e => setLastName(e.target.value)} />
                        </Form.Group>

                        <Form.Group size="lg" controlId="phoneNumber">
                            <Form.Label>:מספר טלפון</Form.Label>
                            <Form.Control className="w-50" autoFocus type="numbers" placeholder='הכנס מספר'
                                onChange={(e) => setPhoneNumber(e.target.value)} />
                        </Form.Group>

                        <Form.Group size="lg" controlId="email">
                            <Form.Label>:אימייל</Form.Label>
                            <Form.Control className="w-50" autoFocus type="email" placeholder='הכנס אימייל'
                                onChange={(e) => setEmail(e.target.value)} />
                        </Form.Group>

                        <Form.Group size="lg" controlId="password">

                            <Form.Label> :סיסמא</Form.Label> <Form.Control className="w-50 " type="password" placeholder='הכנס סיסמא'
                                onChange={(e) => setPassword(e.target.value)} />
                        </Form.Group>
                        <br />
                        <Form.Group style={{ marginLeft: '15%' }} size="lg" controlId="type" >
                            <Form.Label> :סוג </Form.Label>
                            <Select className="w-50" style={{}} label='בחר' options={optionsTypeUser} onChange={e => setType(e.value)} />
                        </Form.Group>
                        <br />
                        {type !== 'לקוח' && type !== '' ? <div style={{ marginLeft: '15%' }}>
                            <Select className="w-50" label='בחר' options={options} onChange={e => setType(e.value)} />
                        </div> : null}

                        <div style={{ marginLeft: '15%', display: 'flex', flexDirection: 'row', margin: '5px', padding: '10px' }} >
                            <Button onClick={(e) => register(e)} size="lg" type="submit" > הירשם </Button>
                            <Button size="lg" type='reset' value="reset" > נקה טופס </Button>
                        </div>
                    </Form>
                </div>

                <div className='nearForm'  >
                    <p style={{ fontSize: '28px' }}>ShortedEvent ברוכים הבאים ל</p>
                    <p>?יש לך כבר משתמש קיים</p>

                    <Button onClick={goToLogin} >לחץ כאן</Button>
                    <br />
                    <p style={{ fontSize: '16px', color: 'black' }} >0526458989 :שירות לקוחות בוואטספ <WhatsAppIcon /></p>
                </div>
            </div>
        </div>

    )
}

