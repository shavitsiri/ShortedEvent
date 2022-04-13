import React, {useState} from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Styles/Profile.css";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import db from "../utils/Firebase";
import PersonIcon from '@mui/icons-material/Person';
import LockOpenIcon from '@mui/icons-material/LockOpen';


export default function Profile() {

     // מקבל את המשתמש המחובר
    let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`));

    
    // סטייטים לקליטת הפרמטרים מהשדות
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [type, setType] = useState('');
    const [once, setOnce] = useState(false);

    const [showPass, setShowPass] = useState(false); // סטייס הצגת הסיסמא


    // פונקציה למחיקת משתמש
    const DeleteAccount = async () => {
        try{
            console.log("hii1");
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach(async(docEl) => {
                if(docEl.data().email === sessionUser.emailUser){
                    await deleteDoc(doc(db,"Users",docEl.id))
                    LogOut();
                    navigate('/');
                }
            });
        }
        catch{
            alert("wrong")
        }
    }


    // ניווט בין עמודים
    const navigate = useNavigate();

    const LogOut = () => {
        sessionStorage.clear();
        navigate("/");
    }

    const goToMyHistory = () => {
        navigate("/MyHistory");
    }

    const goToEditUserDetails = () => {
        navigate("/EditUserDetails");
    }

    const goToEditUsers = () => {
        navigate('/EditUsers');
    }

    const goToShowContactUs = () => {
        navigate('/ShowContactUs');
    }

    return (
        <div className='BodyProfile' >


            <div className="ProfileCard">
                
                <label style={{textAlign:'center', fontSize:'40px'}} > <PersonIcon/> <b>{sessionUser.fullName} - {sessionUser.type}</b> </label> 
                <label style={{textAlign:'center', fontSize:'25px'}} > <EmailIcon/> <b>{sessionUser.emailUser}</b> </label>  
                <label style={{textAlign:'center'}} > <PhoneIphoneIcon/> <b>{sessionUser.phoneNumber}</b> </label> 
                <label style={{textAlign:'center', fontSize:'16px',marginTop:'10px'}}> <button className='btnShowHide' onClick={e => setShowPass(!showPass)}  > <LockOpenIcon  style={{height:'16px'}} /> </button> {showPass?  <b>{sessionUser.passUser}</b> : <b>********</b> } </label> 

                {sessionUser.type === 'מנהל'? <button className='btnProfile' onClick={goToEditUsers} >עריכת משתמשים</button> : null}
                {sessionUser.type === 'מנהל'? <button className='btnProfile' onClick={goToShowContactUs} >צפייה בפניות </button> : null}
                <button onClick={goToMyHistory} className='btnProfile' >צפה בהיסטוריה</button>
                <button onClick={goToEditUserDetails} className='btnProfile' >ערוך פרטים </button>
                <button className='btnProfile' style={{backgroundColor:'#DA9990'}} onClick={LogOut} >התנתק</button>
                <button className='btnProfile' style={{backgroundColor:'#EA014E'}} onClick={DeleteAccount} > מחק חשבון </button>

            </div>

        </div>
    )
}
