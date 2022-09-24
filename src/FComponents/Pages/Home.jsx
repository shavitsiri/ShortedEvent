import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../Styles/HomePage.css';
import firebase from '../utils/Firebase';
import 'firebase/firestore';
import 'firebase/auth';
import ChatRoom2 from '../Cards/ChatRoom2';

// const auth = firebase.auth();
// const firestore = firebase.firestore();

export default function Home() {

    let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`));

    const navigate = useNavigate();

    return (
        <div className='HomeBody'>

            <div className="sideBar">
                <button onClick={e => navigate('/BarTenders')} className='BtnBarTenders' style={{ color: 'white' }} >  ברמנים </button>
                <button onClick={e => navigate('/Djs')} className='BtnDj'>דיגיי </button>
                <button onClick={e => navigate('/Catering')} className='BtnCatering'  >   קייטרינג </button>
                <button onClick={e => navigate('/Equipment')} className='BtnEquipmentHome'  >   ציוד </button>
            </div>

            <div className="mainDivHome">
                <div style={{ marginTop: '15px', marginLeft: '20px' }} className='DivBtnCreateEventHome'  >
                    <button style={{ color: 'white' }} onClick={e =>  { sessionUser !== null ? navigate('/CreateEvent') : alert("כדי ליצור אירוע עליך ליצור משתמש קודם") }} className='BtnCreate'> ליצירת אירוע </button>
                    <button onClick={e => navigate('/Login')} className='BtnLogin' style={{ color: 'black' }} > התחברות </button>
                    <button onClick={e => navigate('/SignUp')} className='BtnsignUp' > הרשמה </button>
                </div>

                <div style={{ marginTop: '15px', marginLeft: '10px' }}  >
                    <label style={{ fontWeight: 'bold', fontSize: '35px', color: 'white' }} >הפלטפורמה החדשה לאירועים </label>
                    <br />
                    <label style={{ fontWeight: 'bold', fontSize: '22px', color: 'white' }} >הפלטפורמה החדשה לאירועים </label>
                    <br />
                    <br />
                    <label style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }} > לך לתאם אספקות מול ספקים ללא חובה באינטרקציה </label>
                    <br />
                    <label style={{ fontWeight: 'bold', fontSize: '18px', color: 'white' }} > לך לתאם אספקות מול ספקים ללא חובה באינטרקציה </label>
               
                </div>

                <div>
                    <button className='BtnAboutMenu' onClick={e => navigate('/About')} ></button>
                </div>

                <div >
                    <button className='BtnContactusMenu' onClick={e => navigate('/Contact')} > צור קשר </button>
                </div>
            </div>

            <div className="sideBar">
                <button className='BtnOtDoorEvent'>  טבע  </button>
                <button className='BtnSmallEvents'>   עסקיים  </button>
                <button className='BtnRoofTop'>  גג  </button>
                <button className='BtnPlaceSea'>  ים  </button>
            </div>

            <br />

            {/* {sessionUser ? <div style={{ backgroundColor: 'gray', width: '350px', height: '400px', position: 'fixed', alignSelf: 'flex-end' }}><ChatRoom2 /></div> : null} */}

        </div>
    )
}
