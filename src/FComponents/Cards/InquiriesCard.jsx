import React, {useState} from 'react';
import { DataGrid } from '@mui/x-data-grid';


export default function InquiriesCard(props) {
    const {inquiresArr} = props;
    
    const [inquiresArrStr, setInquiresArrStr] = useState(inquiresArr);

    const columns = [
        { field: 'id', headerName: 'ID', width: 70 },
        { field: 'email', headerName: 'Email', width: 225 },
        { field: 'subject', headerName: 'Subject', width: 250 },
        { field: 'message', headerName: 'Message', width: 800 }  
      ];
  return (
        <div className='DataGridDiv' >
      <DataGrid
        sx={{backgroundColor:'lightblue', border:'5px solid gray', borderRadius:'40px',color:'black',fontSize:'16px'}}
        rows={inquiresArrStr}
        columns={columns}
        pageSize={5}
        rowsPerPageOptions={[5]}
        checkboxSelection
      />
    </div>
  )
}
