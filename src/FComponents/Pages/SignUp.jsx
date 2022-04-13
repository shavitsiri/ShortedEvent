import React, { useMemo } from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import AlertSuccess from '../../Icons/AlertSuccess';
import { drawerClasses, FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import * as Validation from "../utils/Validation";
import "../../Styles/SignUp.css";
import { collection, addDoc } from "firebase/firestore"; 
import db from "../utils/Firebase";


export default function SignUp() {
    // ניווט בין עמודים 
    const navigate = useNavigate();
    const goToLogin = () => {
        navigate('/login')
    }
    
    // שינוי תצוגת שדה הקליטה בעט לחיצה
    const [name, setName] = useState('');
    const handleChange = (event) => {
    setName(event.target.value);
    }

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



    // סטייטים לקליטת הפרמטרים מהשדות
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [supllier, setSupllier] = useState(false);
    const [client, setClient] = useState(false);

    // פונקציה להוספת משתמש 
    const Push = (e) => {
        console.log("hii");
        e.preventDefault();
        if(validation()){
            try {
                const docRef =  addDoc(collection(db, "Users"), {
                 firstName: firstName,
                 lastName: lastName,
                 phoneNumber: phoneNumber,
                 email: email,
                 password: password,
                 type: type,
                });
                console.log("Document written with ID: ", docRef.id);
                let user = {emailUser:email, passUser:password, type: type, fullName: firstName+" "+lastName, phoneNumber: phoneNumber};
                sessionStorage.setItem('login_user', JSON.stringify(user));
                navigate('/Profile');
                } 
            catch (e) {
                console.error("Error adding document: ", e);
                }
        }  
        else{
            alert("wrong")
        }
    }
    

    useEffect(() => {
        if(client === true){
            setType("לקוח");
            setSupllier(false);
        }
        else {
            setClient(false);
        }
    }, [client]||[supllier])



    const options = [{ value: 'קייטרינג', label: 'קייטרינג' },{ value: 'דיגיי', label: 'דיגיי' },{ value: 'בר', label: 'בר' },{ value: 'ציוד', label: 'ציוד' },];

    const validation = () => {
        if (Validation.validFirstName(firstName) === false || Validation.validFirstName(lastName) === false) {
            alert(`first name and last name can only contains letters in hebrew `);
            return false;
        }
        if(Validation.validPassword(password) === false){
            alert(`the password must contain at least 4 charcters`);
            return false;
        }
        return true;
    }


    return (

        <div style={{ alignItems:'center',minHeight:'85vh',textAlign:'center',marginTop:'25px'}} >
                    {/* <div style={{display:'flex', flexDirection:'coloumn',marginLeft:'30%'}} className="Alerts">
            {flagAlertSuccess ? <AlertSuccess message = {messageS} severityAlert = {s} closeAlert = {closeAlert} /> : null} 
            {flagAlertError ? <AlertSuccess message = {messageE} severityAlert = {e} closeAlert = {closeAlert} /> : null}
        </div> */}
            

        <div className="SignUpForm">

            <div className='form' >
            <Form  onSubmit={Push}>
    
    <h2 style={{fontFamily:'Cursive'}}> <b><u>טופס הרשמה</u></b></h2> <br />

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
        <Form.Control className="w-50"  autoFocus type="numbers" placeholder='הכנס מספר' 
            onChange={(e) => setPhoneNumber(e.target.value)}/>
        </Form.Group>


        <Form.Group size="lg" controlId="email">
        <Form.Label>:אימייל</Form.Label>
        <Form.Control className="w-50"  autoFocus type="email" placeholder='הכנס אימייל' 
            onChange={(e) => setEmail(e.target.value)}/>
        </Form.Group>


        <Form.Group size="lg" controlId="password">
        
        <Form.Label> :סיסמא</Form.Label> <Form.Control className="w-50 " type="password" placeholder='הכנס סיסמא' 
            onChange={(e) => setPassword(e.target.value)} />
        </Form.Group>

        <Form.Group style={{marginTop:'15px'}} className="mb-3">
        <Form.Label  > :סוג </Form.Label>
               <FormControlLabel className="lbl"   control={<Checkbox className="checkbox" />} label=" לקוח " onChange={e => setClient(!client)} />
               <FormControlLabel className="lbl"  control={<Checkbox className="checkbox" />} label=" ספק "  onChange={e => setSupllier(!supllier)} />
               {/* <FormControlLabel style={{width:'75px'}} control={<Checkbox />} label=" מנהל "  onChange={e => setType("מנהל")} /> */}
       </Form.Group>         
       <br />
       {supllier?  <div style={{width:'75%', marginLeft:'5%'}}>
                       <Select label='בחר' options={options} onChange={e => setType(e.value)} />
                   </div> : null}
       
       <br />
        
        <div  style={{marginLeft:'15%',display:'flex', flexDirection:'row',margin:'5px',padding:'10px'}} >
           <Button  onClick={(e) => Push(e)} size="lg" type="submit" > הירשם </Button>
           <Button size="lg" type='reset'  value="reset" > נקה טופס </Button>
        </div>
        

            </Form>
            </div>
        

       
        <div className='nearForm'  >
                     ShortedEvent ברוכים הבאים ל
                     <br />
                     ?יש לך כבר משתמש קיים
                     <br />
                      <Button onClick={goToLogin} >לחץ כאן</Button> 

                      <br />
                       0526458989 :שירות לקוחות בוואטספ <WhatsAppIcon/> 
        </div>

     </div>
    
    
    </div>
       
    )
}
