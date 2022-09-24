import React, { useRef } from 'react';
import emailjs from '@emailjs/browser';
import '../../Styles/ForgotPass.css';
import { collection, getDocs } from "firebase/firestore";
import db from "../utils/Firebase";
import { useState } from 'react';
import { Button } from 'bootstrap';

export default function ForgotPass() {


    const flag = false;
    const [robot, setRobot] = useState(true);
    const [emailInput, setEmailInput] = useState('');
    const [emailSent, setEmailSent] = useState(false);
    const [passwordClient, setPasswordClient] = useState('');
    const [foundEmail, setFoundEmail] = useState(false);

    const sendEmailWithPass = (e) => {
        e.preventDefault();
        setEmailSent(true);
        let template_params = {
            to_email: emailInput,
            password: passwordClient
        }
        emailjs.send('gmail', 'template_uwlq34o', template_params, 'r6GIZLF8WiCYvWslA')
            .then((result) => {
                console.log(result.text);
            }, (error) => {
                console.log(error.text);
            });
    }


    const getPassToEmail = async (emailTarget) => {
        try {
            console.log(emailTarget);
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                if (doc.data().email === emailTarget) {
                    setEmailInput(emailTarget)
                    setPasswordClient(doc.data().password);
                    setFoundEmail(true);
                }
            });
        }
        catch (e) {
            alert(e)
        }
    }

    console.log(passwordClient);

    return (
        <div className='Main' >
            <div className="FormForgotPass">
                <label> ? שכחת את הסיסמא </label>
                <label> הכנס את האימייל שלך ותקבל את הסיסמא שלך למייל </label>
                <form onSubmit={sendEmailWithPass}>
                    <input type="text" name="to_email" id="to_email" style={{ textAlign: 'right', marginTop: '10px' }} onChange={(e) => getPassToEmail(e.target.value)} placeholder='הכנס אימייל' />
                    {/* <input type="text" name="password" id="password" defaultValue={passwordClient} onChange={(e) => console.log(e.target.value)} /> */}
                    <br />
                    <label  htmlFor="checkbox"> אני לא רובוט </label>
                    <input  disabled={!foundEmail} placeholder='אני לא רובוט'  type='checkbox' onClick={() => setRobot(!robot)}   /> 
                    <br />
                    <button disabled={robot} style={{ marginTop: '10px' }} type="submit"> שחזר סיסמא </button>
                </form>
            </div>

        </div>
    )
}
