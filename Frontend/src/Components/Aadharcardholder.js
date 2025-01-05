import React from 'react'
import { useState } from 'react';
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from 'react-bootstrap/Card';

export default function Aadharcardholder() 
{
  const [aadharcardno, setAadharcardno] = useState('');
  const [name,setName]=useState('');
  const [age,setAge]=useState('');
  const [address,setAddress]=useState('');
  const [mobileno,setMobileno]=useState('');
  const [editflag,setEditFlag]=useState(false);
  const[aadharcardholderlist,setAadharcardholderlist]=useState([]);
  const[hideform,setHideform]=useState(false);


  function AddaadharcardholderDetails()  /*this function is for posting aadharcardholder details*/
  {
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
    const obj={name,age,address,mobileno};
    axios
    .post("http://localhost:8080/AddaadharcardholderDetails",obj)
    .then((res)=>{
      toast.success(res.data);
      setHideform(false);
     clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function GetAllaadharcardholderDetails()   /*this function is for Get all aadharcardholder details */
  {
    axios
    .get("http://localhost:8080/GetAllaadharcardholderDetails")
    .then((res)=>{
      setAadharcardholderlist(res.data);
      setHideform(true);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function  UpdateAadharcardholder()    /*PUT */
  {
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
    const obj={address,age,mobileno,name};
    axios
    .put(`http://localhost:8080/UpdateAadharcardholder/${aadharcardno}`,obj)
    .then((res)=>{
      toast.success(res.data);
      setEditFlag(false);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
  }


function assignvalue(cards)
{
  setAadharcardno(cards.aadharcardno); // Store the aadharcardno to be used for update
  setAddress(cards.address);
  setAge(cards.age);
  setMobileno(cards.mobileno);
  setName(cards.name);
  setEditFlag(true);
}

  function clearAll()
  {
  setName('');
  setAge('');
  setAddress('');
  setMobileno('');
  }

  return (
    <>
    <Card className='addcity addadharcardholder'>
      <Card.Header> <h3 style={{color:"darkblue",fontFamily:"sans-serif",textAlign:"center",fontWeight:"bold"}}>Add Aadharcard Hoder Details</h3></Card.Header>
      <Card.Body>
        <Card.Text>

    <label className='form-label'>Enter Name:</label>
    <input type="text" className="form-control mb-3" value={name} onChange={(e)=>setName(e.target.value)}/>

    <label className='form-label'>Enter Age:</label>
    <input type="text" className="form-control mb-3" value={age} onChange={(e)=>setAge(e.target.value)}/>

    <label className='form-label'>Enter Address:</label>
    <input type="text" className="form-control mb-3" value={address} onChange={(e)=>setAddress(e.target.value)}/>

    <label className='form-label'>Enter Mobileno:</label>
    <input type="text" className="form-control mb-3" value={mobileno} onChange={(e)=>setMobileno(e.target.value)} placeholder='+91'/>
    <div  className='btnss'>
    <button type="button" className="btn btn-success mb-3 me-2" onClick={editflag?UpdateAadharcardholder:AddaadharcardholderDetails}>{editflag?"Update":"Submit"}</button>
    <button type="button" className="btn btn-primary mb-3" onClick={GetAllaadharcardholderDetails}>Show</button>
    </div>
        </Card.Text>
      </Card.Body>
    </Card><br></br>


    
      { hideform && (
    <Card className='displayadharcardholder'>
      <Card.Header> <h3 style={{ color: "darkblue", fontFamily: "sans-serif",textAlign:"center", fontWeight: "bold" }}>Aadharcard Hoder List</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <table className='table table-striped'>
<thead>
  <tr>
    <th>Aadharcardno</th>
    <th> Name</th>
    <th>Age</th>
    <th>Address</th>
    <th>Mobileno</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
{
  aadharcardholderlist.map((item,index)=>{
    return(
      <tr key={index}>
        <td>{item.aadharcardno}</td>
        <td>{item.name}</td>
        <td>{item.age}</td>
        <td>{item.address}</td>
        <td>{item.mobileno}</td>
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
