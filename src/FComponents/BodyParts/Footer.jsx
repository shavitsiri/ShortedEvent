import React from 'react';
import {FooterLink} from "./FooterStyles";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export default function Footer() {
  return (
    <div style={{background:'white',boxShadow:'-2px -2px 5px 5px white',boxSizing:'border-box',marginTop:'20px',maxHeight:'40px',bottom:'0'}} >
        <div style={{display:'grid',gridTemplateColumns:'auto auto',background:'white'}} >
            <label style={{marginLeft:'5%',marginTop:'5px'}} >  כל הזכויות שמורות שביט סירי@  </label>
            <FooterLink style={{marginLeft:'75%',marginTop:'5px'}} href="#"><ArrowUpwardIcon/></FooterLink>  
        </div>
    </div>
  )
}


