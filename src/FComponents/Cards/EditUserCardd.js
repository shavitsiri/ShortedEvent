import React from 'react';
import "../../Styles/Pages.css";

export default function EditUserCardd(props) {
    const {fullName,email,type,DeleteUser} = props;
  return (
    
  <div  className="EditUserCard">

                <b>:<u>שם מלא</u></b> {fullName}<br/>
                <b>:<u>אימייל</u></b>{email} <br/>
                <b>:<u>סוג משתמש</u></b> {type} <br/> 

            <button className='BtnDeleteUserCard'
              onClick={(e) => DeleteUser(email)}> Delete </button>

  </div>


  )
}
