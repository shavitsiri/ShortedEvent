import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCard from '../../Icons/HeaderCard';


export default function OrderConfirmation() {

    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)) || []; // מקבל את המשתמש שנמצא בסשן סטורייג
    const localUsers = JSON.parse(localStorage.getItem(`Users`)) || [];  // מקבל את מערך כל המשתמשים מהלוקאל סרטוייג
    let localUser = localUsers.filter(user => user.email === sessionUser.emailUser) // מקבל את כל פרטי המשתמש המחובר מהלוקאל סטורייג
    localUser = localUser[0];
    
    

    const min = 111111;
    const max = 999999999;
    const [orderNumber, setOrderNumber] = useState(Math.floor(min + Math.random() * (max - min)))
    
    const navigate = useNavigate();

    const moveToContact = () => {
        navigate('/Contact');
    }



    return (
        <div style={{minHeight:'75vh' }}>

            <HeaderCard pageName = {'Thank for purchase'} />

            <div className='thankForPurchase' >

                hello ,<br />
                your reservation has been received !!!<br/>
                Thank you for purchase in our website , <br />
                we will update you in every change with your package. <br />
                <u>your order number is</u>: <b style={{color:'#50D604'}} > {orderNumber}</b> ,<br />
                for any question or problems you can always  <button  style={{borderRadius:'25px',backgroundColor:'lightYellow'}}> contact us</button> . <br />
                You will receive your order within 14 business days.<br/>
                <u>customer service</u>: <br/>
                +972 050-534-5656<br/>
                Electrify@fashion.com<br/>
                <br/>
                <button style={{borderRadius:'25px',backgroundColor:'lightYellow'}}>continue shopping</button>
                
            </div>

        </div>
    )
}
