import React, { Component, useState } from 'react';
import {Navbar, Nav,  Container} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import ImageButton from 'react-image-button';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import HomeIcon from '@mui/icons-material/Home';

export default function NavBar(props)
{
    let supllier = false;

    let session = false;
    const navigate = useNavigate();
    let sessionUser = JSON.parse(sessionStorage.getItem(`login_user`)); // מקבל את המשתמש המחובר
    

    if(sessionUser){
        if(sessionUser.type !== 'לקוח' ){
            if(sessionUser.type !== 'מנהל'){
                supllier = true;
            }
        }
        session = true;
    }

    const LogOutBtn = () => {
        sessionStorage.clear();
        navigate('/')
    }

        return (
            <div>
                
                <Navbar className='Navbar' bg="light" variant='light' expand="lg"   style={{height:80,boxShadow:'0 1px 5px 1px #777'}} >
                    
                    
                        <Nav.Link style={{float:'right'}} className='mywebName' as={Link} to={'/'}><img width='100px' src= "WebPictures\LogoWeb.png" alt="Logo"  /></Nav.Link>&nbsp;
                        
                        <Navbar.Toggle aria-controls="basic-navbar-nav"   />
                        
                        <Navbar.Collapse id="basic-navbar-nav"  >
                        
                            <Nav.Link style={{color:'black'}} as={Link} to={'/'}><HomeIcon/></Nav.Link>

                            <Nav  className="me-auto"    >
                                
                                {supllier?  <Nav.Link as={Link} to={'/Tenders'}> מכרזים</Nav.Link> : null}
                                {session? <Nav.Link   as={Link} to={'/MyDeals'}>עסקאות </Nav.Link> : null}
                                {session? <Nav.Link   as={Link} to={'/MyOffers'}>הצעות מחיר </Nav.Link> : null}
                                {session? <Nav.Link   as={Link} to={'/MyRequires'}>הבקשות שלי </Nav.Link> : null}
                                {session? <Nav.Link   as={Link} to={'/CreateEvent'}>יצירת אירוע</Nav.Link> : null}
                                {session? <Nav.Link   as={Link} to={'/Messenger'}>הצאטים שלי</Nav.Link> : null}
                                {session? null : <Nav.Link  as={Link} to={'/About'}>אודות</Nav.Link>}
                                {session? null : <Nav.Link  as={Link} to={'/Contact'}>צור קשר</Nav.Link>}
                                {session? null : <Nav.Link  as={Link} to={'/Login'}>התחברות</Nav.Link>}
                                {session? null : <Nav.Link  as={Link} to={'/SignUp'}>הרשמה</Nav.Link>}
                            </Nav>       
                            <Nav className='navBarIcons' >
                                {session? <Nav.Link style={{color:'black'}} as={Link} to={'/Profile'}><AccountCircleIcon/></Nav.Link> : null}
                                {session? <Nav.Link  onClick={LogOutBtn} style={{color:'black'}} as={Link} to={'/'}><ExitToAppIcon/></Nav.Link> : null}
                            </Nav>                     
                                
                        </Navbar.Collapse>

                   
                </Navbar>
            </div>
        )
}