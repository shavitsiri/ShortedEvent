import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import HeaderCard from '../../Icons/HeaderCard';
import '../../Styles/orderConfirmation.css';


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
        <div style={{display:'flex',flexDirection:'column',alignItems:'center', padding:'60px' }}>

            <div className='thankForPurchase'   >

                שלום , {sessionUser.fullName}<br />
                ההזמנה שלך התקבלה בהצלחה<br />
                תודה שהשתמשת בשירותינו כדי לקבל מה שאת/ה צריך/כה <br />
                .ברגעים אלו ניתן לצפות בהזמנות שלך בעמוד הבקשות  <br />
                <u>מספר ההזמנה שלך הוא</u>: <b style={{ color: '#50D604' }} > {orderNumber}</b><br />
                אם קיימת שאלה או בעיה מסוימת  תמיד אפשר לפנות אלינו <br /> <button style={{ borderRadius: '8px', backgroundColor: '#CDCDCD' }} onClick={()=>navigate('/Contact')} > צור קשר</button>  <br />
    
                <u>שירות לקוחות</u>: <br />
                +972 050-534-5656<br/>
                Eventlify@modern.com<br/>
                <br />
                <button style={{ borderRadius: '8px', backgroundColor: '#CDCDCD',padding:'8px' }} onClick={()=>navigate('/')}  >המשך לעמוד הבית</button>

            </div>

        </div>
    )
}
