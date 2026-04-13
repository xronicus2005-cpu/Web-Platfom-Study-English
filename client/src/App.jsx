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
import Listening21 from "./pages/tests/listenings/Listening21"
import Listening22 from "./pages/tests/listenings/Listening22"
import Listening23 from "./pages/tests/listenings/Listening23"
import Listening24 from "./pages/tests/listenings/Listening24"
import Listening25 from "./pages/tests/listenings/Listening25"
import Listening26 from "./pages/tests/listenings/Listening26"
import Listening27 from "./pages/tests/listenings/Listening27"
import Listening28 from "./pages/tests/listenings/Listening28"
import Listening29 from "./pages/tests/listenings/Listening29"
import Listening30 from "./pages/tests/listenings/Listening30"
import Listening31 from "./pages/tests/listenings/Listening31"
import Listening32 from "./pages/tests/listenings/Listening32"
import Listening33 from "./pages/tests/listenings/Listening33"
import Listening34 from "./pages/tests/listenings/Listening34"
import Listening35 from "./pages/tests/listenings/Listening35"
import Listening36 from "./pages/tests/listenings/Listening36"


//readings
import Reading1 from "./pages/tests/s-readings/Reading1"

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
        <Route path="/profile/listening/6/1" element={<Listening21/>}/>
        <Route path="/profile/listening/6/2" element={<Listening22/>}/>
        <Route path="/profile/listening/6/3" element={<Listening23/>}/>
        <Route path="/profile/listening/6/4" element={<Listening24/>}/>
        <Route path="/profile/listening/7/1" element={<Listening25/>}/>
        <Route path="/profile/listening/7/2" element={<Listening26/>}/>
        <Route path="/profile/listening/7/3" element={<Listening27/>}/>
        <Route path="/profile/listening/7/4" element={<Listening28/>}/>
        <Route path="/profile/listening/8/1" element={<Listening29/>}/>
        <Route path="/profile/listening/8/2" element={<Listening30/>}/>
        <Route path="/profile/listening/8/3" element={<Listening31/>}/>
        <Route path="/profile/listening/8/4" element={<Listening32/>}/>
        <Route path="/profile/listening/9/1" element={<Listening33/>}/>
        <Route path="/profile/listening/9/2" element={<Listening34/>}/>
        <Route path="/profile/listening/9/3" element={<Listening35/>}/>
        <Route path="/profile/listening/9/4" element={<Listening36/>}/>

        <Route path="/profile/reading/1" element={<Reading1/>}/>


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
