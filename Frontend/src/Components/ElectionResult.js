import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';

export default function ElectionResult() 
{
  const[constituencylist,setConstituencylist]=useState([]);    /* This is for listing in Dropdown select options */
  const[selectConstituency,setSelectConstituency]=useState('');
  const[candidatelist,setCandidatelist]=useState([]);
  const[hideform,setHideform]=useState(false);

  useEffect(()=>{
    GetAllConstituency();
  },[])

  useEffect(() => {
    if (selectConstituency && selectConstituency !== '0') {
      GetConstituencyVoteCount();
    }
  }, [selectConstituency]);

  function GetAllConstituency()    /*Get all Constituency list as a drop down */
  {
    axios
    .get("http://localhost:8080/GetAllConstituency")
    .then((res)=>{ 
      setConstituencylist(res.data);
      setHideform(false);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }


  function GetConstituencyVoteCount()  /* Get Candidates count based on constituencyid & fetch candidate id - Front End */
  {
    axios
    .get(`http://localhost:8080/GetConstituencyVoteCount/${selectConstituency}`)
    .then((res)=>{
      setCandidatelist(res.data.Candidates);
      setHideform(true);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  return (
    <>
     <Card className='addcity addelectionresult'>
      <Card.Header>  <h3 style={{color:"darkblue",fontFamily:"sans-serif",textAlign:"center",fontWeight:"bold"}}>Election Result</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <label>Select Constituency-id and Constituency: </label>
  <select className="form-select" value={selectConstituency} onChange={(e)=>setSelectConstituency(e.target.value)}>
    <option value={0}>--Select Constituency-id and Constituency--</option>
    {
      constituencylist.map((item,index)=>(
        <option key={index} value={item.constituencyid}>{item.constituencyid}-{item.constituency}</option>
      ))
    }
  </select>
        </Card.Text>
      </Card.Body>
    </Card><br></br>


    { hideform && (
    <Card className='displayelectionresult'>
      <Card.Header><h3 style={{ color: "darkblue", fontFamily: "sans-serif",textAlign:"center", fontWeight: "bold" }}>Candidate List</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <table className='table table-striped'>
<thead>
  <tr>
    <th>Constituency Name</th>
    <th>Candidate Name</th>
    <th>Party Name</th>
    <th>Party Logo</th>
    <th>Total Count</th>
  </tr>
</thead>
<tbody>
{
  candidatelist.map((item,index)=>{
    return(
      <tr key={index}>
        <td>{item.ConstituencyName}</td>
        <td>{item.CandidateName}</td>
        <td>{item.PartyName}</td>
        <td><img src={item.PartyLogo} alt="party logo" width="50px" height="50px"/></td>
        <td>{item.VoteCount}</td>
      </tr>
    )
  })
}
</tbody>
</table>
        </Card.Text>
      </Card.Body>
    </Card>
    )}
    </>
  )
}
