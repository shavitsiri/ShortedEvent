import React, { useEffect, useState } from 'react';
import TenderCard from '../Cards/TenderCard';
import HeaderCard from '../../Icons/HeaderCard';
import "../../Styles/MyHistory.css";
import { collection, getDocs, doc } from "firebase/firestore"; 
import db from "../utils/Firebase";
import BidCard from '../Cards/BidCard';

export default function MyOffers() {

    // Get Login User
    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
    
    //States && Variables
    const [bids, setBids] = useState([]);
    let arrBids = new Array();

    //Functions
    const showBids = async () => {
        try{
            const querySnapshot = await getDocs(collection(db, "Bids"));
            querySnapshot.forEach((docEl) => {
                console.log(docEl.data().clientEmail);
                
                if(docEl.data().clientEmail === sessionUser.emailUser){
                    console.log("hii151515");
                    arrBids.push({clientEmail: docEl.data().clientEmail, clientName: docEl.data().clientName, clientPhone: docEl.data().phoneNumber, commentFromSupllier: docEl.data().commentFromSupllier,
                        supllierPhone: docEl.data().supllierPhone, supllierType: docEl.data().supllierType, requireList: docEl.data().requireList, date :docEl.data().date, price: docEl.data().price, supllierEmail: docEl.data().supllierEmail,supllierName: docEl.data().supllierName, id: docEl.data().id, address: docEl.data().address})
            }});
            setBids(arrBids);
        }
        catch{
            alert("wrong")
        }
    }


    useEffect(() => {
        showBids();
    }, [])
    

    // Get Every Bid in a appropriate card
    let BidsStr = bids.map((bid,index) => <BidCard  key = {index} clientName = {bid.clientName} clientEmail = {bid.clientEmail} clientPhone = {bid.clientPhone} address = {bid.address} date = {bid.date}
         supllierType = {bid.supllierType} requireList = {bid.requireList}  supllierEmail ={bid.supllierEmail} supllierName = {bid.supllierName}
            commentFromSupllier = {bid.commentFromSupllier} price = {bid.price} id = {bid.id} supllierPhone = {bid.supllierPhone}  />) 
        
  return (
    <div style={{display:'flex', flexDirection:'column', alignItems:'center',textAlign:'center',minHeight:'80vh'}} >
            <HeaderCard pageName = {'הצעות המחיר שלי'} />
            <div className='TenderList' >
                {BidsStr}
            </div>
    </div>
  )
}
