import React, { useState } from 'react';
import { collection, getDocs, doc } from "firebase/firestore"; 
import db from "../utils/Firebase";
import DealCard from '../Cards/DealCard';
import "../../Styles/MyDeals.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';


export default function MyDeals()  {
    const [deals, setdeals] = useState([]);

    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
    let dealsArr = new Array();

    const ShowDeals = async(e) => {
        e.preventDefault();
        try  {
            const querySnapshot = await getDocs(collection(db, "Deals"));
            querySnapshot.forEach((docEl) => {
                
                if(docEl.data().clientEmail === sessionUser.emailUser || docEl.data().supllierEmail === sessionUser.emailUser){
                    console.log("hii");
                    dealsArr.push({clientEmail: docEl.data().clientEmail, clientName: docEl.data().clientName, 
                        supllierName: docEl.data().supllierName,supllierEmail: docEl.data().supllierEmail, price: docEl.data().price, 
                        commentFromSupllier: docEl.data().commentFromSupllier})
                }
            });
            setdeals(dealsArr);
        }
    
        catch{
            alert("wrong")
        }
    }


    let dealsStr =  deals.map((deal,index)=> <DealCard key = {index} clientEmail = {deal.clientEmail} clientName = {deal.clientName}
    supllierName = {deal.supllierName} supllierEmail = {deal.supllierEmail} price = {deal.price} commentFromSupllier = {deal.commentFromSupllier} /> ) ;

  return (
    <div className='myDealsDiv' >

                  <div style={{display:'flex', flexDirection:'column', alignItems:'center',textAlign:'center'}} >
                        <button className='BtnShowMyDeals' onClick={e => ShowDeals(e)} ><ArrowDownwardIcon/>   לחץ כאן כדי להציג את היסטוריית העסקאות  שלך  <ArrowDownwardIcon/>   </button>

                  </div>

                   
                

                <div className="DealsList">
                         {dealsStr}
                    </div>
                

    </div>
  )
}
