import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';

export default function AddConstituency() 
{
  const[constituencyid,setConstituencyid]=useState('');
  const[constituency,setConstituency]=useState('');
  const[citylist,setCitylist]=useState([ ]);    /* This is for listing in Dropdown select options */
  const[selectcity,setSelectedcity]=useState('');
  const[constituencylist,setConstituencylist]=useState([ ]);  /* This is for listing in table */
  const[hideform,setHideform]=useState(false);

useEffect(()=>{
  GetAllcityDetails();
},[])

  function AddConstituencydetails()  /*post constituency based on cityid*/
  {
    if(selectcity==='')
    {
      toast.error("please select city options");
      return;
    }
    if(constituency==='') 
      {
        toast.error("please enter constituency name");
        return;
      }
  const obj={constituency};
    axios
    .post(`http://localhost:8080/AddConstituencydetails/${selectcity}`,obj)
    .then((res)=>{
      toast.success(res.data);
      setHideform(false);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function GetAllcityDetails()  /*Get All City in drop downlist*/
  {
    axios
    .get("http://localhost:8080/GetAllcityDetails")
    .then((res)=>{
     setCitylist(res.data);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function GetAllConstituency() /*Get All constituency Details*/
  {
    axios
    .get("http://localhost:8080/GetAllConstituency")
    .then((res)=>{
     setConstituencylist(res.data);
     setHideform(true);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function updateconstituency()     /*PUT */
{
  if(selectcity==='')
    {
      toast.error("please select city options");
      return;
    }
    if(constituency==='') 
      {
        toast.error("please enter constituency name");
        return;
      }
  const obj={constituency};
  axios
  .put(`http://localhost:8080/updateconstituency/${constituencyid}/${selectcity}`,obj)
  .then((res)=>{
    toast.success(res.data);
    GetAllConstituency(); 
  })
  .catch((err)=>{
    toast.error(err.response.data);
  })
}
  
  function assignvalue(constituencies)        /*assign values for PUT operation*/
  {
    setConstituencyid(constituencies.constituencyid);
    setConstituency(constituencies.constituency);
    setSelectedcity(constituencies.city.cityid);
  }

  function clearAll()
  {
    setConstituencyid('');
    setConstituency('');
    setSelectedcity('');
    setCitylist([""]);
  }

  return (
    <>
    <Card className='addcity addconstituencycard'>
      <Card.Header><h3 style={{color:"darkblue",fontFamily:"sans-serif", textAlign:"center",fontWeight:"bold"}}>Add Constituency</h3>
      </Card.Header>
      <Card.Body>
        <Card.Text>
        <label>Select City and City-id:</label>
    <select className="form-select" value={selectcity} onChange={(e)=>setSelectedcity(e.target.value)}>
    <option value={0}>--Select Options--</option>
    {
      citylist.map((item,index)=>(
        <option key={index} value={item.cityid}>{item.cityid}-{item.city}</option>
      ))
    }
    </select>
    <label className='form-label'>Enter Constituency:</label>
    <input type="text" className="form-control mb-3" value={constituency} onChange={(e)=>setConstituency(e.target.value)}/>
    <div className='btnss'>
    <button type="button" className="btn btn-success mb-3 me-2" onClick={constituencyid ? updateconstituency : AddConstituencydetails}>{constituencyid ?  "Update" : "Submit"}</button>
    <button type="button" className="btn btn-primary mb-3" onClick={GetAllConstituency}>Show</button>
    </div>
    </Card.Text>
    </Card.Body>
    </Card>

    {hideform && (
    <Card className='displayconstituencycard'> 
      <Card.Header>    <h3 style={{ color: "darkblue", fontFamily: "sans-serif", textAlign:"center", fontWeight: "bold" }}>Constituency List</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <table className="table table-striped" style={{ marginLeft: "10px" }}>
        <thead>
          <tr>
          <th>City-id</th>
          <th>City Name</th>
          <th>Constituency-id</th>
          <th>Contituency Name</th>
          <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {
            constituencylist.map((item,index)=>(
              <tr key={index}>
                 <td>{item.city.cityid}</td>
                 <td>{item.city.city}</td>
                <td>{item.constituencyid}</td>
                <td>{item.constituency}</td>
                <td>
        <button style={{color:"red",border:"none"}} onClick={() => assignvalue(item)}>
         <span className="material-icons" style={{ verticalAlign: "middle" }}>edit</span> 
          </button>
          </td>
              </tr>
            ))
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
