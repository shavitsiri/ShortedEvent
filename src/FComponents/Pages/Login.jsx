import React from 'react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCard from '../../Icons/HeaderCard';
import { Checkbox } from '@mui/material';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AlertSuccess from '../../Icons/AlertSuccess';
import AlertError from '../../Icons/AlertError';
import { FormControlLabel } from '@mui/material';
import "../../Styles/LoginPage.css";
import { collection, getDocs } from "firebase/firestore"; 
import db from "../utils/Firebase"
import { Box } from '@mui/system';
import { TextField } from '@mui/material';
// import { CheckBoxComponent } from '@syncfusion/ej2-react-buttons';


export default function Login() {

    let founduser = false;
    const navigate = useNavigate();

    const checkText = "i'm not a robot";
    const [robot, setRobot] = useState(false);

    //הודעות הצלחה וכישלון
    const [flagAlertError, setFlagAlertError] = useState(false);
    const [flagAlertSuccess, setFlagAlertSuccess] = useState(false);
    const s = "success";
    const e = "error";
    let messageS = "You have Signed up successfully, You can Login now";
    let messageE = "שגיאה! אחד או יותר מהפרטים שהזנת שגויים";

    const closeAlert = () => {
        setFlagAlertError(false);
        setFlagAlertSuccess(false);
    }

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleChange = (event) => {
        setName(event.target.value);
    }
   

     const loginUser = async  (event) => {
        event.preventDefault();
        try{
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                if(doc.data().email === email && doc.data().password === password){
                    let user = {emailUser:email, passUser:password, type: doc.data().type, fullName: doc.data().firstName+" "+doc.data().lastName, phoneNumber: doc.data().phoneNumber}
                    sessionStorage.setItem('login_user', JSON.stringify(user));
                    founduser = true;
                    navigate('/Profile')
                }
            });
        }
        catch{
            alert("wrong")
        }
        if(founduser === false){
            setFlagAlertError(true);
        }
        
     }

    function validateForm() {
        return robot
      }
    

    return (
        <div style={{textAlign:'center', minHeight:'76vh'}} >
           
            <div className="LoginForm">
            
            <div style={{marginLeft:'30%'}} className="Alerts">
                {flagAlertSuccess ? <AlertSuccess message = {messageS} severityAlert = {s} closeAlert = {closeAlert} /> : null} 
                {flagAlertError ? <AlertError message = {messageE} severityAlert = {e} closeAlert = {closeAlert} /> : null}
            </div>
              
            

            <Form  onSubmit={loginUser}>

                <h1 style={{fontFamily:'calibri',color:'black'}}> <b><u>התחברות</u></b></h1>
            
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

                    
                    <Form.Group className="mb-1">
                        <FormControlLabel control={<Checkbox  />} label="אני לא רובוט" onChange={e => setRobot(!robot)} />
                    </Form.Group>

                    <div className="buttonsLogin">
                        <Button type="submit" disabled={!validateForm()}> כניסה </Button>
                        <Button type='reset' value="reset" >נקה טופס</Button>
                    </div>

                    <div className="forgotPassword">
                        <button  > ?שכחת סיסמא</button> <br />
                        <label className='lblSignUp' >?אין לך חשבון עדיין</label> <button style={{marginTop:'25px',width:'65px'}} > לחץ כאן </button>
                        
                    </div>

                    <hr />

                    {/* <div className="GosignUp">
                        <label className='lblSignUp' htmlFor="">?אין לך חשבון עדיין</label>
                        <Button type='reset' value="reset" >לחץ כאן</Button>
                        
                    </div> */}
                    

                    
                    
            </Form>

            </div>


        </div>
    )
}
