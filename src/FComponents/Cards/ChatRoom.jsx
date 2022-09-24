// import React,{useState} from 'react';
// import { collection, getDocs, doc, deleteDoc } from "firebase/firestore"; 
// import db from "../utils/Firebase";


// export default function ChatRoom() {

//     const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
//     const [friends, setFriends] = useState([]);
//     let arr = new Array();


//     const getFriends = async () => {
//         try{
//             const querySnapshot = await getDocs(collection(db, "Deals"));
//             querySnapshot.forEach((docEl) => {          
//                 if(docEl.data().clientEmail === sessionUser.emailUser){
//                     arr.push({ email: docEl.data().supllierEmail})
//             }});
//             setFriends(arr);
//         }
//         catch{
//             alert("wrong")
//         }
//     }

//     // const messageRef = db.collection('messages');
//     // const query = messageRef.orderBy('createdAt').limit(25);

//     // const [messages] = useCollectionData(query, { idField: 'id' });

//     return (
//             <div>
//                 <header style={{padding:'5px'}} > Chat </header>
//                 <button onClick={getFriends} >show chats</button>
//                 <hr />
//                 <personChat friends = {friends} />
//                 {/* {messages && messages.map(msg => <ChatMessage key = {msg.id} message={msg} /> )} */}

//             </div>


//     )
// }

// function personChat(props){
//     console.log(props.friends);
//     return (
//         <div> {props.friends.map(friend => <h1> friend </h1>)} </div>
            
//     )
// }

// // function ChatMessage(props){
// //     const { text, uid} = props.message;
// //     return<p>{text}</p>
// // }
