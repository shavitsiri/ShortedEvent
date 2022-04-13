import React from 'react';
import "../BodyParts/FooterStyles2.css";
import {FooterLink} from "./FooterStyles";
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';


export default function Footer2() {
  return (
    <div className='FooterDiv'>


        <div className='ArrowUp'  >
                <FooterLink  href="#"><ArrowUpwardIcon/></FooterLink>  
        </div>

        <div className='rights' >
        כל הזכויות שמורות שביט סירי@                  
        </div>



        
                 
    </div>
  )
}
