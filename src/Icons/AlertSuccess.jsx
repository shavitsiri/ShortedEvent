import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function BasicAlerts(props) {
  return (
    <div style={{width:'50%',textAlign:'center',marginTop:'30px', display:'grid', gridAutoColumns:'auto auto auto'}} >
    <Alert style={{fontFamily:'cursive',fontSize:'18px',borderRadius:'20px'}}  severity={props.severityAlert}>

      <AlertTitle>{props.message}<button onClick={() => props.closeAlert()} style={{borderRadius:'10px',color:'white',border:'2px solid black',backgroundColor:'black',width:'40px',marginLeft:'25px'}} ><b>  X </b></button></AlertTitle>
     
  </Alert> 
</div>
  );
}