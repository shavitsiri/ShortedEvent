import React, { useState } from 'react';
import ReactJsAlert from "reactjs-alert";


export default function Alert(props) {
  const [status, setStatus] = useState(false);
  const [type, setType] = useState("success");
  const [title, setTitle] = useState("This is a alert");
  return (
    <div>
      <ReactJsAlert
        status='status' // true or false
        type='warning' // success, warning, error, info
        title='title'
        Close={() => setStatus(false)}
      />
    </div>
  )
}
