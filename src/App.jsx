import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import SignIn from './pages/SignIn'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import ResetInterests from './pages/ResetInterests'
import Navbar from './Component/Navbar'
import Footer from './Component/Footer'
import HompePage from './pages/HomePage'
import AllEvents from './Component/AllEvents'
import HomePage from './pages/HomePage'
import Error404 from './Component/Error404'
import EventDetails from './pages/EventDetails'
import YourEvents from './pages/YourEvents'
import Success from './pages/Success'
import CreateEvent from './pages/CreateEvent'
import ProtectedRoute from '../ProtectedRoute'


import ComingSoon from './Component/ComingSoon'
// import CreateEventForm from "./Component/CreateEventForm"



function App() {

  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path="/signup" element={<SignUp/>}/>
      <Route path="/signin" element={<SignIn/>}/>
      <Route path="/forgotpassword" element={<ForgotPassword/>}/>
      <Route path="/resetpassword/:token" element={<ResetPassword/>}/>
      <Route path="/resetinterests" element={<ResetInterests/>}/>
      <Route path="/navbar" element={<Navbar/>}/>
      <Route path="/footer" element={<Footer/>}/>
      <Route path="/" element={<HomePage/>}/>
      <Route path="/success" element={<Success/>}/>
      <Route path="/events/:eventId" element={<EventDetails/>}/>
      <Route path="/allevents" element={<ProtectedRoute><AllEvents/></ProtectedRoute>}/>
      <Route path="/yourevents" element={<ProtectedRoute><YourEvents/></ProtectedRoute>}/>
      <Route path="/createevent" element={<ProtectedRoute><CreateEvent/></ProtectedRoute>}/>

      <Route path="/comingsoon" element={<ComingSoon/>}/>
      {/* <Route path="/createeventform" element={<CreateEventForm/>}/> */}

      <Route path="*" element={<Error404/>}/>


    </Routes>
    </BrowserRouter>

    </>
  )
}

export default App
