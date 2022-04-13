import React,{useState} from 'react';

import HeaderCard from '../../Icons/HeaderCard';


export default function About() {
    const [name, setName] = useState()
    const [age,setAge] = useState();


    return (
        <div style={{textAlign:'center', minHeight:'86vh'}}>

            <div className="AboutInfo">
                
                shortedEVent - ברוכים הבאים ל  
                <br />
               .אנו פלטפורמה חדשה ליצירת אירועים ביתיים/פרטיים בניסיון למצוא את המחיר הכי נוח ובהשקעת מינימום מאמץ
               <br />
               ?אז איך בעצם הכל עובד
               <br />
               (...הסבר על השימוש)
            </div>

            

        </div>
    )
}
