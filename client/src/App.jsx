import Home from "./pages/home/Home"
import Settings from "./pages/settings/Settings"
import './App.css'



//sign in sign up
import SignIn from "./pages/sign-in/SignIn"
import SignUp from "./pages/sign-up/SignUp"

import Profile from "./pages/profile/Profile"
import Listenings from "../src/components/courses/Listenings"
import Readings from "../src/components/courses/Readings"
import Results from "./components/results/Results"


//listening tests
import Listening1 from "./pages/tests/listenings/Listening1"
import Listening2 from "./pages/tests/listenings/Listening2"
import Listening3 from "./pages/tests/listenings/Listening3"
import Listening4 from "./pages/tests/listenings/Listening4"
import Listening5 from "./pages/tests/listenings/Listening5"
import Listening6 from "./pages/tests/listenings/Listening6"
import Listening7 from "./pages/tests/listenings/Listening7"
import Listening8 from "./pages/tests/listenings/Listening8"
import Listening9 from "./pages/tests/listenings/Listening9"
import Listening10 from "./pages/tests/listenings/Listening10"
import Listening11 from "./pages/tests/listenings/Listening11"
import Listening12 from "./pages/tests/listenings/Listening12"
import Listening13 from "./pages/tests/listenings/Listening13"
import Listening14 from "./pages/tests/listenings/Listening14"
import Listening15 from "./pages/tests/listenings/Listening15"
import Listening16 from "./pages/tests/listenings/Listening16"
import Listening17 from "./pages/tests/listenings/Listening17"
import Listening18 from "./pages/tests/listenings/Listening18"
import Listening19 from "./pages/tests/listenings/Listening19"
import Listening20 from "./pages/tests/listenings/Listening20"

import { ToastContainer } from "react-toastify"

import {Route, Routes} from "react-router-dom"

function App() {


  return (
    <>
      <Routes>

        <Route path="/" element={<Home/>}/>
        <Route path="/settings" element={<Settings/>}/>

        {/**Profile pages */}


        <Route path="/profile/listening/1/1" element={<Listening1/>}/>
        <Route path="/profile/listening/1/2" element={<Listening2/>}/>
        <Route path="/profile/listening/1/3" element={<Listening3/>}/>
        <Route path="/profile/listening/1/4" element={<Listening4/>}/>
        <Route path="/profile/listening/2/1" element={<Listening5/>}/>
        <Route path="/profile/listening/2/2" element={<Listening6/>}/>
        <Route path="/profile/listening/2/3" element={<Listening7/>}/>
        <Route path="/profile/listening/2/4" element={<Listening8/>}/>
        <Route path="/profile/listening/3/1" element={<Listening9/>}/>
        <Route path="/profile/listening/3/2" element={<Listening10/>}/>
        <Route path="/profile/listening/3/3" element={<Listening11/>}/>
        <Route path="/profile/listening/3/4" element={<Listening12/>}/>
        <Route path="/profile/listening/4/1" element={<Listening13/>}/>
        <Route path="/profile/listening/4/2" element={<Listening14/>}/>
        <Route path="/profile/listening/4/3" element={<Listening15/>}/>
        <Route path="/profile/listening/4/4" element={<Listening16/>}/>
        <Route path="/profile/listening/5/1" element={<Listening17/>}/>
        <Route path="/profile/listening/5/2" element={<Listening18/>}/>
        <Route path="/profile/listening/5/3" element={<Listening19/>}/>
        <Route path="/profile/listening/5/4" element={<Listening20/>}/>

        <Route path="/profile" element={<Profile/>}>

          <Route index element={<Listenings/>} />
          <Route path="/profile/readings" element={<Readings/>}/>
          <Route path="/profile/results" element={<Results/>}/>

        </Route>






        {/**Sign in Sign Up */}
        <Route path="/sign-in" element={<SignIn/>}/>
        <Route path="/sign-up" element={<SignUp/>}/>

      </Routes>


      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    </>
  )
}

export default App
