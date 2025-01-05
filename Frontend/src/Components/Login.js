import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import 'react-toastify/dist/ReactToastify.css';
import { Navigate } from "react-router-dom";
import './styles.css';
import { useEffect } from "react";
import Navbar from "./Navbar";

export default function Login()
 {
  const userTypes = ["Electionofficer", "Aadharstaff", "Electionstaff", "Voter"];
  const [selectedUserType, setSelectedUserType] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const[isloggedin,setIsloggedin]=useState(false);
  const [redirectPath, setRedirectPath] = useState("");
  const[list,setList]=useState([]);


  useEffect(()=>{
    if (username && password) {
      GetBynamepswd();  //Eelctionstaff
      Getnamepswd();    //Voter Register
    }
  },[username, password])

  function handleLogin()
  {
    if(selectedUserType==='')
    {
      toast.error("please choose options...");
      return;
    }
    if(selectedUserType==="Electionofficer" || selectedUserType==="electionofficer")
    {
      if(username===' '|| password==='') 
        {
          toast.error("please enter username and password");
          return;
        }
    axios
    .get(`http://localhost:8080/Electionofficer/${username}/${password}`)
    .then((res)=>{
      toast.success(res.data);
      setIsloggedin(true);
      setRedirectPath("/Electionofficerdashboard");
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
    }
  else if(selectedUserType==="Aadharstaff" || selectedUserType==="aadharstaff")
  {
    if(username==='' || password==='') 
      {
        toast.error("please enter username and password");
        return;
      }
    axios
    .get(`http://localhost:8080/aadharstaff/${username}/${password}`)
    .then((res)=>{
      toast.success(res.data);
      setIsloggedin(true);
      setRedirectPath("/Aadharstaffdashboard");
    })
    .catch((err)=>{
      toast.error(err.data);
    });
  }
  else if(selectedUserType==="Electionstaff" || selectedUserType==="electionstaff")
  {
    if(username==='' || password==='') 
      {
        toast.error("please enter username and password");
        return;
      }
    axios
    .get(`http://localhost:8080/electionstaff/${username}/${password}`)
    .then((res)=>{
      toast.success(res.data);
      setIsloggedin(true);
      sessionStorage.setItem('username',username);  //Here Username is set to sesssion storage
      setRedirectPath("/Electionstaffdashboard");  
    })
    .catch((err)=>{
      toast.error(err.data);
    });
  }
  else if(selectedUserType==="Voter" || selectedUserType==="voter")
  {
    if(username==='' || password==='') 
      {
        toast.error("please enter username and password");
        return;
      }
    axios
    .get(`http://localhost:8080/Voter/${username}/${password}`)
    .then((res)=>{
      toast.success(res.data);
      setIsloggedin(true);
      sessionStorage.setItem('username',username);
      setRedirectPath("/Voterdashboard");
    })
    .catch((err)=>{
      toast.error(err.data);
    });
  }
}

if (isloggedin && redirectPath) {
  return <Navigate to={redirectPath} />;
}

function clearAll()
{
setUsername("");
setPassword("");
setSelectedUserType("");
}

function GetBynamepswd()  /* Get Username and password for Electionstaff */
{
  axios
    .get(`http://localhost:8080/GetBynamepswd/${username}/${password}`)
    .then((res)=>{
      if (res.data) {
        const electionStaff = res.data; // Assuming the response is a single Electionstaff object
        const constituencyid = electionStaff.constituency3.constituencyid;
        setList([electionStaff]);
        sessionStorage.setItem('constituencyid', constituencyid);
        toast.success('Constituency ID set successfully');
      }  
    })
    .catch((err) => {
      toast.error(err.response.data || 'An error occurred');
    });
}


function Getnamepswd()  /* Get Username and password for Voter */
{
  axios
    .get(`http://localhost:8080/Getnamepswd/${username}/${password}`)
    .then((res)=>{
      if (res.data) {
        const voterregister = res.data; 
        const constituencyid = voterregister.constituency.constituencyid;
        setList([voterregister]);
        sessionStorage.setItem('constituencyid', constituencyid);
        
        const vid = voterregister.voterid;
        sessionStorage.setItem('voterid',vid);
      }  
    })
    .catch((err) => {
      toast.error(err.response.data || 'An error occurred');
    });
}

  return (
    <>
    <Navbar/><br></br>

    <div className='container container-background'>
    <div className="logo" style={{ marginBottom: "20px" , marginTop: "72px" }}>
      <img src="https://upload.wikimedia.org/wikipedia/commons/8/84/Government_of_India_logo.svg" alt="government" width="250px"/>
      <img src="https://img.jagranjosh.com/images/2021/August/1382021/flag.jpg" alt="flag" width="160px" style={{marginLeft:"230px"}}/>
      </div>
      <div>
      <label>Select Options:</label>
      <select className='form-select'  value={selectedUserType} onChange={(e)=>setSelectedUserType(e.target.value)}>
        <option value={0}>--Select Options--</option>
        {
          userTypes.map((item,index)=>(
            <option key={index} value={item}>
              {item}
              </option>
          ))}
          </select>
      </div>
        <div style={{ marginTop: "20px" }}>
      <div className='form-group'>
        <label className='form-label'>Enter username:</label>
        <input type="text" className='form-control' value={username} onChange={(e)=>setUsername(e.target.value)}/>
        </div>

        <div className="form-group mb-3">
        <label className="form-label">Enter password:</label>
        <input type="password" className='form-control' value={password} onChange={(e)=>setPassword(e.target.value)}  placeholder="*****"/>
      </div>
      <button type="button" className="btn btn-primary me-2" onClick={handleLogin}> Submit</button>
      <button type="button" className="btn btn-secondary me-2" onClick={clearAll}> clear</button>
      </div>
   </div>
   </>
  )
}
