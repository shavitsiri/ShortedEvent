import React, { useEffect, useState } from 'react';
import TenderCard from '../Cards/TenderCard';
import HeaderCard from '../../Icons/HeaderCard';
import "../../Styles/MyHistory.css";
import { collection, getDocs, doc } from "firebase/firestore"; 
import db from "../utils/Firebase";

export default function MyRequires() {

    // Get Login User
    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר

    //States && Variables
    const [tenders, setTenders] = useState([]);
    let arrtenders = new Array();

    // Functions
    const showTenders = async () => {
        try{
            const querySnapshot = await getDocs(collection(db, "Tenders"));
            querySnapshot.forEach((docEl) => {
                if(docEl.data().email === sessionUser.emailUser){
                    arrtenders.push({fullName: docEl.data().fullName, email: docEl.data().email, city: docEl.data().city,street: docEl.data().street,houseNumber: docEl.data().houseNumber,
                                                 phoneNumber: docEl.data().phoneNumber, date: docEl.data().date, supllierType: docEl.data().supllierType,
                                                    requireList: docEl.data().requireList.map((req) => req.label + ", " ) , comment: docEl.data().comment ,id: docEl.data().id})
                }
            });
            setTenders(arrtenders);
        }
        catch(e){
            alert(e);
        }
    }

    useEffect(() => {
        showTenders();
    }, [])
    
    // Get Every Tender in a appropriate card        
    let tenderStr = tenders.map((tend,index) => <TenderCard  key = {index} fullName = {tend.fullName} email = {tend.email} city ={tend.city} street = {tend.street} houseNumber = {tend.houseNumber}
                        phoneNumber = {tend.phoneNumber} date = {tend.date} supllierType = {tend.supllierType}
                        requireList = {tend.requireList} comment = {tend.comment} id = {tend.id} showTenders = {showTenders} />) // משתנה להדפסת הכרטיסים של המוצרים

  return (
    <div style={{minHeight:'80vh'}} >
        <div style={{display:'flex', flexDirection:'column', alignItems:'center',textAlign:'center'}} >
            <HeaderCard  pageName = {'הבקשות שלי'}  /> 
        </div>
           

            <div className='TenderList' style={{marginBottom:'45px'}} >
                {tenderStr}
            </div>
            
            <br />
            <br />
    </div>
  )
}
