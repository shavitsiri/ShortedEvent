import React from 'react';
import { useEffect,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCard from '../../Icons/HeaderCard';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import Select from 'react-select';
import "../../Styles/ChangeDetails.css";

// import { useForm } from "react-hook-form";
// import database from '../utils/firebase';



export default function EditUserDetails() {

     // מקבל את המשתמש המחובר
     let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`));
     let userToStore;
     let user;

      // סטייטים לקליטת הפרמטרים מהשדות
      const [firstName, setFirstName] = useState('');
      const [lastName, setLastName] = useState('');
      const [email, setEmail] = useState('');
      const [password, setPassword] = useState('');
      const [type, setType] = useState('');
      const [supllier, setSupllier] = useState(false);
      const [client, setClient] = useState(false);

      const options = [
        { value: 'קייטרינג', label: 'קייטרינג' },
        { value: 'דיגיי', label: 'דיגיי' },
        { value: 'בר', label: 'בר' },
        { value: 'ציוד', label: 'ציוד' },
      ]


   const ChangeDetails = (e) => {
       e.preventDefault();
  //     console.log("hii12");
  //     database.ref('/Users/').orderByKey().on('value', function(snapshot) {
  //     snapshot.forEach(function(userSnapshot) {
  //       console.log(userSnapshot.val().email);
  //       if(sessionUser.emailUser === userSnapshot.val().email){
  //         console.log("hii");
  //         user = {emailUser:email, passUser:password, userType: type, fullName: firstName+" "+lastName};
  //         userToStore = {
  //           firstName: firstName,
  //           lastName: lastName,
  //           email: email,
  //           password: password,
  //           type: type,
  //       }
        
  //       }

  //     });
      
  // });
   }

  return (
    <div className="BodyChangeDetalis">

        <div className="changeMyDetaildform">

            <Form  onSubmit={ChangeDetails}>

                <h3> <b><u> עריכת פרטים</u></b></h3> <br />

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


                <Form.Group size="lg" controlId="email">
                <Form.Label>:אימייל</Form.Label>
                <Form.Control className="w-50"  autoFocus type="email" placeholder='הכנס אימייל' 
                    onChange={(e) => setEmail(e.target.value)}/>
                </Form.Group>


                <Form.Group size="lg" controlId="password">
                
                <Form.Label> :סיסמא</Form.Label> <Form.Control className="w-50 " type="password" placeholder='הכנס סיסמא' 
                    onChange={(e) => setPassword(e.target.value)} />
                </Form.Group>

                <Form.Group className="mb-3">
                <Form.Label  > :סוג </Form.Label>
                    <FormControlLabel style={{width:'75px'}}  control={<Checkbox />} label=" לקוח " onChange={e => setClient(!client)} />
                    <FormControlLabel style={{width:'75px'}} control={<Checkbox />} label=" ספק "  onChange={e => setSupllier(!supllier)} />
                </Form.Group>         
                <br />
                {supllier?  <div style={{width:'75%', marginLeft:'5%'}}>
                                <Select label='בחר' options={options} onChange={e => setType(e.value)} />
                            </div> : null}

                <br />
                
                <div className='BtnChangeDetails' style={{marginLeft:'15%',display:'flex', flexDirection:'row',margin:'5px',padding:'20px'}} >
                <Button size="lg" type="submit" > שמור פרטים </Button> 
                <Button size="lg" type='reset'  value="reset" > נקה טופס </Button>
                </div>

            </Form>

        </div>

    </div>

  )
}
