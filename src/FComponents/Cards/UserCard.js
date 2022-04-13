import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {useState} from 'react';
import database from '../utils/firebase';
import  '../../styles/Pages.css';



export default function UserCard(props) {

  let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
  // סטייטים לקליטת הפרמטרים מהשדות
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('');
  const [once, setOnce] = useState(false);

  if (once === false){
    var usersRef = database.ref("Users");
    usersRef.on("value", function(snapshot){
        snapshot.forEach(function(element){
            if(element.val().email === sessionUser.emailUser && element.val().password === sessionUser.passUser){
              setFirstName(element.val().firstName);
              setLastName(element.val().lastName);
              setEmail(element.val().email);
              setPassword(element.val().password);
              setType(element.val().type);
              setOnce(true);
            }
        })
    })
  }

  return (
    <Card sx={{  minHeight:'60vh', width:'45%',border:'8px solid gray' , borderRadius:'25px' }}>
      <CardContent>
        <Typography style={{ fontFamily:'cursive',fontSize:'40px',textAlign:'center'}} gutterBottom  component="div">
        <u><b>Your Profile Details</b></u>
        </Typography>
        <Typography style={{ fontFamily:'cursive',fontSize:'30px',fontStyle:'oblique',color:'navy',marginLeft:'15px'}} variant="body2" color="text.secondary">
                <b><u>First Name</u></b>: {firstName} <br /> 
                <b><u>Last Name</u></b>:  {lastName} <br /> 
                <b><u>Email</u></b>: {email} <br /> 
                <b><u>Type</u></b>: {type} <br /> 
                <b><u>Password</u></b>: {password} <br /> 
        </Typography>

        <Typography style={{ fontFamily:'cursive',fontSize:'18px',fontStyle:'oblique',color:'navy',textAlign:'center'}} variant="body2" color="text.secondary">
        
          <button className='CardProfileBtn' onClick={() => props.LogOut()} >Logout</button>
          <button className='CardProfileBtn' >Delete My Account</button>
          <button className='CardProfileBtn' >See my history</button>
          <button className='CardProfileBtn'  >Change Detalis</button>
        </Typography>

      </CardContent>
    </Card>
  );
}
