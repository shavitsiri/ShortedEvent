import React, { useEffect, useState } from 'react';
import TenderCard from '../Cards/TenderCard';
import HeaderCard from '../../Icons/HeaderCard';
import "../../Styles/Pages.css";
import { collection, getDocs, doc, deleteDoc } from "firebase/firestore";
import db from "../utils/Firebase";
import Popup from 'reactjs-popup';


export default function Tenders() {

    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
    const [tendersArrPublic, settendersArrPublic] = useState([]);
    const [tendersArrPrivate, settendersArrPrivate] = useState([]);
    const [tender, setTender] = useState(null);
    // const [sendOfferToClient, setSendOfferToClient] = useState(false);
    let arrPublicTendersTemp = [];
    let arrPrivateTendersTemp = [];
    let tenderStr = [];
    let tendetPrSte = [];


    const getTenders = async () => {
        console.log("im get tenders");
        try {
            const querySnapshot = await getDocs(collection(db, "Tenders"));
            querySnapshot.forEach(async (docEl) => {
                if (sessionUser.type === docEl.data().supllierType && docEl.data().public === true) {
                    arrPublicTendersTemp.push({
                        fullName: docEl.data().fullName, email: docEl.data().email, city: docEl.data().city, street: docEl.data().street, houseNumber: docEl.data().houseNumber,
                         phoneNumber: docEl.data().phoneNumber, date: docEl.data().date, supllierType: docEl.data().supllierType,
                         requireList: docEl.data().requireList.map((req)=>req.label+", "),  comment: docEl.data().comment, id: docEl.data().id, key: docEl.id
                    });
                }
                if(sessionUser.type === docEl.data().supllierType && docEl.data().public === false){
                    arrPrivateTendersTemp.push({
                        fullName: docEl.data().fullName, email: docEl.data().email, city: docEl.data().city, street: docEl.data().street, houseNumber: docEl.data().houseNumber,
                         phoneNumber: docEl.data().phoneNumber, date: docEl.data().date, supllierType: docEl.data().supllierType,
                         requireList: docEl.data().requireList.map((req)=>req.label+", "),  comment: docEl.data().comment, id: docEl.data().id, key: docEl.id
                    });
                }
            });
            console.log('arrPublicTendersTemp ==> ', arrPublicTendersTemp)
            settendersArrPublic(arrPublicTendersTemp);
            settendersArrPrivate(arrPrivateTendersTemp);
        }
        catch (error) {
            alert(error)
        }
    }

    
    



    // const showTenders = async () => {
    //     try {
    //         const querySnapshot = await getDocs(collection(db, "Tenders"));
    //         querySnapshot.forEach(async (docEl) => {
    //             if (sessionUser.type === docEl.data().supllierType && docEl.data().public === true) {
    //                 arrPublicTendersTemp.push({
    //                     fullName: docEl.data().fullName, email: docEl.data().email, city: docEl.data().city, street: docEl.data().street, houseNumber: docEl.data().houseNumber,
    //                     phoneNumber: docEl.data().phoneNumber, date: docEl.data().date, supllierType: docEl.data().supllierType,
    //                     requireList: docEl.data().requireList, comment: docEl.data().comment, id: docEl.data().id, key: docEl.id
    //                 });
    //             }
    //             if (sessionUser.type === docEl.data().supllierType && docEl.data().public === false) {
    //                 if (docEl.data().supllierEmail === sessionUser.emailUser) {
    //                     arrPrivateTendersTemp.push({
    //                         fullName: docEl.data().fullName, email: docEl.data().email, city: docEl.data().city, street: docEl.data().street, houseNumber: docEl.data().houseNumber,
    //                         phoneNumber: docEl.data().phoneNumber, date: docEl.data().date, supllierType: docEl.data().supllierType,
    //                         requireList: docEl.data().requireList, comment: docEl.data().comment, id: docEl.data().id, supllierEmail: docEl.data().supllierEmail, key: docEl.id
    //                     });
    //                 }

    //             }

    //         });
    //         settendersArrPublic(arrPublicTendersTemp);
    //         settendersArrPrivate(arrPrivateTendersTemp);
    //     }
    //     catch (e) {
    //         alert(e, "shalom")
    //     }
    // }

    // const sendOffer = () => {
    //     console.log("shalom");
    // }

    // const changeToSenfOffer = () => {

    // }


    useEffect(() => {
        getTenders();
    }, [])




    tenderStr = tendersArrPublic.map((tend, index) => <TenderCard key={index} fullName={tend.fullName} email={tend.email} city={tend.city} street={tend.street}
         houseNumber={tend.houseNumber} phoneNumber={tend.phoneNumber}  supllierType={tend.supllierType} requireList ={tend.requireList}
        comment={tend.comment} date = {tend.date} id = {tend.id} />);

    tendetPrSte = tendersArrPrivate.map((tend, index) => <TenderCard key={index} fullName={tend.fullName} email={tend.email} city={tend.city} street={tend.street}
    houseNumber={tend.houseNumber} phoneNumber={tend.phoneNumber}  supllierType={tend.supllierType} requireList ={tend.requireList}
   comment={tend.comment} date = {tend.date} id = {tend.id} />);

    // let privateTendersStr = [];
    // privateTendersStr = tendersArrPrivate.map((tend, index) => <TenderCard key={index} fullName={tend.fullName} email={tend.email} city={tend.city} street={tend.street}
    //     houseNumber={tend.houseNumber} phoneNumber={tend.phoneNumber} date={tend.date} supllierType={tend.supllierType} 
    //     requireList={tend.requireList} comment={tend.comment} id={tend.id} supllierEmail={tend.supllierEmail} />)

    return (
        <div style={{ margin: '25px' }} >
            <div className="TenderList">
                {tenderStr}
            </div>
            <h1 style={{color:'black'}} >מכרזים פרטיים</h1>
            <div className="TenderList" >  
                {tendetPrSte}
            </div>




        </div>




    )
}
