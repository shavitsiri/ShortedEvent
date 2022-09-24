import React, { useEffect, useState } from 'react';
import "../../../Styles/MyHistory.css";
import db from "../../utils/Firebase";
import { collection, getDocs} from "firebase/firestore";
import SupplierRate from '../../Cards/SupplierRate';

export default function Equipment() {
  const [users, setUsers] = useState([]);

  const showBarTenders = async () => {
    try {
      let arr = new Array();
      const querySnapshot = await getDocs(collection(db, "Users"));
      querySnapshot.forEach(async (docEl) => {
        if (docEl.data().type === "ציוד") {
          arr.push({ fullName: docEl.data().firstName + ' ' + docEl.data().lastName, email: docEl.data().email,
           type: docEl.data().type, phoneNumber: docEl.data().phoneNumber});
          
        }
      });
      setUsers(arr);
    }
    catch (e) {
      alert(e)
    }
  }

  useEffect(() => {
    showBarTenders();
  }, [])

  let usersStr = users.map((user, index) => <SupplierRate key={index} fullName={user.fullName} email={user.email} supllierType={user.type} phoneNumber={user.phoneNumber} />)

  return (
    <div className='EditUsersDivMain' >
      <h1> ספקי ציוד</h1>
      <div className='editUserList' >
        {usersStr}
      </div>

    </div>
  )
}
