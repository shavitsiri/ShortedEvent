import { React, useState } from 'react';
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
import { collection, addDoc, getDocs } from "firebase/firestore";
import db from "../utils/Firebase";
import options from '../utils/options';
import * as Validation from '../utils/Validation';
import ReactJsAlert from "reactjs-alert";



export default function CreateEvent() {

    // Navigation
    const navigate = useNavigate();

    // Session User
    let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`));

    //Alert States
    const [statusAlert, setStatusAlert] = useState(false);
    const [typeAlert, setTypeAlert] = useState("success");
    const [titleAlert, setTitleAlert] = useState("This is a alert");

    // Temp Variables
    let optionsFinal = [];
    let tempSuppliers = new Array();
    let supplierType;

    // States
    const [startDate, setStartDate] = useState(new Date());
    const [suppliers, setsuppliers] = useState([]);
    const [optionsPersonal, setOptionsPersonal] = useState([]);
    const [specificSupllier, setSpecificSupllier] = useState(null);





    // States for Event Form
    const [city, setCity] = useState();
    const [street, setStreet] = useState();
    const [houseNumber, setHouseNumber] = useState();
    const [supllierType, setSupllierType] = useState();
    const [comment, setComment] = useState('');
    const [selected, setSelected] = useState([]);

    // Function Add Event to Tenders Table
    const CreateEvent = async () => {
        let count = 0;
        const querySnapshot = await getDocs(collection(db, "Tenders"));
        querySnapshot.forEach(async (docEl) => {
            count++;
        });
        count++;
        try {
            if (specificSupllier !== null & specificSupllier !== 'כולם') {
                const docRef = addDoc(collection(db, "Tenders"), {
                    id: count,
                    fullName: sessionUser.fullName,
                    email: sessionUser.emailUser,
                    city: city,
                    street: street,
                    houseNumber: houseNumber,
                    phoneNumber: sessionUser.phoneNumber,
                    date: startDate.getDate() + "." + (startDate.getMonth() + 1) + "." + startDate.getFullYear(),
                    supllierType: supllierType,
                    requireList: selected,
                    comment: comment,
                    supllierEmail: specificSupllier,
                    public: false
                });
            }
            else {
                const docRef = addDoc(collection(db, "Tenders"), {
                    id: count,
                    fullName: sessionUser.fullName,
                    email: sessionUser.emailUser,
                    city: city,
                    street: street,
                    houseNumber: houseNumber,
                    phoneNumber: sessionUser.phoneNumber,
                    date: startDate.getDate() + "." + (startDate.getMonth() + 1) + "." + startDate.getFullYear(),
                    supllierType: supllierType,
                    requireList: selected,
                    comment: comment,
                    public: true
                });
            }

        } catch (e) {
            console.error("Error adding document: ", e);
        }
        navigate('/OrderConfirmation');
    }

    // Validation Form Create Event
    const validFormCreateEvent = (e) => {
        e.preventDefault();
        if (!Validation.validCity(city)) {
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('חייב לבחור עיר');
            return false;
        }
        if (!Validation.validStreet(street)) {
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('חייב לרשום רחוב');
            return false;
        }
        if (!Validation.validHouseNumber(houseNumber)) {
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('חייב לרשום מספר בית');
            return false;
        }
        if (!Validation.validDate(startDate)) {
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('חייב לבחור תאריך ');
            return false;
        }
        if (!Validation.validSupllier(supllierType)) {
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('חייב לבחור סוג ספק ');
            return false;
        }
        console.log(selected[0]);
        if (!Validation.validRequires(selected)) {
            setStatusAlert(true);
            setTypeAlert('warning');
            setTitleAlert('חייב למלא רשימת דרישות');
            return false;
        }
        CreateEvent();
    }

    // Function Get Supplier List
    const getSuppliers = async (value) => {
        setSupllierType(value);
        supplierType = value;
        console.log("getSuppliers");
        try {
            const querySnapshot = await getDocs(collection(db, "Users"));
            querySnapshot.forEach((doc) => {
                if (doc.data().type !== 'לקוח' && doc.data().type !== 'מנהל') {
                    tempSuppliers.push(doc.data())
                }
            });
            setsuppliers(tempSuppliers);
            let optionsSupllierPick = tempSuppliers.filter((sup) => checkSup(sup.type));
            optionsSupllierPick.map((sup, index) => optionsFinal.push({ label: sup.firstName + " " + sup.lastName, value: sup.email }))
            optionsFinal.push({ label: 'כל הספקים המתאימים', value: 'כולם' })
            console.log(optionsFinal);
            setOptionsPersonal(optionsFinal);
        }
        catch (e) {
            alert(e)
        }
    }

    // Function CHeck Match of Supplier
    function checkSup(type) {
        return type === supplierType;
    }


    return (
        <div className='BodyCreateEvent'  >

            <div className="CreateForm"   >

                <Form onSubmit={validFormCreateEvent}  >
                    <ReactJsAlert
                        status={statusAlert} // true or false
                        type={typeAlert} // success, warning, error, info
                        title={titleAlert}
                        Close={() => setStatusAlert(false)}
                    />
                    <h1 style={{ fontFamily: 'Cursive', color: 'aquamarine' }}> <b> טופס יצירת אירוע  </b></h1>
                    <div style={{ textAlign: 'center' }} >
                        <label style={{ color: 'pink', fontWeight: 'bold', alignSelf: 'center', textAlign: 'center', justifySelf: 'center' }}>   כל השדות בטופס הינם חובה<FiberManualRecordIcon /> </label>
                    </div>


                    <div style={{ width: '50%', marginLeft: '25%', marginTop: '8px', textAlign: 'center' }}>
                        <Select label='בחר' options={options.AllCities} onChange={e => setCity(e.value)} />
                    </div>

                    <Form.Group size="lg" controlId="street">
                        <Form.Control autoFocus type="text" placeholder='הכנס רחוב' onChange={e => setStreet(e.target.value)} />
                    </Form.Group>

                    <Form.Group size="lg" controlId="houseNumber">
                        {/* <NumericInput className="form-control" style={ false }/> */}
                        <Form.Control autoFocus type="number" placeholder='הכנס מספר בית' onChange={e => setHouseNumber(e.target.value)} />
                    </Form.Group>
                    <DatePicker
                        selected={startDate}
                        onSelect={startDate => console.log(startDate.getDate() + "." + (startDate.getMonth() + 1) + "." + startDate.getFullYear())} //when day is clicked
                        onChange={startDate => setStartDate(startDate)} //only when value has changed
                    />
                    {/* <DatePicker selected={startDate} onChange={(e) => console.log(e.value)} ></DatePicker> */}

                    <div style={{ width: '50%', marginLeft: '25%', marginTop: '8px', textAlign: 'center' }}>
                        <Select label='בחר' options={options.optionsSupllier} onChange={e => getSuppliers(e.value)} />
                    </div>

                    {supllierType === 'דיגיי' ?
                        <div className='MultiSelectRequire'>
                            <Select label='בחר' options={optionsPersonal} onChange={e => setSpecificSupllier(e.value)} />
                            <div style={{ marginTop: '8px' }}>
                                <MultiSelect options={options.optionsDj} value={selected}
                                    onChange={setSelected} labelledBy="Select" />
                            </div>
                        </div>
                        : null}

                    {supllierType === 'בר' ?
                        <div className='MultiSelectRequire'>
                            <Select label='בחר' options={optionsPersonal} onChange={e => setSpecificSupllier(e.value)} />
                            <div style={{ marginTop: '8px' }}>
                                <MultiSelect options={options.optionsBar} value={selected}
                                    onChange={setSelected} labelledBy="Select" />
                            </div>
                        </div>
                        : null}

                    {supllierType === 'קייטרינג' ?
                        <div className='MultiSelectRequire'>
                            <Select  label='בחר' options={optionsPersonal} onChange={e => setSpecificSupllier(e.value)} />
                            <div style={{ marginTop: '8px' }}>
                                <MultiSelect style={{ marginTop: '8px' }} options={options.optionsCatering} value={selected}
                                    onChange={setSelected} labelledBy="Select" />
                            </div>

                        </div>
                        : null}

                    {supllierType === 'ציוד' ?
                        <div className='MultiSelectRequire'>
                            <Select label='בחר' options={optionsPersonal} onChange={e => setSpecificSupllier(e.value)} />
                            <div style={{ marginTop: '8px' }}>
                                <MultiSelect options={options.optionsEquip} value={selected}
                                    onChange={setSelected} labelledBy="Select" />
                            </div>
                        </div>
                        : null}



                    <div style={{ width: '50%', marginLeft: '25%', marginTop: '9px' }}>
                        {supllierType ? <Form.Group size="lg" controlId="password">
                            <Form.Control as="textarea" style={{ textAlign: 'right' }} rows={3} type="text" placeholder='...  הוסף הערות   '
                                onChange={e => setComment(e.target.value)} />
                        </Form.Group> : null}
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }} >
                        <Button className='BtnCreateEventForm' style={{ backgroundColor: 'black' }} size="lg" type="submit"> שלח </Button>
                        <Button className='BtnCreateEventForm' style={{ backgroundColor: 'black' }} size="lg" type='reset' value="reset" > נקה טופס </Button>
                    </div>


                </Form>

            </div>
            <br /><br />

        </div>
    )
}
