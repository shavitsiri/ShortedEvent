import React, { useEffect, useState } from 'react';
import { collection, getDocs, doc } from "firebase/firestore";
import db from "../utils/Firebase";
import DealCard from '../Cards/DealCard';
import "../../Styles/MyDeals.css";
import HeaderCard from '../../Icons/HeaderCard';


export default function MyDeals() {
    const [deals, setdeals] = useState([]);

    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
    let dealsArr = new Array();

    const ShowDeals = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Deals"));
            querySnapshot.forEach((docEl) => {
                if (docEl.data().clientEmail === sessionUser.emailUser || docEl.data().supllierEmail === sessionUser.emailUser) {
                    dealsArr.push({
                        clientEmail: docEl.data().clientEmail, clientName: docEl.data().clientName,
                        supllierName: docEl.data().supllierName, supllierEmail: docEl.data().supllierEmail, price: docEl.data().price,
                        commentFromSupllier: docEl.data().commentFromSupllier, supllierPhone: docEl.data().supllierPhone,
                        address: docEl.data().address, date: docEl.data().date, supllierType: docEl.data().supllierType,
                        clientPhone: docEl.data().clientPhone, requireList: docEl.data().requireList
                    })
                }
            });
            setdeals(dealsArr);
        }
        catch {
            alert("wrong")
        }
    }

    useEffect(() => {
        ShowDeals();
    }, [])
    

 

    let dealsStr = deals.map((deal, index) => <DealCard key={index} clientEmail={deal.clientEmail} clientName={deal.clientName}
        supllierName={deal.supllierName} date={deal.date} supllierEmail={deal.supllierEmail} price={deal.price} commentFromSupllier={deal.commentFromSupllier} supllierPhone={deal.supllierPhone} address={deal.address} supllierType={deal.supllierType} clientPhone={deal.clientPhone} />);

    return (
        <div className='myDealsDiv' >

            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }} >
                <HeaderCard pageName={'העסקאות שלי'} />
            </div>

            <div className="DealsList">
                {dealsStr}
            </div>

        </div>
    )
}
