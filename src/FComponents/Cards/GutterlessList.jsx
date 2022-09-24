import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import CommentIcon from '@mui/icons-material/Comment';
import IconButton from '@mui/material/IconButton';
import {useState} from 'react';
import { collection, getDocs, doc } from "firebase/firestore";
import db from "../utils/Firebase";

export default function GutterlessList() {

    const [names, setNames] = useState([]);
    const [emails, setEmails] = useState([]);
    const [once, setOnce] = useState(0);

    const sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
    let namesArr = new Array();
    let emailssArr = new Array();


    const getPeople = async () => {
        try {
            const querySnapshot = await getDocs(collection(db, "Deals"));
            querySnapshot.forEach((docEl) => {
                if (docEl.data().clientEmail === sessionUser.emailUser || docEl.data().supllierEmail === sessionUser.emailUser) {
                    if(!(namesArr.includes(docEl.data().supllierName))){
                        namesArr.push(docEl.data().supllierName);
                        emailssArr.push(docEl.data().supllierEmail);
                    }               
                }
            });
            setNames(namesArr);
            setEmails(emailssArr);
            console.log("names = ", namesArr);
        }
        catch {
            alert("wrong")
        }
    }

    const createNewChat = async (nameRef) => {

      try {
        const querySnapshot = await getDocs(collection(db, "messages2"));
        querySnapshot.forEach((docEl) => {
            console.log(docEl.data());
        });
    }
    catch {
        alert("wrong")
    }

    }

    const openChat = (e, value) => {
      e.preventDefault();
      try{
        let nameRef = sessionUser.fullName+" , "+value;
        console.log(nameRef);
        alert(nameRef.includes(sessionUser.fullName))
        createNewChat(nameRef);
      }
      catch(error){
        alert("error = " , error)
      }
    }

    if (once == 0) {
        setOnce(1);
        getPeople();
    }
  return (
    <List sx={{ width: '100%', maxWidth: 150, bgcolor: 'background.paper' ,borderRadius:'10px', boxShadow:'2px 2px 5px 5px black',margin:'6px'}}>
      {names.map((value) => (
        <ListItem
          key={value}
          disableGutters
          secondaryAction={
            <IconButton aria-label="comment" onClick={(e) => openChat(e, value)} >
              <CommentIcon   />
            </IconButton>
          }
        >
          <ListItemText style={{marginLeft:'25px'}}  primary={` ${value}`} />
        </ListItem>
      ))}
    </List>
  );
}
