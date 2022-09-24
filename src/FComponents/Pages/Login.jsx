import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Checkbox } from '@mui/material';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AlertError from '../../Icons/AlertError';
import { FormControlLabel } from '@mui/material';
import "../../Styles/LoginPage.css";
import { collection, getDocs } from "firebase/firestore";
import db from "../utils/Firebase";
import ReCAPTCHA from "react-google-recaptcha";
import * as Validation from "../utils/Validation";


export default function Login() {
    

    var hash = require('hash.js');


    // Navigation
    const navigate = useNavigate();

    // Consts String 
    const checkText = "i'm not a robot";
    let messageE = "שגיאה! אחד או יותר מהפרטים שהזנת שגויים";
    const e = "error";

    // States
    const [alertError, setAlertError] = useState(false);
    const [robot, setRobot] = useState(false);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const closeAlert = () => {
        setAlertError(false);
    }

    // Variables
    let founduser = false;


    //Login Function
    const loginUser = async (event) => {
        event.preventDefault();
        try {
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                if (doc.data().email === email && doc.data().password === hash.sha256().update(password).digest('hex')) {
                    let user = { emailUser: email, passUser: password, type: doc.data().type, fullName: doc.data().firstName + " " + doc.data().lastName, phoneNumber: doc.data().phoneNumber }
                    sessionStorage.setItem('login_user', JSON.stringify(user));
                    founduser = true;
                    navigate('/Profile')
                }
            });
            
        }
        catch {
            alert("wrong")
        }
        if (founduser === false) {
            setAlertError(true);
        }
    }

    function validateForm() {
        if(Validation.validEmail(email) === false){
            return false;
        }
        if (Validation.validPassword(password) === false) {
            return false;
        }
        return robot;
    }

    const onChange = (value) => {
        console.log("Captcha value:", value);
        setRobot(true);
    }
    const keys = "6Leq1wciAAAAAN2xpfDg8IDuyILUfzrycoQWhLnn";


    return (
        <div style={{ textAlign: 'center', padding:'10px'}} >

            <div className="LoginForm">

                <Form onSubmit={loginUser}>

                    <div className="Alerts">
                        {alertError ? <AlertError message={messageE} severityAlert={e} closeAlert={closeAlert} /> : null}
                    </div>

                    <h1 style={{ fontFamily: 'calibri', color: 'black' }}> <b><u>התחברות</u></b></h1>

                    <Form.Group size="lg" controlId="email">
                        <Form.Label>:אימייל</Form.Label>
                        <Form.Control autoFocus type="email" placeholder='הכנס אימייל'
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group>

                    <Form.Group size="lg" controlId="password">
                        <Form.Label> :סיסמא</Form.Label>
                        <Form.Control type="password" placeholder='הכנס סיסמא'
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>


                    <ReCAPTCHA
                        style={{marginTop:'10px'}}
                        sitekey={keys}
                        onChange={onChange}
                        
                        size="normal"
                        theme="dark"
                        onChangeCapture={(t) => { console.log('t', t) }}
                       
                    />

                    <div className="buttonsLogin">
                        <Button type="submit" disabled={!validateForm()}> כניסה </Button>
                        <Button type='reset' value="reset" >נקה טופס</Button>
                    </div>

                    <div className="forgotPassword">
                        <button  onClick={() => navigate("/ForgotPass")} > ?שכחת סיסמא</button> <br />
                        <label className='lblSignUp' style={{fontSize:'16px'}}>?אין לך חשבון עדיין</label> 
                        <button style={{ marginTop: '25px', width: '65px'  }} onClick={() => navigate("/SignUp")} > לחץ כאן </button>
                    </div>

                </Form>

            </div>


        </div>
    )
}
