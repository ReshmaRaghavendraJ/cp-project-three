import React from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import { useState } from 'react';
import Card from 'react-bootstrap/Card';
import { format  } from 'date-fns';

export default function AddElectionDate()
 {

  const[electionid,setElectionid]=useState('');
   const[electionname,setElectionname]=useState('');
   const[startdatetime,setElectionstartdate]=useState('');
   const[enddatetime,setElectionenddate]=useState('');
   const[electiondatelist,setElectiondatelist]=useState([]);
   const[hideform,setHideform]=useState(false);

   function AddElectiondateDetails()
  {
  if(electionname==='') 
    {
      toast.error("please enter Election name");
      return;
    }
    if(startdatetime==='') 
      {
        toast.error("please enter Election Start Date");
        return;
      }
      if(enddatetime==='') 
        {
          toast.error("please enter Election End Date");
          return;
        }
    const obj={electionname,startdatetime,enddatetime};
    axios
    .post(`http://localhost:8080/AddElectiondateDetails`,obj)
    .then((res)=>{
      toast.success(res.data);
      setHideform(false);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  
  function Getall()
  {
    axios
    .get("http://localhost:8080/Getall")
    .then((res)=>{
      setElectiondatelist(res.data);
      setHideform(true);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }


  function assignvalue(dates)
  {
    setElectionid(dates.electionid)
    setElectionstartdate(dates.startdatetime)
    setElectionenddate(dates.enddatetime)
    setElectionname(dates.electionname)
  }

  function clearAll()
  {
    setElectionstartdate("");
    setElectionenddate("");
    setElectionname("");
  }

  function  Updatedate()    /*PUT */
  {
    if(electionname==='') 
      {
        toast.error("please enter Election name");
        return;
      }
      if(startdatetime==='') 
        {
          toast.error("please enter Election Date");
          return;
        }
        if(enddatetime==='') 
          {
            toast.error("please enter Election Date");
            return;
          }
    const obj={electionname,startdatetime,enddatetime};
    axios
    .put(`http://localhost:8080/Updatedate/${electionid}`,obj)
    .then((res)=>{
      toast.success(res.data);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
  }

  function handleStartDateChange(date) {
    const formattedDate = format(new Date(date), "yyyy-MM-dd'T'HH:mm");
    setElectionstartdate(formattedDate);
  }
  
  function handleEndDateChange(date) {
    const formattedDate = format(new Date(date), "yyyy-MM-dd'T'HH:mm");
    setElectionenddate(formattedDate);
  }
  
  
  


  return (
    <>
      <Card className='addcity addelectiondatecard'>
      <Card.Header>    <h3 style={{color:"darkblue",fontFamily:"sans-serif",textAlign:"center",fontWeight:"bold"}}>Add Election Date Details</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <label className='form-label mb-3'>Enter Election Name:</label>
      <input type="text" className="form-control mb-3" value={electionname} onChange={(e)=>setElectionname(e.target.value)}/>

      <label className='form-label mb-3'>Enter Election Start Date:</label>
      <input type="datetime-local" className="form-control mb-3" value={startdatetime} onChange={(e)=>handleStartDateChange(e.target.value)}/><br></br>
   

      <label className='form-label mb-3'>Enter Election End Date:</label>
       <input type="datetime-local" className="form-control mb-3" value={enddatetime} onChange={(e)=>handleEndDateChange(e.target.value)}/><br></br>
    
    <div className='btnss'>
      <button type="button" className="btn btn-success mb-3 me-2" onClick={electionid ? Updatedate : AddElectiondateDetails}>{electionid ? "Update" : "Submit"}</button>
      <button type="button" className="btn btn-primary mb-3 me-2" onClick={Getall}>Show</button>
      </div>
        </Card.Text>
      </Card.Body>
    </Card><br></br>



    { hideform && (
    <Card className='displayelectiondatecard'>
      <Card.Header>   <h3 style={{ color: "darkblue", fontFamily: "sans-serif", textAlign:"center", fontWeight: "bold" }}>Election Date List</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <table className='table table-striped'>
<thead>
  <tr>
    <th>Election id</th>
    <th>Election Name</th>
    <th>Election Start Date</th>
    <th>Election End Date</th>
  </tr>
</thead>
<tbody>
{
  electiondatelist.map((item,index)=>{
    return(
      <tr key={index}>
        <td>{item.electionid}</td>
        <td>{item.electionname}</td>
        <td>{item.startdatetime}</td>
        <td>{item.enddatetime}</td>
        <td>
        <button style={{color:"red",border:"none"}} onClick={()=> assignvalue(item)}>
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
