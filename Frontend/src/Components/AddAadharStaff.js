import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default function AddAadharStaff() 
{
  const[aadharstaffid,setAadharstaffid]=useState('');
  const[name,setName]=useState('');
  const[designation,setDesignation]=useState('');
  const[mobileno,setMobileno]=useState('');
  const[address,setAddress]=useState('');
  const[password,setPassword]=useState('');
  const[aadharstafflist,setAadharstafflist]=useState([]);
  const[hideform,setHideform]=useState(false);


  function Addaadharstaffdetails()    /*Post Aadhar staff Details*/
  {
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
    .post("http://localhost:8080/Addaadharstaffdetails",obj)
    .then((res)=>{
      toast.success(res.data);
      setHideform(false);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function Getallaadharstaffdetails()    /*Get all Aadhar staff Details*/
  {
    axios
    .get("http://localhost:8080/Getallaadharstaffdetails")
    .then((res)=>{
      setAadharstafflist(res.data);
      setHideform(true);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function  UpdateAadharstaff()    /*PUT */
  {
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
    .put(`http://localhost:8080/UpdateAadharstaff/${aadharstaffid}`,obj)
    .then((res)=>{
      toast.success(res.data);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
  }

  function assignvalue(aadharstaff)
  {
    setAadharstaffid(aadharstaff.aadharstaffid);
    setAddress(aadharstaff.address);
    setDesignation(aadharstaff.designation);
    setMobileno(aadharstaff.mobileno);
    setName(aadharstaff.name);
    setPassword(aadharstaff.password);
  }

  function clearAll()
  {
    setAadharstaffid("");
    setName("");
    setDesignation("");
    setMobileno("");
    setAddress("");
    setPassword("");
  }

  return (
    <>
     <Card className='addcity addadharstaffcard'>
      <Card.Header> <h3 style={{color:"darkblue",fontFamily:"sans-serif",textAlign:"center",fontWeight:"bold"}}>Add Aadhar Staff Details</h3></Card.Header>
      <Card.Body>
        <Card.Text>
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
   <button type="button" className="btn btn-success mb-3 me-2" onClick={aadharstaffid ? UpdateAadharstaff : Addaadharstaffdetails}>{aadharstaffid ? "Update": "Submit"}</button>
      <button type="button" className="btn btn-primary mb-3" onClick={Getallaadharstaffdetails}>Show</button>
      </div>
        </Card.Text>
      </Card.Body>
    </Card><br></br>


    {    hideform && (
    <Card className='displayadharstaffcard'>
      <Card.Header>  <h3 style={{ color: "darkblue", fontFamily: "sans-serif", textAlign:"center", fontWeight: "bold" }}>Aadhar Staff List</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <table className='table table-striped'>
<thead>
  <tr>
    <th>Aadhar Staff-id</th>
    <th>Aadhar Staff Name</th>
    <th>Designation</th>
    <th>Mobileno</th>
    <th>Address</th>   
    <th>Password</th>   
  </tr>
</thead>
<tbody>
{
  aadharstafflist.map((item,index)=>{
    return(
      <tr key={index}>
        <td>{item.aadharstaffid}</td>
        <td>{item.name}</td>
        <td>{item.designation}</td>
        <td>{item.mobileno}</td>
        <td>{item.address}</td>
        <td>{item.password}</td>
        <td>
        <button style={{color:"red",border:"none"}} onClick={() => assignvalue(item)}>
         <span className="material-icons" style={{ verticalAlign: "middle" }}>edit</span> 
          </button>
          </td>
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
