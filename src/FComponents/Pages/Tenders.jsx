import React, { useState } from 'react';
// import database from '../utils/firebase';
import TenderCard from '../Cards/TenderCard';
import HeaderCard from '../../Icons/HeaderCard';
import "../../Styles/Pages.css";

import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import db from "../utils/Firebase";





export default function Tenders() {

    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר

    const [tenders, setTenders] = useState([]);
    const [sendOfferToClient, setSendOfferToClient] = useState(false);
    let arr = new Array();

    const showTenders = async (event) => {
        event.preventDefault();
        try{
            console.log("hii1");
            const querySnapshot = await getDocs(collection(db, "Tenders"));
            querySnapshot.forEach(async(docEl) => {
                if(sessionUser.type === docEl.data().supllierType){
                    arr.push({fullName: docEl.data().fullName,email: docEl.data().email , city: docEl.data().city,street: docEl.data().street,houseNumber: docEl.data().houseNumber,
                        phoneNumber: docEl.data().phoneNumber, date: docEl.data().date, supllierType: docEl.data().supllierType,
                           requireList: docEl.data().requireList[0].label, comment: docEl.data().comment, id: docEl.data().id}); 
                }
                          
            });
            setTenders(arr);
            console.log("hiiii233422");
        }
        catch{
            alert("wrong")
        }
    }

    const sendOffer = () => {
        console.log("shalom");

    }

    const changeToSenfOffer = () => {
        
    }

        
    let tenderStr = tenders.map((tend,index) => <TenderCard  key = {index} fullName = {tend.fullName} email = {tend.email} city ={tend.city} street = {tend.street} houseNumber = {tend.houseNumber}
                        phoneNumber = {tend.phoneNumber} date = {tend.date} supllierType = {tend.supllierType}
                        changeToSenfOffer = {changeToSenfOffer} requireList = {tend.requireList}  comment = {tend.comment} id = {tend.id}/>) // משתנה להדפסת הכרטיסים של המוצרים

  return (
    <div style={{minHeight:'76vh'}} >


        <div style={{display:'flex', flexDirection:'column', alignItems:'center',textAlign:'center'}} >
            <button className='BtnShowTenders'  onClick={e => showTenders(e)} > ↓↓ הצג מכרזים פתוחים  ↓↓ </button>
        </div>
        
        <div className="TenderList">
            {tenderStr}
        </div>

    </div>



    
  )
}
