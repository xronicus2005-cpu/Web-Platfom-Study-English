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
