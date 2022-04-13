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
import Footer2 from './FComponents/BodyParts/Footer2';
import MyDeals from './FComponents/Pages/MyDeals';



function App() {

  
  return (
    <div className="App" style={{backgroundColor:'gray'}}> 
      <div>
        <Navbar/> 
      </div>
      
    <Routes>
          <Route path='/' element={<Home/>} />

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

    </Routes>

 
<Footer2/>

    </div>
  );
}

export default App;
