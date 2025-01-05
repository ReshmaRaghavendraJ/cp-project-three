import React, { useState } from 'react'
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import { useEffect } from 'react';
import { toast } from 'react-toastify';


export default function AddCandidate() 
{
    const[candidateid,setCandidateid]=useState('');
    const[name,setName]=useState('');
    const[age,setAge]=useState('');
    const[address,setAddress]=useState('');
    const[mobileno,setMobileno]=useState('');
    const[candidatelist,setCandidatelist]=useState([]);    //to display candidates
    const[partylist,setPartylist]=useState([]);       //partylist in dropdown
    const[selectParty,setSelectParty]=useState('');    
    const[hideform,setHideform]=useState(false);


useEffect(()=>{
    GetAllpartyDetails();
    // GetCandidatesByConstituency();
},[])

    function AddCandidatedetails()  /*this function is for Posting Candidate Details */
    {
      if(selectParty==='') 
        {
          toast.error("please choose options...");
          return;
        }
      if(name==='') 
        {
          toast.error("please enter name");
          return;
        }
        if(age==='') 
          {
            toast.error("please enter age");
            return;
          }
          if(age<25)
          {
            toast.error("Candidate should have minimum of 25 years old");
            return;
          }
          if(address==='') 
            {
              toast.error("please enter address");
              return;
            }
            if(mobileno==='') 
              {
                toast.error("please enter mobileno");
                return;
              }
              if (!/^\+91\d{10}$/.test(mobileno)) {
                toast.error("mobile number should start with +91 and be followed by 10 digits");
                return;
              }
    const conname=sessionStorage.getItem('constituencyid');
    const obj={name,age,address,mobileno};

    axios
    .get(`http://localhost:8080/GetCandidatesByConstituency/${conname}`)
    .then((res) => {
      const candidates = res.data;
      const existingCandidate = candidates.find(candidate => candidate.party.partyid === selectParty);

      if (existingCandidate) {
        toast.error("A candidate from the same party already exists for the given constituency.");
        return;
      }})

      // Proceed with adding the candidate if no conflict
    axios
    .post(`http://localhost:8080/AddCandidatedetails/${conname}/${selectParty}`,obj)
    .then((res)=>{
      toast.success(res.data);
      setHideform(false);
     clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
    }

    function GetAllCandidateDetails()    /*this function is for Getting Candidate Details */
    {
    axios
    .get("http://localhost:8080/GetAllCandidateDetails")
    .then((res)=>{
        setCandidatelist(res.data);
        setHideform(true);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
    }


  function GetAllpartyDetails()    /*Get all Party list as a drop down */
  {
    axios
    .get("http://localhost:8080/GetAllpartyDetails")
    .then((res)=>{
        setPartylist(res.data);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function UpdateCandidate()  /* PUT */
  {
    if(selectParty==='') 
      {
        toast.error("please choose options...");
        return;
      }
    if(name==='') 
      {
        toast.error("please enter name");
        return;
      }
      if(age==='') 
        {
          toast.error("please enter age");
          return;
        }
        if(age<25)
          {
            toast.error("Candidate should have minimum of 25 years old");
            return;
          }
        if(address==='') 
          {
            toast.error("please enter address");
            return;
          }
          if(mobileno==='') 
            {
              toast.error("please enter mobileno");
              return;
            }
            if (!/^\+91\d{10}$/.test(mobileno)) {
              toast.error("mobile number should start with +91 and be followed by 10 digits");
              return;
            }
    const conname=sessionStorage.getItem('constituencyid');
    const obj={name,age,address,mobileno};
    axios
    .put(`http://localhost:8080/UpdateCandidate/${candidateid}/${conname}/${selectParty}`,obj)
    .then((res)=>{
      toast.success(res.data);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
  }

  function assignvalue(candidates)
{ 
  setCandidateid(candidates.candidateid);
  setName(candidates.name);
  setAge(candidates.age);
  setAddress(candidates.address);
  setMobileno(candidates.mobileno);
  setSelectParty(candidates.party.partyid);
}

  function clearAll()
  {
    setCandidateid('');
    setName('');
    setAge('');
    setAddress('');
    setMobileno('');
  }

  return (
    <>
   <Card className='addcity addcandidatecard' >
      <Card.Header><h3 style={{color:"darkblue",fontFamily:"sans-serif",textAlign:"center",fontWeight:"bold"}}>Add Candidate Details</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <label>Select Party-id and Party Name: </label>
    <select className="form-select" value={selectParty} onChange={(e)=>setSelectParty(e.target.value)}>
      <option value={0}>--Select party-id and Party--</option>
      {
        partylist.map((item,index)=>(
          <option key={index} value={item.partyid}>{item.partyid}-{item.party}</option>
        ))
      }
    </select>

    <label className='form-label'>Enter Name:</label>
    <input type="text" className="form-control mb-3" value={name} onChange={(e)=>setName(e.target.value)}/>

    <label className='form-label'>Enter Age:</label>
    <input type="text" className="form-control mb-3" value={age} onChange={(e)=>setAge(e.target.value)}/>

    <label className='form-label'>Enter Address:</label>
    <input type="text" className="form-control mb-3" value={address} onChange={(e)=>setAddress(e.target.value)}/>

    <label className='form-label'>Enter Mobileno:</label>
    <input type="text" className="form-control mb-3" value={mobileno} onChange={(e)=>setMobileno(e.target.value)} placeholder='+91'/>
      <div className='btnss'>
   <button type="button" className="btn btn-success mb-3 me-2" onClick={candidateid ? UpdateCandidate : AddCandidatedetails}>{candidateid ? "Update" : "Submit"}</button>
    <button type="button" className="btn btn-primary mb-3" onClick={GetAllCandidateDetails}>Show</button>
    </div>
        </Card.Text>
      </Card.Body>
    </Card><br></br>


    { hideform && (
    <Card className='displaycandidatecard'>
      <Card.Header>    <h3 style={{ color: "darkblue", fontFamily: "sans-serif", textAlign:"center", fontWeight: "bold" }}>Candidate List</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <table className='table table-striped'>
<thead>
  <tr>
    <th>Candidate id</th>
    <th>Name</th>
    <th>Age</th>
    <th>Address</th>
    <th>Mobileno</th>
    <th>Constituency-id</th>
    <th>Constituency</th>
    <th>Party-id</th>
    <th>Party Name</th>
    <th>Party Logo</th>
    <th>Edit</th>
  </tr>
</thead>
<tbody>
{
  candidatelist.map((item,index)=>{
    return(
      <tr key={index}>
        <td>{item.candidateid}</td>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.address}</td>
        <td>{item.mobileno}</td>
        <td>{item.constituency2.constituencyid}</td>
        <td>{item.constituency2.constituency}</td>
        <td>{item.party.partyid}</td>
        <td>{item.party.party}</td>
        <td><img src={item.party.partylogo} alt="party logo" width="50px" height="50px"/></td>
        <button style={{color:"red",border:"none"}} onClick={() => assignvalue(item)}>
         <span className="material-icons" style={{ verticalAlign: "middle" }}>edit</span> 
          </button>
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
