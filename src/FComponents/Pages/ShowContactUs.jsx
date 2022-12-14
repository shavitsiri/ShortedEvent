import React, { useEffect, useState } from 'react';
import InquiriesCard from '../Cards/InquiriesCard';
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
import db from "../utils/Firebase";
import "../../Styles/ShowContatcUs.css";
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';




export default function ShowContactUs() {

    const [showHideInquires, setShowHideInquires] = useState(false);
    const [once, setOnce] = useState(0);

    let count = 1;
    let arr = new Array();
    const [arrToprint, setArrToprint] = useState();

    const ShowInquires = async () => {
      try{
        const querySnapshot = await getDocs(collection(db, "ContactUs"));
        querySnapshot.forEach(async(docEl) => {
                arr.push({id:count++, email:docEl.data().email, message: docEl.data().message, subject: docEl.data().subject})
        });
        setArrToprint(arr);
    }
    catch{
        alert("wrong")
    }
    setShowHideInquires(!showHideInquires);
    }

    useEffect(() => {
      ShowInquires();
    }, [])
    

  return (
    <div className='ContatcGridDiv' >
                            
        {showHideInquires? <InquiriesCard inquiresArr = {arrToprint} /> : null}
        
    </div>
  )
}
