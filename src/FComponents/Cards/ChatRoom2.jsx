import React,{useRef, useState} from 'react';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import {useAuthState} from 'react-firebase-hooks/auth';
import { useCollectionData } from 'react-firebase-hooks/firestore';
// import styles from  '../../Styles/ChatRoom2.css';

firebase.initializeApp({
  apiKey: "AIzaSyD_4uhw9Yer0ENRAiyxEty6QUa-6TTL7ws",
  authDomain: "finalfirestore-cb3d9.firebaseapp.com",
  projectId: "finalfirestore-cb3d9",
  storageBucket: "finalfirestore-cb3d9.appspot.com",
  messagingSenderId: "895859387118",
  appId: "1:895859387118:web:592643a8ce4e9b8d32e1ff",
  measurementId: "G-3BHTVCF2CX"
})


const auth = firebase.auth();
const firestore = firebase.firestore();

function ChatRoom2() {

  const [user] = useAuthState(auth);

  return (
    <div  >
      <ChatRoom/>
    </div>
  );
}

function ChatRoom(){

  const dummy = useRef();
  const messageRef = firestore.collection('messages');
  const query = messageRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, {idField: 'id'});

  const [formValue, setFormValue] = useState('');

  const sendMessage = async (e) => {
    e.preventDefault();
    const {uid, photoURL} = auth.currentUser;

    await messageRef.add({
      text: formValue,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL
    })
    setFormValue('');
    dummy.current.scrollIntoView({behavior: 'smooth'});
  }
  return (
    <div>
    <main  >
         {messages && messages.map((msg) => <ChatMessage key={msg.id} message = {msg} />)}
         <div ref={dummy} >
      
        </div>
    </main>
    
    <form onSubmit={sendMessage} >
        <input value={formValue} onChange={(e) => setFormValue(e.target.value)} />
        <button type='submit' >Send</button>
    </form>
    </div>
  )
}

function ChatMessage(props){
  const{text, uid, photoURL} = props.message;
  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'recived';
  return(
    <div className={`message ${messageClass}`} >
      <img   src={photoURL}/>
        <p> {text} </p>
    </div>

  )
}

export default ChatRoom2;
