import React from 'react';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCard from '../../Icons/HeaderCard';
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { FormControlLabel } from '@mui/material';
import { Checkbox } from '@mui/material';
import Select from 'react-select';
import "../../Styles/ChangeDetails.css";
import db from "../utils/Firebase";
import { collection, getDocs, updateDoc, doc } from "firebase/firestore";


export default function EditUserDetails() {

    // מקבל את המשתמש המחובר
    let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`));
    let user2Store;
    const optionsTypeUser = [{ value: 'לקוח', label: 'לקוח' }, { value: 'ספק', label: 'ספק' }];

    // Navigation
    const navigate = useNavigate();

    // סטייטים לקליטת הפרמטרים מהשדות
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
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
    ];

    const ChangeDetails = async (e) => {
        e.preventDefault();
        user2Store = sessionUser;
        const splitOnSpace = sessionUser.fullName.split(' ');
        user2Store = {
            firstName: firstName.length > 2 ? firstName : splitOnSpace[0],
            lastName: lastName.length > 2 ? lastName : splitOnSpace[1],
            email: email.length > 2 ? email : sessionUser.emailUser,
            password: password.length > 2 ? password : sessionUser.passUser,
            phoneNumber:  phoneNumber.length > 7 ? phoneNumber : sessionUser.phoneNumber,
            type: type.length >= 2 ? type : sessionUser.type,
        }
        try {
            console.log("im here");
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                if (doc.data().email === sessionUser.emailUser && doc.data().password === sessionUser.passUser) {
                    let userId = doc.id;
                    console.log("user id = " + userId);
                    updateUser(userId);
                    navigate('/Profile');
                }
            });
        }
        catch(e){
            alert(e)
        }
    }

    const updateUser = async (userId) => {
        const userDoc = doc(db, "Users", userId);
        await updateDoc(userDoc, user2Store);
        let user = { emailUser: user2Store.email, passUser: user2Store.password, type: user2Store.type, fullName: user2Store.firstName + " " + user2Store.lastName, phoneNumber: user2Store.phoneNumber }
        sessionStorage.clear();
        sessionStorage.setItem('login_user', JSON.stringify(user));
    }

    return (
        <div className="BodyChangeDetalis">

            <div className="changeMyDetaildform">

                <Form onSubmit={ChangeDetails}>

                    <h3> <b><u> עריכת פרטים</u></b></h3> <br />

                    <Form.Group size="lg" controlId="firstName">
                        <Form.Label>:שם פרטי</Form.Label>
                        <Form.Control className="w-50" autoFocus type="text" placeholder='הכנס שם פרטי' value={sessionUser.fullName.split(' ')[0]}
                            onChange={e => setFirstName(e.target.value)} />
                    </Form.Group>

                    <Form.Group size="lg" controlId="LastName">
                        <Form.Label>:שם משפחה</Form.Label>
                        <Form.Control className="w-50" autoFocus type="text" placeholder='הכנס שם משפחה' value={sessionUser.fullName.split(' ')[1]}
                            onChange={e => setLastName(e.target.value)} />
                    </Form.Group>

                    <Form.Group size="lg" controlId="phone">
                        <Form.Label>:מספר טלפון </Form.Label>
                        <Form.Control className="w-50" autoFocus type="numbers" placeholder='הכנס מספר טלפון ' value={sessionUser.phoneNumber}
                            onChange={e => setPhoneNumber(e.target.value)} />
                    </Form.Group>


                    {/* <Form.Group size="lg" controlId="email">
                        <Form.Label>:אימייל</Form.Label>
                        <Form.Control className="w-50" autoFocus type="email" placeholder='הכנס אימייל'
                            onChange={(e) => setEmail(e.target.value)} />
                    </Form.Group> */}


                    <Form.Group size="lg" controlId="password">

                        <Form.Label> :סיסמא</Form.Label> <Form.Control className="w-50 " type="password" placeholder='הכנס סיסמא' value={sessionUser.passUser}
                            onChange={(e) => setPassword(e.target.value)} />
                    </Form.Group>

                    <Form.Group style={{marginLeft:'15%'}} size="lg" controlId="type" >
                            <Form.Label> :סוג </Form.Label>
                            <Select className="w-50" style={{}} label='בחר' options={optionsTypeUser} onChange={e => setType(e.value)}/>
                        </Form.Group>
                        <br />
                        {type !== 'לקוח' && type !== '' ? <div style={{marginLeft:'15%'}}>
                            <Select className="w-50" label='בחר' options={options} onChange={e => setType(e.value)} />
                        </div> : null}

                    {/* <Form.Group className="mb-3">
                        <Form.Label  > :סוג </Form.Label>
                        <FormControlLabel style={{ width: '75px' }} control={<Checkbox />} label=" לקוח " onChange={e => setClient(!client)} />
                        <FormControlLabel style={{ width: '75px' }} control={<Checkbox />} label=" ספק " onChange={e => setSupllier(!supllier)} />
                    </Form.Group>
                    <br />
                    {supllier ? <div style={{ width: '75%', marginLeft: '5%' }}>
                        <Select label='בחר' options={options} onChange={e => setType(e.value)} />
                    </div> : null} */}

                    <br />

                    <div className='BtnChangeDetails' style={{ marginLeft: '15%', display: 'flex', flexDirection: 'row', margin: '5px', padding: '20px' }} >
                        <Button size="lg" type="submit" > שמור פרטים </Button>
                        <Button size="lg" type='reset' value="reset" > נקה טופס </Button>
                    </div>

                </Form>

            </div>

        </div>

    )
}
