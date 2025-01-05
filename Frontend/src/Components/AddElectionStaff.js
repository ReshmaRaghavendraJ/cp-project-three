import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default function AddElectionStaff() 
{
  const[electionstaffid,setElectionstaffid]=useState('');
  const[name,setName]=useState('');
  const[designation,setDesignation]=useState('');
  const[mobileno,setMobileno]=useState('');
  const[address,setAddress]=useState('');
  const[password,setPassword]=useState('');
  const[constituencylist,setConstituencylist]=useState([]);    /* This is for listing in Dropdown select options */
  const[selectConstituency,setSelectConstituency]=useState('');
  const[electionstafflist,setElectionstafflist]= useState([]);    /* This is for listing in table */
  const[hideform,setHideform]=useState(false);

  useEffect(()=>{
    GetAllConstituency();
  },[])

  function AddElectionstaffDetails() /*Post Election staff based on Constituency Details*/
  {
    if(selectConstituency==='') 
      {
        toast.error("please choose options...");
        return;
      }
    if(name==='') 
      {
        toast.error("please enter name");
        return;
      }
      if(designation==='') 
        {
          toast.error("please enter designation");
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
          if(address==='') 
            {
              toast.error("please enter address");
              return;
            }
            if(password==='') 
              {
                toast.error("please enter password");
                return;
              }
              if (password.length > 0 && password.length < 5) 
                {
                  toast.error("Password should be minimum of 5 Characters");
                  return;
                }
                if (password.length > 0 && (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))) 
                  {
                  toast.warning("Password should contain both letters and numbers");
                }
                if (!/^[A-Z]/.test(password)) {
                  toast.error("Password should start with an uppercase letter");
                  return;
                }
    const obj={selectConstituency,name,designation,mobileno,address,password};
    axios
    .post(`http://localhost:8080/AddElectionstaffDetails/${selectConstituency}`,obj)
    .then((res)=>{
      toast.success(res.data);
      setHideform(false);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  
  function GetAllConstituency()    /*Get all Constituency list as a drop down */
  {
    axios
    .get("http://localhost:8080/GetAllConstituency")
    .then((res)=>{
      setConstituencylist(res.data);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function GetAll()    /*Get all list  */
  {
    axios
    .get("http://localhost:8080/GetAll")
    .then((res)=>{
      setElectionstafflist(res.data);
      setHideform(true);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function Updateelectionstaff()     /*PUT */
{ 
  if(selectConstituency==='') 
    {
      toast.error("please choose options...");
      return;
    }
  if(name==='') 
    {
      toast.error("please enter name");
      return;
    }
    if(designation==='') 
      {
        toast.error("please enter designation");
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
        if(address==='') 
          {
            toast.error("please enter address");
            return;
          }
          if(password==='') 
            {
              toast.error("please enter password");
              return;
            }
            if (password.length > 0 && password.length < 5) 
              {
                toast.error("Password should be minimum of 5 Characters");
                return;
              }
              if (password.length > 0 && (!/[A-Za-z]/.test(password) || !/[0-9]/.test(password))) 
                {
                toast.warning("Password should contain both letters and numbers");
              }
              if (!/^[A-Z]/.test(password)) {
                toast.error("Password should start with an uppercase letter");
                return;
              }
  const obj={name,designation,mobileno,address,password};
  axios
  .put(`http://localhost:8080/Updateelectionstaff/${electionstaffid}/${selectConstituency}`,obj)
  .then((res)=>{
    toast.success(res.data);
  })
  .catch((err)=>{
    toast.error(err.response.data);
  })
}


function assignvalue(staffs)  /*assign values for PUT operation*/
{
  setSelectConstituency(staffs.constituencyid);
  setElectionstaffid(staffs.electionstaffid);
  setAddress(staffs.address);
  setDesignation(staffs.designation);
  setMobileno(staffs.mobileno);
  setName(staffs.name);
  setPassword(staffs.password);
}


return (
  <>
  <Card className="addcity addelectionstaffcard">
      <Card.Header> <h3 style={{color:"darkblue",fontFamily:"sans-serif",textAlign:"center",fontWeight:"bold"}}>Add Election Staff Details</h3></Card.Header>
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
  <label className='form-label'>Enter Name:</label>
 <input type="text" className="form-control mb-3"   value={name} onChange={(e)=>setName(e.target.value)}/>

 <label className='form-label'>Enter Designation:</label>
 <input type="text" className="form-control mb-3"   value={designation} onChange={(e)=>setDesignation(e.target.value)}/>

 <label className='form-label'>Enter Mobileno:</label>
 <input type="text" className="form-control mb-3"  value={mobileno}  onChange={(e)=>setMobileno(e.target.value)} placeholder='+91'/>

 <label className='form-label'>Enter Address:</label>
 <input type="text" className="form-control mb-3"   value={address} onChange={(e)=>setAddress(e.target.value)}/>

 <label className='form-label'>Enter Password:</label>
 <input type="password" className="form-control mb-3"  value={password}  onChange={(e)=>setPassword(e.target.value)} placeholder='*****'/>
<div className='btnss'>
 <button type="button" className="btn btn-success mb-3 me-2" onClick={electionstaffid ? Updateelectionstaff : AddElectionstaffDetails}>{electionstaffid ? "Update" : "Submit"}</button>
  <button type="button" className="btn btn-primary mb-3"    onClick={GetAll}>Show</button>
  </div>
        </Card.Text>
      </Card.Body>
    </Card><br></br>



    { hideform && (
    <Card className='displayelectionstaffcard'>
      <Card.Header><h3 style={{ color: "darkblue", fontFamily: "sans-serif",textAlign:"center", fontWeight: "bold" }}>Eelction Staff List</h3></Card.Header>
      <Card.Body>
      <Card.Text>
<table className='table table-striped'>
<thead>
<tr>
  <th>Election Staff-id</th>
  <th>Election Staff Name</th>
  <th>Designation</th>
  <th>Mobileno</th>
  <th>Address</th>   
  <th>Password</th>   
  <th>Constituency-id</th>
  <th>Constituency Name</th>
</tr>
</thead>
<tbody>
{ electionstafflist.map((item, index) => (
            <tr key={index}>
      <td>{item.electionstaffid}</td>
      <td>{item.name}</td>
      <td>{item.designation}</td>
      <td>{item.mobileno}</td>
      <td>{item.address}</td>
      <td>{item.password}</td>
      <td>{item.constituency3.constituencyid}</td>
      <td>{item.constituency3.constituency}</td>
      <td>
        <button style={{color:"red",border:"none"}} onClick={() => assignvalue(item)}>
         <span className="material-icons" style={{ verticalAlign: "middle" }}>edit</span> 
          </button>
          </td>
    </tr>
))}
</tbody>
</table>
</Card.Text>
</Card.Body>
</Card>
)}
</>
)
}
