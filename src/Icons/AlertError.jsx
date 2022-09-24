import React from 'react';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import Button from 'react-bootstrap/esm/Button';

export default function AlertError(props) {
  return (
    <div style={{ display: 'flex', flexDirection: 'row', padding:'1px' }} >
      <Alert style={{border:'1px solid black'}} severity={props.severityAlert}>
        <AlertTitle  > {props.message} </AlertTitle>
        <Button onClick={() => props.closeAlert()} style={{borderRadius:'12px',backgroundColor:'#FFC8BB',color:'black'}} >סגור</Button>
      </Alert>
    </div>
  )
}
