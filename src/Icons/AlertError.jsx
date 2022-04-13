import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

export default function AlertError(props) {
  return (
    <div style={{minWidth: '400px',maxWidth: '550px',alignSelf:'center',marginTop:'30px',textAlign:'right'}} >
               <Alert style={{fontFamily:'cursive',fontSize:'18px',borderRadius:'5px',display:'flex', flexDirection:'row-reverse'}}  severity={props.severityAlert}>

                    <AlertTitle style={{marginRight:'40px'}}  ><button onClick={() => props.closeAlert()} style={{borderRadius:'150px',color:'black',border:'2px solid black',backgroundColor:'gray',width:'25px',marginRight:'120px'}}  ><b>X</b></button> {props.message} </AlertTitle>

                </Alert> 
        </div>
  )
}
