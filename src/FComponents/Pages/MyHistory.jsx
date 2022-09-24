import React, { useEffect, useState } from 'react';
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
    let arrtenders = new Array();
    let arrBids = new Array();

    const showTenders = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Tenders"));
            querySnapshot.forEach((docEl) => {
                if (docEl.data().email === sessionUser.emailUser) {
                    arrtenders.push({
                        fullName: docEl.data().fullName, email: docEl.data().email, city: docEl.data().city, street: docEl.data().street, houseNumber: docEl.data().houseNumber,
                        phoneNumber: docEl.data().phoneNumber, date: docEl.data().date, supllierType: docEl.data().supllierType,
                        requireList: docEl.data().requireList[0].label, comment: docEl.data().comment, id: docEl.data().id
                    })
                }
            });
            setTenders(arrtenders);
        }
        catch(e) {
            alert(e)
        }
    }

    const showBids = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Bids"));
            querySnapshot.forEach((docEl) => {
                if (docEl.data().clientEmail === sessionUser.emailUser) {
                    arrBids.push({
                        clientEmail: docEl.data().clientEmail, clientName: docEl.data().clientName, clientPhone: docEl.data().phoneNumber, commentFromSupllier: docEl.data().commentFromSupllier,
                        supllierPhone: docEl.data().supllierPhone, supllierType: docEl.data().supllierType, requireList: docEl.data().requireList, date: docEl.data().date, price: docEl.data().price, supllierEmail: docEl.data().supllierEmail, supllierName: docEl.data().supllierName, id: docEl.data().id, address: docEl.data().address
                    })
                }
            });
            setBids(arrBids);
        }
        catch(e) {
            alert(e.massage)
        }
    }

    useEffect(() => {
        showTenders();
        showBids();
    }, [])
    

 


    let tenderStr = tenders.map((tend, index) => <TenderCard key={index} fullName={tend.fullName} email={tend.email} city={tend.city} street={tend.street} houseNumber={tend.houseNumber}
        phoneNumber={tend.phoneNumber} date={tend.date} supllierType={tend.supllierType}
        commentFromSupllier={tend.requireList} comment={tend.comment} id={tend.id} />) 



    let BidsStr = bids.map((bid, index) => <BidCard key={index} clientName={bid.clientName} clientEmail={bid.clientEmail} clientPhone={bid.clientPhone} address={bid.address} date={bid.date}
        supllierType={bid.supllierType} requireList={bid.requireList} supllierEmail={bid.supllierEmail} supllierName={bid.supllierName}
        commentFromSupllier={bid.commentFromSupllier} price={bid.price} id={bid.id} supllierPhone={bid.supllierPhone} />)

    return (
        <div className='MyHistory' >
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} className="TenderList">

                <HeaderCard pageName={'הצעות המחיר שלי'} />
                <div className='tenderStrCard' >
                    {BidsStr}
                </div>


                <HeaderCard pageName={'הבקשות שלי'} />
                <div className='TenderList' >
                    {tenderStr}
                </div>

            </div>
        </div>
    )
}
