import React from 'react';
import Login from './Components/Login';
import Home from './Components/Home';
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'; 
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Electionofficerdashboard from './Components/Electionofficerdashboard';
import Voterdashboard from './Components/Voterdashboard';
import Aadharstaffdashboard from './Components/Aadharstaffdashboard';
import Electionstaffdashboard from './Components/Electionstaffdashboard';
import Addcity from './Components/Addcity';
import AddParty from './Components/AddParty';
import AddConstituency from'./Components/AddConstituency';
import AddAadharStaff from './Components/AddAadharStaff';
import AddElectionStaff from './Components/AddElectionStaff';
import AddElectionDate from './Components/AddElectionDate';
import ElectionResult from './Components/ElectionResult';
import Aadharcardholder from './Components/Aadharcardholder';
import Voterregister from './Components/Voterregister';
import AddCandidate from './Components/AddCandidate';
import Votercastvote from './Components/Votercastvote';
import About from './Components/About';
import Contact from './Components/Contact';


export default function App() 
{
  return (
    <Router>
    <ToastContainer/>
    <Routes>
      <Route path="Login" element={<Login/>}/>
      <Route path="/" element={<Home/>}/>
      <Route path="About" element={<About/>}/>
      <Route path="Contact" element={<Contact/>}/>

      <Route path="Electionofficerdashboard" element={<Electionofficerdashboard/>}>
      <Route path="Addcity" element={<Addcity />} />
      <Route path="AddParty" element={<AddParty />} />
      <Route path="AddConstituency" element={<AddConstituency />} />
      <Route path="AddAadharStaff" element={<AddAadharStaff />} />
      <Route path="AddElectionStaff" element={<AddElectionStaff />} />
      <Route path="AddElectionDate" element={<AddElectionDate />} />
      <Route path="ElectionResult" element={<ElectionResult />} />
      </Route>

      <Route path="Aadharstaffdashboard" element={<Aadharstaffdashboard/>} >
      <Route path="Aadharcardholder" element={<Aadharcardholder/>} />
      </Route>

      <Route path="Electionstaffdashboard" element={<Electionstaffdashboard/>} >
      <Route path="Voterregister" element={<Voterregister />} />
      <Route path="AddCandidate" element={<AddCandidate />} />
      </Route>

      <Route path="Voterdashboard" element={<Voterdashboard/>} > 
      <Route path="Votercastvote" element={<Votercastvote/>} /> 
      </Route>
      
    </Routes>
  </Router>
  )
}
