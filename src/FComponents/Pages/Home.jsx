import { createEvent } from '../Pages/CreateEvent';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import '../../Styles/HomePage.css';

export default function Home() {


    const navigate = useNavigate();

    return (
        <div className='HomeBody'>

            <div className="sideBar">
                    <button   className='BtnBarTenders' style={{color:'white'}} >  ברמנים </button>
                    <button  className='BtnDj'>דיגיי </button>
                    <button onClick={e => navigate('/Login')} className='BtnCatering'  >   קייטרינג </button>
                    <button onClick={e => navigate('/Login')} className='BtnEquipmentHome'  >   ציוד </button>
            </div>

            <div className="mainDivHome">
                <div  style={{marginTop:'40px',marginLeft:'20px'}} className='DivBtnCreateEventHome'  >
                    <button onClick={e => navigate('/CreateEvent')}  className='BtnCreate'> ליצירת אירוע </button>
                    <button onClick={e => navigate('/Login')} className='BtnLogin' style={{color:'white'}}  >  התחבר עכשיו </button>
                    <button onClick={e => navigate('/SignUp')} className='BtnsignUp'   >  הירשם אלינו </button>
                </div>

                <div style={{marginTop:'40px'}}  >
                    <label style={{fontWeight:'bold',color:'white',fontSize:'35px',color:'white'}} >הפלטפורמה החדשה לאירועים </label>
                    <br />
                    <label style={{fontWeight:'bold',color:'white',fontSize:'22px',color:'white'}} >הפלטפורמה החדשה לאירועים </label>
                    <br />
                    <br />
                    <label style={{fontWeight:'bold',color:'white',fontSize:'18px',color:'white'}} > לך לתאם אספקות מול ספקים ללא חובה באינטרקציה </label>
                    <br />
                    <label style={{fontWeight:'bold',color:'white',fontSize:'18px',color:'white'}} > לך לתאם אספקות מול ספקים ללא חובה באינטרקציה </label>
                    <br />
                    <label style={{fontWeight:'bold',color:'white',fontSize:'18px',color:'white'}} > לך לתאם אספקות מול ספקים ללא חובה באינטרקציה </label>
                    <br />
                    <label style={{fontWeight:'bold',color:'white',fontSize:'18px',color:'white'}} > לך לתאם אספקות מול ספקים ללא חובה באינטרקציה </label>
                    <label style={{fontWeight:'bold',color:'white',fontSize:'18px',color:'white'}} > לך לתאם אספקות מול ספקים ללא חובה באינטרקציה </label>
                    <br />
                </div>
            </div>

                <div  className="sideBar">
                        <button onClick={e => navigate('/Login')} className='BtnOtDoorEvent'  >  טבע  </button>
                        <button onClick={e => navigate('/Login')} className='BtnSmallEvents'>   עסקיים  </button>
                        <button onClick={e => navigate('/Login')} className='BtnRoofTop' >  גג  </button>
                        <button onClick={e => navigate('/Login')} className='BtnPlaceSea'  >  ים  </button>
                </div>


        </div>
   
    )
}
