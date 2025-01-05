import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

export default function Votercastvote() 
{
  const[list,setList]=useState([]);
  const[voterregisterlist,setVoterregisterlist]=useState([]);
  const conid=sessionStorage.getItem('constituencyid');
  const [isEligible, setIsEligible] = useState(false);
  const [message, setMessage] = useState("");
  const vtrid=sessionStorage.getItem('voterid');

  useEffect(()=>{
    checkDate();
    checkVotingStatus();
  },[])


  function Getbyid()  /* this function is for displaying Candidate details */
  {
    axios
    .get(`http://localhost:8080/Getbyid/${conid}`)
    .then((res)=>{
      setList(res.data);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  /*this function is for Get Voter details  who belongs to particular constituency id and name*/
  function GetByConstituencyId ()       
  {
    const conname=sessionStorage.getItem('constituencyid');
    const vname=sessionStorage.getItem('username');
    axios
    .get(`http://localhost:8080/GetByConstituencyId/${conname}/${vname}`)
    .then((res)=>{
        setVoterregisterlist(res.data);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function checkDate()  /* This function is for checking election date n time with current date and time */
  {
    axios
    .get("http://localhost:8080/checkDate")
    .then((res)=>{
      debugger;
      const {responseMessage} = res.data;
      const electiondate = res.data;
      const eid = electiondate.electionid;
      sessionStorage.setItem('electionid',eid);
        if (responseMessage === "You can vote Now")
        {
          setIsEligible(true);
          Getbyid();
          GetByConstituencyId();
        } 
        else 
        {
          setIsEligible(false);
          setMessage(responseMessage);
        }
      })
      .catch((err) => {
        toast.error(err.response.data);
      });
  }

/* Add Castvote Deatils (Voting here...) in front end */
function AddCastvotedetails(candidateid)
{
  const elecid=sessionStorage.getItem('electionid');
  axios
  .post(`http://localhost:8080/AddCastvotedetails/${vtrid}/${candidateid}/${elecid}`)
  .then((res)=>{
    toast.success(res.data);
    setIsEligible(false);
    setMessage("You have voted, Thank you...");
  })
  .catch((err)=>{
    toast.error(err.response.data);
  });
}

/* check if a voter has voted after logout */
function checkVotingStatus()
 {
  const elecid=sessionStorage.getItem('electionid');
  axios
    .get(`http://localhost:8080/hasVoted/${vtrid}/${elecid}`)
    .then((res) => {
      const hasVoted = res.data;
      if (hasVoted) {
        setIsEligible(false);
        setMessage("You have voted in this election.THANK YOU...");
      } else {
        checkDate();
      }
    })
    .catch((err) => {
      toast.error(err.response.data);
    });
}

  return (
   <div className='container voterdisplaypage addcity'><br></br>
   {isEligible ? (
        <>
   <div className='mb-3'>
   <h5 style={{color:"blue",fontFamily:"sans-serif",marginLeft:"10px",fontWeight:"bold"}}>Voter Details:</h5><br></br>
<table className='table table-striped'>
<thead>
  <tr>
  <th>Voterid</th>
    <th> Name</th>
    <th>Adharcardno</th>
    <th>Address</th>
    <th>Mobileno</th>
    <th>Constituency Name</th>
    <th>Photo</th>
  </tr>
</thead>
<tbody>
{
  voterregisterlist
  .map((item,index)=>{
    return(
      <tr key={index}>
        <td>{item.voterid}</td>
        <td>{item.name}</td>
        <td>{item.adharno}</td>
        <td>{item.address}</td>
        <td>{item.mobileno}</td>
        <td>{item.constituency.constituency}</td>
        <td><img src={item.filepath} alt="party logo" width="100px" height="100px"/></td>
      </tr>
    )
  })
}
</tbody>
</table>
</div>

<div className='mb-3'>
   <h5 style={{color:"blue",fontFamily:"sans-serif",marginLeft:"10px",fontWeight:"bold"}}> List of Candidates:</h5><br></br>
   <table className='table table-striped'>
<thead>
  <tr>
    <th>Candidate-id</th>
    <th>Candidate Name</th>
    <th>Party Name</th>
    <th>Party Logo</th>
  </tr>
</thead>
<tbody>
{
  list.map((item,index)=>(
      <tr key={index}>
        <td>{item.candidateid}</td>
        <td>{item.name}</td>
        <td>{item.party.party}</td>
        <td><img src={item.party.partylogo} alt="party logo" width="50px" height="50px"/></td>
        <td> <button type="button" className='btn btn-success' onClick={() => AddCastvotedetails(item.candidateid)}>
                     Vote </button></td>
      </tr>
    )
  )
}
</tbody>
</table>
</div>
</>
   ):(
    <div className={`msgcontainer ${message.includes("voted") ? 'green-message' : 'red-message'}`}>
      <h2>{message}</h2>
      {message.includes("voted") && (
      <img src="https://static.vecteezy.com/system/resources/previews/026/309/101/non_2x/correct-tick-green-3d-sign-isolated-illustration-free-vector.jpg" width="250"/>
      )}
      </div>
   )}
  </div>
  )
}
