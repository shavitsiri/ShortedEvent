import React, { useState } from 'react';
// import database from '../utils/firebase';
import EditUserCardd from '../Cards/EditUserCardd';
import HeaderCard from '../../Icons/HeaderCard';
import '../../Styles/EditUserManager.css';



import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import db from "../utils/Firebase"


export default function EditUsers() {

    const [users, setUsers] = useState([]);
    let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר



     const ShowUsers = async (event) => {
      event.preventDefault();
      try{
        
        let arr = new Array();
        const querySnapshot = await getDocs(collection(db, "Users"));
        querySnapshot.forEach(async(docEl) => {
          console.log("hii1");
              arr.push({fullName:docEl.data().firstName +' '+ docEl.data().lastName, email: docEl.data().email, type: docEl.data().type });
            });
        setUsers(arr);
          }
        catch{
          alert("error")
        }
     }

     const DeleteUser = async (email) => {
      try{
          const querySnapshot = await getDocs(collection(db, "Users"));
          querySnapshot.forEach(async(docEl) => {
              if(docEl.data().email === email){
                  await deleteDoc(doc(db,"Users",docEl.id))
              }
          });
      }
      catch{
          alert("wrong")
      }
    }

    const HideUsers = () => {
        setUsers([]);
    }


    let usersStr = users.map((user,index) => <EditUserCardd  key = {index} fullName ={user.fullName} email = {user.email}  type = {user.type} DeleteUser = {DeleteUser} />)


  return (
    <div className='EditUsersDivMain' >

        
        <button style={{marginTop:'55px', minWidth:'220px', height:'55px',border:'8px solid #3F3F3F', borderRadius:'40px',
                            backgroundColor:'#15D366', fontFamily:'cursive',fontSize:'22px'}}
                              onClick={ShowUsers} > Show users details</button>
          &nbsp;
        <button style={{marginTop:'15px', minWidth:'220px', height:'55px',border:'8px solid #3F3F3F', borderRadius:'40px',
                                    backgroundColor:'Yellow', fontFamily:'cursive',fontSize:'22px'}}
                                    onClick={HideUsers} > Hide users details</button>

        <div className='editUserList' >
          {usersStr}
        </div>
        
           


    </div>
  )
}
