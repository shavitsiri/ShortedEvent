import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../../Styles/Profile.css";
import PhoneIphoneIcon from '@mui/icons-material/PhoneIphone';
import EmailIcon from '@mui/icons-material/Email';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import db from "../utils/Firebase";
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HistoryIcon from '@mui/icons-material/History';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import { Tooltip, IconButton } from '@material-ui/core';
import GroupIcon from '@mui/icons-material/Group';
import EqualizerIcon from '@mui/icons-material/Equalizer';


export default function Profile() {

    // LoginUser
    let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`));
    const [ifSupplier, setIfSupplier] = useState(false);
    const [countDealsOfSupplier, setCountDealsOfSupplier] = useState(0);
    const [countTenderAvailable, setCountTenderAvailable] = useState(0);

    const getDeals = async () => {
        try {
            let count = 0;
            const querySnapshot = await getDocs(collection(db, "Deals"));
            querySnapshot.forEach((docEl) => {
                if (docEl.data().supllierEmail === sessionUser.emailUser ) {
                    count++;
                }
            });
            setCountDealsOfSupplier(count);
        }
        catch (e) {
            alert(e)
        }
    }

    const getTenders = async () => {
        try {
            let count = 0;
            const querySnapshot = await getDocs(collection(db, "Tenders"));
            querySnapshot.forEach(async (docEl) => {
                if (docEl.data().supllierType === sessionUser.type) {
                    count++;
                }
            })
            setCountTenderAvailable(count);
        }
        catch (e) {
            alert(e, "shalom")
        }
    }


    // States
    const [showPass, setShowPass] = useState(false);

    // Functions
    const DeleteAccount = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach(async (docEl) => {
                if (docEl.data().email === sessionUser.emailUser) {
                    await deleteDoc(doc(db, "Users", docEl.id))
                    LogOut();
                    navigate('/');
                }
            });
        }
        catch {
            alert("wrong")
        }
    }

    useEffect(() => {
        if (sessionUser.type !== 'לקוח' && sessionUser.type !== 'מנהל') {
            setIfSupplier(true);
            getDeals();
            getTenders();
        }
    }, [])

    // Navigation
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
        <div className='BodyProfile' style={{ minHeight: '80vh' }} >
            <div className="ProfileCard"  >
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }} >
                    <h1> פרטים אישיים</h1>
                    {/* <PersonIcon /> */}
                    <div>
                        <label style={{ marginTop: '15px', fontSize: '22px' }}>  <b>{sessionUser.fullName} - {sessionUser.type}</b> </label>
                        <label style={{ display: 'flex', flexDirection: 'row' }} > <EmailIcon style={{ marginRight: '10px' }} /> <b>{sessionUser.emailUser}</b> </label>
                        <label style={{ display: 'flex', flexDirection: 'row' }} > <PhoneIphoneIcon style={{ marginRight: '10px' }} /> <b>{sessionUser.phoneNumber}</b> </label>
                        <label style={{ display: 'flex', flexDirection: 'row' }} onClick={e => setShowPass(!showPass)} > {showPass ? <VisibilityOffIcon style={{ cursor: 'pointer' }} /> : <VisibilityIcon style={{ cursor: 'pointer' }} />} {showPass ? <span style={{ marginLeft: '10px' }} ><b>{sessionUser.passUser}</b></span> : <span style={{ marginLeft: '10px' }} > <b>********</b> </span>} </label>
                        {ifSupplier ? <label > {countDealsOfSupplier}  : כמות עסקאות באתר  </label> : null}
                        {ifSupplier ? <label > {countTenderAvailable}  : כמות מכרזים זמינים  </label> : null}


                    </div>

                    <div className='BtnProfile' >
                        {sessionUser.type === 'מנהל' ? <Tooltip title="סטטיסטיקות">
                            <IconButton>
                                <EqualizerIcon className='btnProfile' onClick={() => navigate('/Graphs')} />
                            </IconButton>
                        </Tooltip> : null}
                        {sessionUser.type === 'מנהל' ? <Tooltip title="עריכת משתמשים ">
                            <IconButton>
                                <GroupIcon className='btnProfile' onClick={goToEditUsers} />
                            </IconButton>
                        </Tooltip> : null}
                        {sessionUser.type === 'מנהל' ? <Tooltip title=" צפייה בפניות">
                            <IconButton>
                                <EmailIcon className='btnProfile' onClick={goToShowContactUs} />
                            </IconButton>
                        </Tooltip> : null}
                        <Tooltip title="ערוך פרטים">
                            <IconButton>
                                <ModeEditIcon className='btnProfile' onClick={goToEditUserDetails} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="התנתק">
                            <IconButton>
                                <ExitToAppIcon className='btnProfile' onClick={LogOut} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="מחק משתמש">
                            <IconButton>
                                <DeleteForeverIcon className='btnProfile' onClick={DeleteAccount} />
                            </IconButton>
                        </Tooltip>
                        <Tooltip title="צפה בהיסטוריה" >
                            <IconButton   >
                                <HistoryIcon className='btnProfile' onClick={goToMyHistory} />
                            </IconButton>
                        </Tooltip>
                        {/* <button className='btnProfile' style={{ backgroundColor: '#DA9990' }} onClick={LogOut} >התנתק</button> */}
                        {/* <button onClick={goToMyHistory} className='btnProfile' >צפה בהיסטוריה</button> */}
                        {/* <button className='btnProfile' style={{ backgroundColor: '#EA014E' }} onClick={DeleteAccount} > מחק חשבון </button> */}
                    </div>
                </div>
            </div>
        </div>
    )
}
