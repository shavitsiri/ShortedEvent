import React, { useEffect, useState, useRef } from 'react';
import GutterlessList from '../Cards/GutterlessList';
import MessengerCard from '../Cards/MessengerCard';
import { collection, getDocs, doc, addDoc, setDoc } from "firebase/firestore";
import db from "../utils/Firebase";
import AlignItemsList from '../Cards/AlignItemsList';
import { Timestamp } from 'firebase/firestore';
import '../../Styles/Messenger.css';
import SendIcon from '@mui/icons-material/Send';
import { useNavigate } from 'react-router-dom';



export default function Messenger() {

  //Navigation
  const navigate = useNavigate();

  // ref for scrolling auto to bottom of chat conversation div
  const bottomRef = useRef(null);

  // States
  const [haveDeals, setHaveDeals] = useState(false);
  const [text, setText] = useState();

  // Variables
  let messageTemp;
  let conversationStr;

  // שמירת פרטי המשתמש המחובר ואיזה סוג לקוח הוא
  let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`));
  let sessionUserType = sessionUser.type;

  // שמירה במערך של עסקאות של המשתמש המחובר
  let dealsTemp2Push = [];
  const [dealsOfUserSession, setDealsOfUserSession] = useState([]);

  // שמירה במערך את פרטי המשתמשים שיש להם עסקאות עם המשתמש המחובר
  let peopleDeals = [];
  const [peopleHaveDeals, setPeopleHaveDeals] = useState();

  // שמירה של היסטוריית השיחה בין המשתמשים
  let history = [];
  const [conHistory, setConHistory] = useState([]);


  const [chatWith, setChatWith] = useState(null);
  const [chatWithName, setchatWithName] = useState(null);
  const [message, setMessage] = useState();


  // Function get Deals Of the session User
  const getDeals = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Deals"));
      querySnapshot.forEach((docEl) => {
        if (docEl.data().clientEmail === sessionUser.emailUser || docEl.data().supllierEmail === sessionUser.emailUser) {
          if (sessionUserType === 'לקוח') {
            dealsTemp2Push.push({ name: docEl.data().supllierName, email: docEl.data().supllierEmail });
            setHaveDeals(true);
          }
          if (sessionUserType !== 'לקוח' && sessionUserType !== 'מנהל') {
            dealsTemp2Push.push({ name: docEl.data().clientName, email: docEl.data().clientEmail });
            setHaveDeals(true);
          }
        }
      });
      let result = dealsTemp2Push.filter((person, index) => index === dealsTemp2Push.findIndex(other => person.email === other.email));
      setDealsOfUserSession(result);
      console.log(result);
    }
    catch (e) {
      alert(e)
    }
  }

  // Function get the data of the deals of the session User
  const getDetailsOfPeopleDeals = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "Users"));
      console.log(dealsOfUserSession);
      querySnapshot.forEach((docEl) => {
        for (let i = 0; i < dealsOfUserSession.length; i++) {
          if (dealsOfUserSession[i].email == docEl.data().email) {
            peopleDeals.push(docEl.data());
          }
        }
      });
      setPeopleHaveDeals(peopleDeals);
      console.log(peopleDeals);
    }
    catch (e) {
      alert(e)
    }
  }

  // Function add message to firebase and render the conversation div
  const sendMessage = async () => {
    const querySnapshot = await getDocs(collection(db, 'Messages')); 
    let messageSent = false; 
    let idDoc = "";
    history = [];
    try {
      querySnapshot.forEach(async (docEl) => {
        if (sessionUser.emailUser + chatWith === docEl.id) { // בדיקה אם המפתח המזהה של הצאט שווה לאימייל של המשתמש המחובר והמשתמש שאיתו פתוח הצאט
          idDoc = sessionUser.emailUser + chatWith; // מקבל את המפתח המזהה של הצאט
          messageSent = true; // שליחת הודעה מקבלת אמת
        }
        if (chatWith + sessionUser.emailUser === docEl.id) {// בדיקה אם המפתח המזהה של הצאט הפוך מהתנאי הקודם
          idDoc = chatWith + sessionUser.emailUser// מקבל את המפתח המזהה של הצאט
          messageSent = true;// שליחת הודעה מקבלת אמת
        }
        if (idDoc === docEl.id) { // בדיקה אם אנחנו נמצאים במסמך של השיחה הנוכחית
          for (let i = 0; i < docEl.data().conversation.length; i++) { // לולאה לקבלת מערך השיחה
            history.push(docEl.data().conversation[i]); // השמה של כל מיקום במערך השיחה במערך ההיסטוריה הזמני
          }
        }
      });
      if (messageTemp !== undefined && idDoc !== "") { // בדיקה שאובייקט ההודעה לא ריק
        history.push(messageTemp); // מוסיף את ההודעה למערך ההיסטוריה הזמני
        await setDoc(doc(db, 'Messages', idDoc), { // השמה במסמך את היסטוריית השיחה המעודכנת
          conversation: history 
        });
      }
      if (messageTemp !== undefined && messageSent === false) { // בדיקה אם נשלחה כבר הודעה אם לא מתבצעת יצירה של מסמך צאט חדש 
        idDoc = sessionUser.emailUser + chatWith;  // מקבל את המפתח המזהה של הצאט
        history.push(messageTemp); // מוסיף את ההודעה למערך ההיסטוריה הזמני
        await setDoc(doc(db, 'Messages', idDoc), { // השמה במסמך את היסטוריית השיחה המעודכנת
          conversation: history
        });
      }
      setConHistory(history); // השמה של ההיסטוריה במערך סטטי שיתרנדר בצאט
      // getHistory(); // קריאה לפונקציה שמקבלת את ההיסטוריה
    }
    catch (e) {
      alert(e)
    }
  }



  // Function get the history of conversation from firebase
  const getHistory = async () => {
    const querySnapshot = await getDocs(collection(db, 'Messages'));
    let idDoc;
    let refresh = false;
    querySnapshot.forEach(async (docEl) => {
      if (sessionUser.emailUser + chatWith === docEl.id) {
        idDoc = sessionUser.emailUser + chatWith
      }
      else {
        idDoc = chatWith + sessionUser.emailUser
      }
      if (idDoc === docEl.id) {
        refresh = true;
        history = [];
        console.log(docEl.data().conversation);
        for (let i = 0; i < docEl.data().conversation.length; i++) {
          console.log(docEl.data().conversation[i].sender);
          history.push({ sender: docEl.data().conversation[i].sender, message: docEl.data().conversation[i].message, time: docEl.data().conversation[i].time })
        }
        console.log(history);
      }
    });
    if (refresh === true) {
      setConHistory(history);
    }
    else {
      setConHistory(null);
    }
  }

  // Function create Message Object
  const setMessageData = () => {
    let timeStamp = new Date().getTime();
    let dateNow = new Date(timeStamp);
    messageTemp = { sender: sessionUser.emailUser, message: text, time: dateNow.getDate() + "." + (dateNow.getMonth() + 1) + "." + dateNow.getFullYear() + " " + dateNow.getHours() + ":" + dateNow.getMinutes() };
    setMessage(messageTemp);
  }


  const handleChange = () => {
    getDeals();
  }

  const addMessage = async () => {
    setMessageData();
    if (conHistory !== null) {
      setConHistory([...conHistory, messageTemp]);
    }
    sendMessage();
    ClearField();
  }
  // Function Open chat with person 
  const openChat = (email, name) => {
    setChatWith(email);
    setchatWithName(name);
    getDetailsOfPeopleDeals();
    getHistory();
  }

  useEffect(() => {
    handleChange();
    setConHistory(null);
    getHistory();
  }, [chatWith])


  // FUnction clear fiwld after sending message
  const ClearField = () => {
    document.getElementById("textFieldInputMessage").value = "";
  }

  // const showDateAndHour = () => {
  //   let timeStamp = new Date().getTime();
  //   let dateNow = new Date(timeStamp);
  //   console.log(dateNow.getDate() + "." + (dateNow.getMonth() + 1) + "." + dateNow.getFullYear() + " " + dateNow.getHours() + ":" + dateNow.getMinutes());

  // }


  let printList = dealsOfUserSession.map((person, index) => <AlignItemsList key={index} openChat={openChat} email={person.email} name={person.name} />)

  console.log(conHistory);
  if (conHistory !== null) {
    conversationStr = conHistory.map((m, index) => m.sender === sessionUser.emailUser ? <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'row', backgroundColor: '#1A6D4C', borderRadius: '12px', padding: '3px', marginRight: '15px', marginTop: '5px', width: 'fit-content', placeSelf: 'flex-end' }} >
      <label style={{ fontSize: '9px', marginRight: '8px', marginTop: '8px' }} >{m.time}</label>
      <label style={{ fontSize: '12px', marginRight: '8px' }} >{m.message}</label>
    </div>
      :
      <div style={{ maxWidth: '300px', display: 'flex', flexDirection: 'row', backgroundColor: '#424343', fontSize: '14px', borderRadius: '12px', textAlign: 'left', padding: '3px', marginLeft: '15px', marginTop: '5px', width: 'fit-content', placeSelf: 'flex-start' }} >
        <label style={{ fontSize: '9px', marginRight: '8px', marginTop: '8px' }} >{m.time}</label>
        <label style={{ fontSize: '12px', marginRight: '8px' }} >{m.message}</label>
      </div>)
  }

  useEffect(() => {
    // 👇️ scroll to bottom every time messages change
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [conHistory]);


  return (
    <div className='mainDivMessenger'  >

      <div className='divHoldChat'>

        <div className='divHoldPeopleList' >
          <label style={{ textAlign: 'center', backgroundColor: '#9EFF9B', borderRadius: '8px', fontWeight: 'bold' }} > : אנשים לצ'אט </label>
          {printList}
        </div>


        <div className='divHoldNameChatAndConversation'  >
          {chatWith !== null ?
            <div className='divHoldNameChat' >
              <label className='nameOfChatWith' >  {chatWithName.split('@')[0]}</label>
              <div />

              <div className='divHoldConversation' >
                {conversationStr}
                <div ref={bottomRef} />
              </div>

              <div className="divHoldInputAndBtn">
                <input id='textFieldInputMessage' className='inputMessage' type="text" placeholder='...כתוב כאן' onChange={(e) => setText(e.target.value)} />
                <button className='BtnSendMessage' onClick={addMessage} > <SendIcon /> </button>
              </div>


            </div>
            :
            <div className='divNoChatOpen' >
              {haveDeals ? <div>
                <label style={{ color: 'lightgray' }} >לחץ על אחד המשתמשים </label>
                <label style={{ color: 'lightgray' }} > ברשימה על מנת לפתוח צאט</label>
              </div>
                :
                <div>
                  <label style={{ color: 'lightgray' }} >  אין לך עסקאות עם ספקים כדי לדבר איתם  </label>
                  <button onClick={() => navigate('/CreateEvent')} >עבור ליצירת אירוע</button>
                </div>

              }

            </div>
          }
        </div>
      </div>

    </div>
  )
}
