import { Route, Routes} from 'react-router-dom';
import Home from "./FComponents/Pages/Home";
import Login from './FComponents/Pages/Login';
import SignUp from './FComponents/Pages/SignUp';
import Profile from './FComponents/Pages/Profile';
import About from './FComponents/Pages/About';
import Contact from './FComponents/Pages/Contact';
import CreateEvent from './FComponents/Pages/CreateEvent';
import Navbar from './FComponents/BodyParts/NavBar';
import 'bootstrap/dist/css/bootstrap.min.css';
import OrderConfirmation from './FComponents/Pages/OrderConfirmation';
import Tenders from './FComponents/Pages/Tenders';
import EditUsers from './FComponents/Pages/EditUsers';
import ShowContactUs from './FComponents/Pages/ShowContactUs';
import MyHistory from './FComponents/Pages/MyHistory';
import EditUserDetails from './FComponents/Pages/EditUserDetails';
import Footer from './FComponents/BodyParts/Footer';
import MyDeals from './FComponents/Pages/MyDeals';
import MyRequires from './FComponents/Pages/MyRequires';
import MyOffers from './FComponents/Pages/MyOffers';
import BarTenders from './FComponents/Pages/Suplliers/BarTenders';
import Equipment from './FComponents/Pages/Suplliers/Equipment';
import Djs from './FComponents/Pages/Suplliers/Djs';
import Catering from './FComponents/Pages/Suplliers/Catering';
import Messenger from './FComponents/Pages/Messenger';
import BottomNavigation from '@mui/material/BottomNavigation';
import { BottomNavigationAction } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import Graphs from './FComponents/Pages/Graphs';
import ForgotPass from './FComponents/Pages/ForgotPass';
import './Styles/navbarBottom.css';



function App() {

  // Navigation
  const navigate = useNavigate();
      
  return (
    
    <div className="App" > 

    <div >
      <Navbar/> 
    </div>

        


    <Routes>
          <Route path='/' element={<Home/>}/>

          <Route path='/Login' element={<Login/>} />

          <Route path='/SignUp' element={<SignUp/>} />

          <Route path='/Profile' element={<Profile/>} />

          <Route path='/About' element={<About/>} />

          <Route path='/Contact' element={<Contact/>} />

          <Route path='/CreateEvent' element={<CreateEvent/>} />

          <Route path='/OrderConfirmation' element={<OrderConfirmation/>} />

          <Route path='/Tenders' element={<Tenders/>} />

          <Route path='/EditUsers' element={<EditUsers/>} />

          <Route path='/ShowContactUs' element={<ShowContactUs/>} />

          <Route path='/MyHistory' element={<MyHistory/>} />

          <Route path='/EditUserDetails' element={<EditUserDetails/>} />

          <Route path='/MyDeals' element={<MyDeals/>} />  

          <Route path='/MyRequires' element={<MyRequires/>} /> 

          <Route path='/MyOffers' element={<MyOffers/>} /> 

          <Route path='/BarTenders' element={<BarTenders/>} /> 

          <Route path='/Equipment' element={<Equipment/>} /> 
          
          <Route path='/Catering' element={<Catering/>} /> 

          <Route path='/Djs' element={<Djs/>} /> 

          <Route path='/Messenger' element={<Messenger/>} /> 

          <Route path='/Graphs' element={<Graphs/>} /> 

          <Route path='/ForgotPass' element={<ForgotPass/>} /> 

          

    </Routes>

    <div className="navbarBottom">
      <a href="#home" className="active" onClick={()=>navigate('/')} > @ShavitSiri כל הזכויות שמורות </a>
      <a href="#news" onClick={()=>navigate('About')} >קצת עלינו</a>
      <a href="#contact" onClick={()=>navigate('Contact')} >צור קשר</a>
    </div>

    {/* <BottomNavigation
          showLabels
        >
          <BottomNavigationAction label="כל הזכויות שמורות @ShavitSiri" onClick={()=>navigate('/')} />
          <BottomNavigationAction label="קצת עלינו"  onClick={()=>navigate('About')}/>
          <BottomNavigationAction label="צור קשר" onClick={()=>navigate('Contact')} />
          <BottomNavigationAction label="↑↑↑"  href='#'/>
    </BottomNavigation> */}
  {/* <Footer/> */}

    </div>
  );
}

export default App;



