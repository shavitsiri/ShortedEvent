import React, { PureComponent, useEffect, useState } from 'react';
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer, CartesianGrid, BarChart, Bar, Cell, XAxis, YAxis, } from 'recharts';
import { collection, getDocs } from "firebase/firestore";
import db from "../utils/Firebase";
import '../../Styles/Graphs.css';



export default function Graphs() {

    // Variables and States for Users Data
    const [AllUsers, setAllUsers] = useState();
    const [countSupllliers, setCountSupllliers] = useState(0);
    const [countCLient, setCountCLient] = useState(0);
    const [countManager, setCountManager] = useState(0);
    let allUsersArr = [];
    let countSupplierstemp = 0;
    let countmanagertemp = 0;
    let countClienttemp = 0;


    //get All Users Function
    const GetUsers = async (event) => {
        try {
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                if (doc.data().type === "לקוח") { // בדיקה אם המשתמש הוא לקוח
                    countClienttemp++; // הוסף לספירת לקוחות
                }
                if(doc.data().type === "מנהל"){ // בדיקה אם המשתמש הוא מנהל
                    countmanagertemp++; // הוסף לספירת מנהלים
                }
                if(doc.data().type !== "מנהל" && doc.data().type !== "לקוח") { // בדיקה אם המשתמש הוא ספק
                    countSupplierstemp++; // הוסף לספירת ספקים
                }
                allUsersArr.push(doc);
            });
            setCountSupllliers(countSupplierstemp); // השמת מספר הספקים במשתנה סטטי
            setCountCLient(countClienttemp); // השמת מספר הלקוחות במשתנה סטטי
            setCountManager(countmanagertemp); // השמת מספר המנהלים במשתנה סטטי
            setAllUsers(allUsersArr); // הוספת מערך המשתמשים למשתנה סטטי
        }
        catch(e) {
            alert(e);
        }
    }

    //Variables for Tenders Data
    const [countDjTender, setCountDjTender] = useState(0);
    const [countCateringTender, setCountCateringTender] = useState(0);
    const [countBarTender, setCountBarTender] = useState(0);
    const [countequipmentTender, setCountequipmentTender] = useState(0);
    let arrTenders = [];
    let countTenderDjTemp = 0;
    let countTenderBarTemp = 0;
    let countTenderCateringTemp = 0;
    let countTenderEquipmentTemp = 0;

    //Get All Tenders Function
    const GetTenders = async (event) => {
        try {
            const querySnapshot = await getDocs(collection(db, "Tenders"));
            querySnapshot.forEach((doc) => {
                if (doc.data().supllierType === "דיגיי") {
                    countTenderDjTemp++;
                }
                if (doc.data().supllierType === "בר") {
                    countTenderBarTemp++;
                }
                if (doc.data().supllierType === "ציוד") {
                    countTenderEquipmentTemp++;
                }
                if (doc.data().supllierType === "קייטרינג") {
                    countTenderCateringTemp++;
                }
                arrTenders.push(doc);
            });
            setCountBarTender(countTenderBarTemp);
            setCountDjTender(countTenderDjTemp);
            setCountequipmentTender(countTenderEquipmentTemp);
            setCountCateringTender(countTenderCateringTemp);
            // setAllUsers(allUsersArr);
        }
        catch {
            alert("wrong");
        }
    }

    // Variables for ContactUs Data
    const [countSubject, setCountSubject] = useState(0);
    const [countsubjectRegi, setCountsubjectRegi] = useState(0);
    const [countSubjectComplain, setCountSubjectComplain] = useState(0);
    const [countSubjectBug, setCountSubjectBug] = useState(0);
    const [countSubjectOther, setCountSubjectOther] = useState(0);
    let countSubjectsRegiTemp = 0;
    let countSubjectsComplainTemp = 0;
    let countSubjectsBugTemp = 0;
    let countSubjectsOtherTemp = 0;
    let contactArrTemp = 0;

    //Get All ContactUs Function
    const GetContactUs = async (event) => {
        try {
            const querySnapshot = await getDocs(collection(db, "ContactUs"));
            querySnapshot.forEach((doc) => {
                if (doc.data().subject === "הרשמה") {
                    countSubjectsRegiTemp++;
                }
                if (doc.data().subject === "תלונה") {
                    countSubjectsComplainTemp++;
                }
                if (doc.data().subject === "באג") {
                    countSubjectsBugTemp++;
                }
                if (doc.data().subject === "אחר") {
                    countSubjectsOtherTemp++;
                }
                arrTenders.push(doc);
            });
            setCountsubjectRegi(countSubjectsRegiTemp);
            setCountSubjectComplain(countSubjectsComplainTemp);
            setCountSubjectBug(countSubjectsBugTemp);
            setCountSubjectOther(countSubjectsOtherTemp);
            // setAllUsers(allUsersArr);
        }
        catch {
            alert("wrong");
        }
    }

    // Variables for ContactUs Data
    const [countDjDelas, setCountDjDelas] = useState(0);
    const [countBarDeals, setCountBarDeals] = useState(0);
    const [countEquipmentDeals, setCountEquipmentDeals] = useState(0);
    const [countCateringDeals, setCountCateringDeals] = useState(0);
    const [sumOfBarPrices, setSumOfBarPrices] = useState(0);
    const [sumOfDjPrices, setSumOfDjPrices] = useState(0);
    const [sumOfEquipPrices, setSumOfEquipPrices] = useState(0);
    const [sumOfCateringPrices, setSumOfCateringPrices] = useState(0);
    const [supllierNames, setSupllierNames] = useState([]);
    const [supllierCountDealsByName, setSupllierCountDealsByName] = useState([]);
    let countDjDealsTemp = 0;
    let sumFromDj = 0;
    let countBarDealsTemp = 0;
    let sumFromBar = 0;
    let countEquipmentDealsTemp = 0;
    let sumFromEquip = 0;
    let countCateringDealsTemp = 0;
    let sumFromCatering = 0;
    let dealsArrTemp = [];
    let arrSupplierNames = [];

    //Get All Deals Function
    const GetDeals = async (event) => {
        try {
            const querySnapshot = await getDocs(collection(db, "Deals"));
            querySnapshot.forEach((doc) => {
                if (doc.data().supllierType === "דיגיי") {
                    countDjDealsTemp++;
                    sumFromDj+= parseInt(doc.data().price);
                }
                if (doc.data().supllierType === "בר") {
                    countBarDealsTemp++;
                    sumFromBar+= parseInt(doc.data().price);
                }
                if (doc.data().supllierType === "ציוד") {
                    countEquipmentDealsTemp++;
                    sumFromEquip+= parseInt(doc.data().price);
                }
                if (doc.data().supllierType === "קייטרינג") {
                    countCateringDealsTemp++;
                    sumFromCatering+= parseInt(doc.data().price);
                }
                dealsArrTemp.push(doc);
            });
            
            let names = [];
            for(let i = 0; i < dealsArrTemp.length; i++){
                if(!names.includes(dealsArrTemp[i].data().supllierName)){
                    names.push(dealsArrTemp[i].data().supllierName);
                }
            }
            let countPerName = new Array(names.length);
            for(let i = 0; i < countPerName.length; i++){
                countPerName[i] = 0;
            }
            for(let i = 0; i < dealsArrTemp.length; i++){
                for(let j = 0; j < names.length; j++){
                    if(dealsArrTemp[i].data().supllierName === names[j]){
                        countPerName[j]++;
                    }
                }
                console.log(countPerName);
            }
            console.log(names);
            setSupllierNames(names);
            setSupllierCountDealsByName(countPerName);
            setCountDjDelas(countDjDealsTemp);
            setCountBarDeals(countBarDealsTemp);
            setCountEquipmentDeals(countEquipmentDealsTemp);
            setCountCateringDeals(countCateringDealsTemp);
            setSumOfBarPrices(sumFromBar);
            setSumOfDjPrices(sumFromDj);
            setSumOfEquipPrices(sumFromEquip);
            setSumOfCateringPrices(sumFromCatering);
            // setAllUsers(allUsersArr);
        }
        catch (e) {
            alert(e);
        }
    }

    useEffect(() => {
        GetUsers();
        GetTenders();
        GetContactUs();
        GetDeals();
    }, [])
    



    const dataUserTypes = [
        { name: 'ספק', value: countCLient },
        { name: 'לקוח', value: countSupllliers },
        { name: 'מנהל', value: countManager },
    ];

    const dataTenderTypes = [
        { name: 'דיגיי', value: countDjTender },
        { name: 'בר', value: countBarTender },
        { name: 'ציוד', value: countequipmentTender },
        { name: 'קייטרינג', value: countCateringTender },
    ];
    const dataContactUsTypes = [
        { name: 'הרשמה', value: countsubjectRegi },
        { name: 'תלונה', value: countSubjectComplain },
        { name: 'באג', value: countSubjectBug },
        { name: 'אחר', value: countSubjectOther },
    ];

    const dataDealsTypes = [
        { name: 'דיגיי', value: countDjDelas },
        { name: 'בר', value: countBarDeals },
        { name: 'ציוד', value: countEquipmentDeals },
        { name: 'קייטרינג', value: countCateringDeals },
    ];
    const dataDealsSumPrices = [
        { name: 'דיגיי', totalSum: sumOfDjPrices },
        { name: 'בר', totalSum: sumOfBarPrices },
        { name: 'ציוד', totalSum: sumOfEquipPrices },
        { name: 'קייטרינג', totalSum: sumOfCateringPrices },
    ];


    let dataCountDealsPerSupllier = [];
    for(let i = 0; i < supllierNames.length; i++){
        dataCountDealsPerSupllier[i] = {name:supllierNames[i], value: supllierCountDealsByName[i]};
    }
    console.log(dataCountDealsPerSupllier);
    



    return (
        <div className='mainDivGraphs'  >
            <h1>סטטיסטיקות באתר</h1>
            <div className='divHoldDiagrams' >
                <div className='divEachDiagram'  >
                    <h5>כמות סוגי משתמשים</h5>
                    <PieChart width={300} height={250}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={dataUserTypes}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>


                <div className='divEachDiagram'  >
                    <h5>כמות המכרזים לפי סוג ספק</h5>
                    <PieChart width={300} height={250}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={dataTenderTypes}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>


                <div className='divEachDiagram' >
                    <h5>כמות פניות לפי נושא </h5>
                    <PieChart width={300} height={250}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={dataContactUsTypes}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>

                <div className='divEachDiagram'  >
                    <h5>כמות עסקאות לפי סוג ספק   </h5>
                    <PieChart width={300} height={250}>
                        <Pie
                            dataKey="value"
                            isAnimationActive={false}
                            data={dataDealsTypes}
                            cx="50%"
                            cy="50%"
                            outerRadius={80}
                            fill="#8884d8"
                            label
                        />
                        <Tooltip />
                    </PieChart>
                </div>

                <div className='divEachDiagram'  >
                    <h5>כמות כסף לפי סוגי ספק   </h5>
                    <BarChart
                        width={400}
                        height={300}
                        data={dataDealsSumPrices}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="totalSum" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>
                </div>

                <div className='divEachDiagram'  >
                    <h5>כמות עסקאות לפי שם ספק   </h5>
                    <BarChart
                        width={400}
                        height={300}
                        data={dataCountDealsPerSupllier}
                        margin={{
                            top: 5,
                            right: 30,
                            left: 20,
                            bottom: 5,
                        }}
                        barSize={20}
                    >
                        <XAxis dataKey="name" scale="point" padding={{ left: 10, right: 10 }} />
                        <YAxis />
                        <Tooltip />
                        <Legend />
                        <CartesianGrid strokeDasharray="3 3" />
                        <Bar dataKey="value" fill="#8884d8" background={{ fill: '#eee' }} />
                    </BarChart>
                </div>

            </div>

        </div>
    )
}
