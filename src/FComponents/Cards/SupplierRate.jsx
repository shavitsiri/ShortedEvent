import React, { useEffect, useState } from 'react';
import '../../Styles/CardRateSupplier.css';
import db from "../utils/Firebase";
import {collection, getDocs,} from "firebase/firestore";
import { RateReview } from '@mui/icons-material';


export default function SupplierRate(props) {
    const { fullName, email, phoneNumber, supllierType } = props;

    const [countDeals, setcountDeals] = useState(0);
    let countDealsOfSup = 0;
    const [avgRate, setAvgRate] = useState(0);

    const getRate = async () => {
        let countRates = 0;
        let sumFromRates = 0;
        const queryDeals = await getDocs(collection(db, "Rates"));
        queryDeals.forEach(async (docEl) => {
            if (docEl.data().supllierEmail === email) {
                countRates++;
                sumFromRates += docEl.data().rate;
            }
        })
        setAvgRate(sumFromRates / countRates)
        countRates = 0;
        sumFromRates = 0;
    }

    const GetCountDeals = async () => {
        const queryDeals = await getDocs(collection(db, "Deals"));
        queryDeals.forEach(async (docDeal) => {
            if (docDeal.data().supllierEmail === email) {
                countDealsOfSup++;
            }
        })
        setcountDeals(countDealsOfSup)
        countDealsOfSup = 0;
    }

    useEffect(() => {
        GetCountDeals();
        getRate();
    }, [])

    console.log(avgRate);
    
    return (
        <div className='mainDivCardRate' >
            <div className='cardRate' >
                <label htmlFor="">{fullName}</label>
                <label htmlFor="">{email}</label>
                <label htmlFor="">{phoneNumber}</label>
                <label htmlFor="">{supllierType}</label>
                <label htmlFor=""> {countDeals}:כמות עסקאות באתר  </label>
                <label htmlFor=""> {avgRate > 0 ? avgRate : 0}:ממוצע דירוגים  </label>
            </div>
        </div>
    )
}
