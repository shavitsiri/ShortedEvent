import React, { useState } from 'react';
import TenderCard from '../Cards/TenderCard';
import HeaderCard from '../../Icons/HeaderCard';
import "../../Styles/MyHistory.css";
import { collection, getDocs, doc } from "firebase/firestore"; 
import db from "../utils/Firebase";

import BidCard from '../Cards/BidCard';




export default function MyHistory() {
    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
    const [tenders, setTenders] = useState([]);
    const [bids, setBids] = useState([]);
    const [showHideTenders, setShowHideTenders] = useState(false);
    const [showHidebids, setShowHidebids] = useState(false);
    let arrtenders = new Array();
    let arrBids = new Array();

    const showTenders = async (event) => {
        event.preventDefault();
        console.log("im here");
            try{
                const querySnapshot = await getDocs(collection(db, "Tenders"));
                querySnapshot.forEach((docEl) => {
                    console.log(docEl.data().requireList);
                    if(docEl.data().email === sessionUser.emailUser){
                        arrtenders.push({fullName: docEl.data().fullName, email: docEl.data().email, city: docEl.data().city,street: docEl.data().street,houseNumber: docEl.data().houseNumber,
                                                     phoneNumber: docEl.data().phoneNumber, date: docEl.data().date, supllierType: docEl.data().supllierType,
                                                        requireList: docEl.data().requireList[0].label , comment: docEl.data().comment})
                    }
                });
                setTenders(arrtenders);
                setBids([]);
            }
            catch{
                alert("wrong")
            }
    }

    const showBids = async (event) => {
        event.preventDefault();
            try{
                const querySnapshot = await getDocs(collection(db, "Bids"));
                querySnapshot.forEach((docEl) => {
                    console.log(docEl.data().clientEmail);
                    if(docEl.data().clientEmail === sessionUser.emailUser){
                        console.log("hii151515");
                        arrBids.push({clientEmail: docEl.data().clientEmail, clientName: docEl.data().clientName, commentFromSupllier: docEl.data().commentFromSupllier,
                            price: docEl.data().price, supllierEmail: docEl.data().supllierEmail,supllierName: docEl.data().supllierName, id: docEl.data().id})
                }});
                setBids(arrBids);
                setTenders([]);
                console.log(arrBids);
            }
            catch{
                alert("wrong")
            }
        }

        
    let tenderStr = tenders.map((tend,index) => <TenderCard  key = {index} fullName = {tend.fullName} email = {tend.email} city ={tend.city} street = {tend.street} houseNumber = {tend.houseNumber}
                        phoneNumber = {tend.phoneNumber} date = {tend.date} supllierType = {tend.supllierType}
                          commentFromSupllier = {tend.requireList} comment = {tend.comment}/>) // משתנה להדפסת הכרטיסים של המוצרים

                          

    let BidsStr = bids.map((bid,index) => <BidCard  key = {index} clientName = {bid.clientName} clientEmail = {bid.clientEmail}
        supllierEmail ={bid.supllierEmail} supllierName = {bid.supllierName} commentFromSupllier = {bid.commentFromSupllier} price = {bid.price} id = {bid.id}/>) 
        
  return (
    <div className='MyHistory' >
            

        <div style={{display:'flex', flexDirection:'column', alignItems:'center',textAlign:'center'}} className="TenderList">
        <HeaderCard pageName = {'MyHistory'} />
            <button className='BtnShowTender' onClick={e => showTenders(e)} >↓↓   לחץ כאן כדי להציג את היסטוריית הבקשות שלך    ↓↓ </button>
            {/* <button style={{backgroundColor:'lightblue', borderRadius:'15px', border:'3px solid darkgray', fontFmail:'cursive',fontSize:'18px',fontWeight:'bold', width:'60%',marginTop:'25px'}} onClick={e => showBids(e)} >↓↓   לחץ כאן כדי להציג את היסטוריית הצעות המחיר שלך    ↓↓ </button> */}

        </div>

        <div className='TenderList' >
            {tenderStr}
        </div>
        <div className='tenderStrCard' >
            {BidsStr}
        </div>

        {/* <div style={{display:'flex', margonTop:'50px',flexDirection:'column'}} className='tenderStrCard' >
            {BidsStr.length > 0? 
            <h1 style={{color:'white', textAlign:'center',marginTop:'50px'}}>הצעות המחיר שלי</h1> 
            : null }
            <br />
            {BidsStr}
        </div> */}
        
            

        



    </div>



  )
}
