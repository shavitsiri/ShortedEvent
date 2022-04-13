import {React, useState} from 'react';
import HeaderCard from '../../Icons/HeaderCard';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import "../../Styles/CreateEvent.css";
import AlertSuccess from '../../Icons/AlertSuccess';
import Select from 'react-select';
import { useNavigate } from 'react-router-dom';
import { MultiSelect } from "react-multi-select-component";
import FiberManualRecordIcon from '@mui/icons-material/FiberManualRecord';
import { collection, addDoc, getDocs, doc } from "firebase/firestore"; 
import db from "../utils/Firebase";
import options from '../utils/options';



export default function CreateEvent() {

    let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`));
    const [countTenders, setCountTenders] = useState(0);

    const navigate = useNavigate();

    //הודעות הצלחה וכישלון
    const [flagAlertError, setFlagAlertError] = useState(false);
    const [flagAlertSuccess, setFlagAlertSuccess] = useState(false);
    const s = "success";
    const e = "error";
    let messageS = "You have Signed up successfully, You can Login now";
    let messageE = "שגיאה! אחד או יותר מהפרטים שהזנת שגויים";
    const closeAlert = () => {
        setFlagAlertError(false);
        setFlagAlertSuccess(false);
    }

    // יצירת סטייטים לשמירת הנתונים למכרז
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [date, setDate] = useState(new Date());
    const [supllierType, setSupllierType] = useState();
    const [comment, setComment] = useState();
    const [selected, setSelected] = useState([]);
    
    const [selectedOption, setSelectedOption] = useState();

     const CreateEvent  = async (e) => {
         e.preventDefault();
         let count = 0;
         const querySnapshot = await getDocs(collection(db, "Tenders"));
            querySnapshot.forEach(async(docEl) => {
                count++;
                });
          count++;
         try {
          const docRef =  addDoc(collection(db, "Tenders"), {
            id: count,
            fullName: sessionUser.fullName,
            email: sessionUser.emailUser,
            city: city,
            street: street,
            houseNumber: houseNumber,
            phoneNumber: sessionUser.phoneNumber,
            date: date.getDay() + '.' + date.getMonth() + '.' + date.getFullYear() ,
            supllierType: supllierType,
            requireList: selected,
            comment: comment,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
        navigate('/OrderConfirmation');
     }

  return (
    <div className='BodyCreateEvent'  >

        <div className="CreateForm" >

        <div style={{display:'flex', flexDirection:'coloumn',marginLeft:'30%'}} className="Alerts">
                {flagAlertSuccess ? <AlertSuccess message = {messageS} severityAlert = {s} closeAlert = {closeAlert} /> : null} 
                {flagAlertError ? <AlertSuccess message = {messageE} severityAlert = {e} closeAlert = {closeAlert} /> : null}
            </div>
              
            
        <Form  onSubmit={CreateEvent}>

                    <h1 style={{fontFamily:'Cursive',color:'black'}}> <b> טופס יצירת אירוע  </b></h1>
                    <label style={{color:'black' , fontWeight:'bold'}}>   כל השדות בטופס הינם חובה<FiberManualRecordIcon  /> </label>
            
                    <div style={{width:'50%', marginLeft:'25%', marginTop:'8px'}}>
                        <Select label='בחר' options={options.CitiesArr}  onChange={e => setCity(e.value)} />
                    </div>
                    
                    <Form.Group size="lg" controlId="street">
                    <Form.Control autoFocus type="text" placeholder='הכנס רחוב' onChange={e => setStreet(e.target.value)}  />
                    </Form.Group>

                    <Form.Group size="lg" controlId="houseNumber">
                    <Form.Control autoFocus type="numbers" placeholder='הכנס מספר בית' onChange={e => setHouseNumber(e.target.value)}   />
                    </Form.Group>
       
                    <DatePicker  selected={date} onChange={(date) => setDate(date)} ></DatePicker>

                    <div style={{width:'50%', marginLeft:'25%', marginTop:'8px'}}>
                        <Select label='בחר' options={options.optionsSupllier} onChange={e => setSupllierType(e.value)} />
                    </div>

                    {supllierType === 'דיגיי'? 
                        <div className='MultiSelectRequire'>
                           <MultiSelect  options={options.optionsDj} value={selected}
                                onChange={setSelected} labelledBy="Select" />
                       </div>
                    : null}

                    {supllierType === 'בר'? 
                        <div className='MultiSelectRequire'>
                           <MultiSelect  options={options.optionsBar} value={selected}
                                onChange={setSelected} labelledBy="Select" />
                       </div>
                    : null}

                    {supllierType === 'קייטרינג'? 
                        <div className='MultiSelectRequire'>
                           <MultiSelect  options={options.optionsCatering} value={selected}
                                onChange={setSelected} labelledBy="Select" />
                       </div>
                    : null}   

                    {supllierType === 'ציוד'? 
                        <div className='MultiSelectRequire'>
                           <MultiSelect  options={options.optionsEquip} value={selected}
                                onChange={setSelected} labelledBy="Select" />
                       </div>
                    : null}   



                    <div style={{width:'50%', marginLeft:'25%', marginTop:'9px'}}>
                        {supllierType? <Form.Group size="lg"  controlId="password">
                            <Form.Control as="textarea" rows={3}  type="text" placeholder='...  הוסף הערות   '
                                onChange={e => setComment(e.target.value)}  />
                        </Form.Group> : null}
                    </div>

                    <Button className='BtnCreateEventForm'  size="lg" type="submit"> שלח </Button> 
                    <Button className='BtnCreateEventForm'  size="lg" type='reset'  value="reset" > נקה טופס </Button>

            </Form>

        </div> 
    
    </div>
  )
}
