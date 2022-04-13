import React from 'react';
import "../../Styles/MyDeals.css";

export default function (props) {
    const {clientName,clientEmail,supllierName,supllierEmail,price,commentFromSupllier} = props;
  return (
    <div className="DealCard">
    <p>
         {/* <b>שם מלא: </b> {fullName} <br/> 
          {email}<b>: אימייל</b>  <br/>  */}
           
        <b>שם לקוח: </b> {clientName}<br/>
        {clientEmail} <b>:אימייל לקוח</b><br/>
        
        <b>שם ספק : </b> {supllierName} <br/>
        {supllierEmail}<b> :אימייל ספק </b>  <br/>
        
        <b> הערות נוספות מהספק: </b> {commentFromSupllier} <br/>
        <b> מחיר: </b> {price} <br/>
    </p>

</div>
  )
}
