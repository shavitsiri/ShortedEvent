import React, { useEffect, useState } from 'react';
import EditUserCardd from '../Cards/EditUserCardd';
import HeaderCard from '../../Icons/HeaderCard';
import '../../Styles/EditUserManager.css';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import db from "../utils/Firebase"


export default function EditUsers() {

  const [users, setUsers] = useState([]);
  let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר

  const ShowUsers = async () => {
    try {

      let arr = new Array();
      const querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach(async (docEl) => {
        arr.push({ fullName: docEl.data().firstName + ' ' + docEl.data().lastName, email: docEl.data().email, type: docEl.data().type });
      });
      setUsers(arr);
    }
    catch {
      alert("error")
    }
  }

  const DeleteUser = async (email) => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach(async (docEl) => {
        if (docEl.data().email === email) {
          await deleteDoc(doc(db, "Users", docEl.id))
        }
      });
    }
    catch {
      alert("wrong")
    }
  }

  const HideUsers = () => {
    setUsers([]);
  }

  useEffect(() => {
    ShowUsers();
  }, [])


  let usersStr = users.map((user, index) => <EditUserCardd key={index} fullName={user.fullName} email={user.email} type={user.type} DeleteUser={DeleteUser} />)

  return (
    <div className='EditUsersDivMain' >

      <button style={{ marginTop: '55px', border: '3px solid #3F3F3F', borderRadius: '50px', backgroundImage: 'linear-gradient(to right, #107EC1, #4FB2EE)', fontFamily: 'cursive', fontSize: '18px', color: 'white', padding: '8px', paddingRight: '45px', paddingLeft: '45px' }}
        onClick={ShowUsers} > הצג משתמשים</button>
      &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
      <button style={{ marginTop: '15px', border: '3px solid #3F3F3F', borderRadius: '50px', backgroundImage: 'linear-gradient(to right, #107EC1, #4FB2EE)', fontFamily: 'cursive', fontSize: '18px', color: 'white', padding: '8px', paddingRight: '45px', paddingLeft: '45px' }}
        onClick={HideUsers} > הסתר משתמשים</button>

      <div className='editUserList' >
        {usersStr}
      </div>
    </div>
  )
}