// import { Route, Routes} from 'react-router-dom';
// import Home from "./FComponents/Pages/Home";
// import Login from './FComponents/Pages/Login';
// import SignUp from './FComponents/Pages/SignUp';
// import Profile from './FComponents/Pages/Profile';
// import About from './FComponents/Pages/About';
// import Contact from './FComponents/Pages/Contact';
// import CreateEvent from './FComponents/Pages/CreateEvent';
// import Navbar from './FComponents/BodyParts/NavBar';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import OrderConfirmation from './FComponents/Pages/OrderConfirmation';
// import Tenders from './FComponents/Pages/Tenders';
// import EditUsers from './FComponents/Pages/EditUsers';
// import ShowContactUs from './FComponents/Pages/ShowContactUs';
// import MyHistory from './FComponents/Pages/MyHistory';
// import EditUserDetails from './FComponents/Pages/EditUserDetails';
// import Footer from './FComponents/BodyParts/Footer';
// import MyDeals from './FComponents/Pages/MyDeals';
// import MyRequires from './FComponents/Pages/MyRequires';
// import MyOffers from './FComponents/Pages/MyOffers';
// import BarTenders from './FComponents/Pages/Suplliers/BarTenders';
// import Equipment from './FComponents/Pages/Suplliers/Equipment';
// import Djs from './FComponents/Pages/Suplliers/Djs';
// import Catering from './FComponents/Pages/Suplliers/Catering';
// import Messenger from './FComponents/Pages/Messenger';
// import BottomNavigation from '@mui/material/BottomNavigation';
// import { BottomNavigationAction } from '@mui/material';
// import { useNavigate } from 'react-router-dom';
// import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
// import Graphs from './FComponents/Pages/Graphs';
// import ForgotPass from './FComponents/Pages/ForgotPass';
// import './Styles/navbarBottom.css';



// function App() {

//   // Navigation
//   const navigate = useNavigate();
      
//   return (

//     <div className="App" style={{height:'100%'}}> 
//       <div>
//         <Navbar/> 
//       </div  >
//     <Routes>
//           <Route path='/' element={<Home/>}/>

//           <Route path='/Login' element={<Login/>} />

//           <Route path='/SignUp' element={<SignUp/>} />

//           <Route path='/Profile' element={<Profile/>} />

//           <Route path='/About' element={<About/>} />

//           <Route path='/Contact' element={<Contact/>} />

//           <Route path='/CreateEvent' element={<CreateEvent/>} />

//           <Route path='/OrderConfirmation' element={<OrderConfirmation/>} />

//           <Route path='/Tenders' element={<Tenders/>} />

//           <Route path='/EditUsers' element={<EditUsers/>} />

//           <Route path='/ShowContactUs' element={<ShowContactUs/>} />

//           <Route path='/MyHistory' element={<MyHistory/>} />

//           <Route path='/EditUserDetails' element={<EditUserDetails/>} />

//           <Route path='/MyDeals' element={<MyDeals/>} />  

//           <Route path='/MyRequires' element={<MyRequires/>} /> 

//           <Route path='/MyOffers' element={<MyOffers/>} /> 

//           <Route path='/BarTenders' element={<BarTenders/>} /> 

//           <Route path='/Equipment' element={<Equipment/>} /> 
          
//           <Route path='/Catering' element={<Catering/>} /> 

//           <Route path='/Djs' element={<Djs/>} /> 

//           <Route path='/Messenger' element={<Messenger/>} /> 

//           <Route path='/Graphs' element={<Graphs/>} /> 

//           <Route path='/ForgotPass' element={<ForgotPass/>} /> 

          

//     </Routes>

//     <div class="navbarBottom">
//       <a href="#home" class="active">Home</a>
//       <a href="#news">News</a>
//       <a href="#contact">Contact</a>
//     </div>

//     {/* <BottomNavigation
//           showLabels
//         >
//           <BottomNavigationAction label="כל הזכויות שמורות @ShavitSiri" onClick={()=>navigate('/')} />
//           <BottomNavigationAction label="קצת עלינו"  onClick={()=>navigate('About')}/>
//           <BottomNavigationAction label="צור קשר" onClick={()=>navigate('Contact')} />
//           <BottomNavigationAction label="↑↑↑"  href='#'/>
//     </BottomNavigation> */}
//   {/* <Footer/> */}

//     </div>
//   );
// }

// export default App;
