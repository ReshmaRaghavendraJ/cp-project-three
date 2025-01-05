import React, { useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios';
import Card from 'react-bootstrap/Card';


export default function AddParty()
 {
   const[partyid,setPartyid]=useState('');
   const[party,setParty]=useState('');
   const[partylogo,setPartylogo]=useState('');
   const[partylist,setPartylist]=useState([]);
   const[hideform,setHideform]=useState(false);


  function Addpartydetails()
  {
    if(party==='') 
      {
        toast.error("please enter party name");
        return;
      }
      if(partylogo==='') 
        {
          toast.error("please enter party logo URL");
          return;
        }
    const obj={party,partylogo};
    axios
    .post("http://localhost:8080/Addpartydetails",obj)
    .then((res)=>{
      toast.success(res.data);
      setHideform(false);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function GetAllpartyDetails()  /*Get Party details*/
  {
    axios
    .get("http://localhost:8080/GetAllpartyDetails")
    .then((res)=>{
      setPartylist(res.data);
      setHideform(true);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function  UpdateParty()    /*PUT */
  {
    if(party==='') 
      {
        toast.error("please enter party name");
        return;
      }
      if(partylogo==='') 
        {
          toast.error("please enter party logo URL");
          return;
        }
    const obj={party,partylogo};
    axios
    .put(`http://localhost:8080/UpdateParty/${partyid}`,obj)
    .then((res)=>{
      toast.success(res.data);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    })
  }


  function assignvalue(parties)
  {
    setPartyid(parties.partyid);
    setParty(parties.party);
    setPartylogo(parties.partylogo);
  }
  
  function clearAll()
  {
    setPartyid("");
    setParty("");
    setPartylogo("");
  }

  return (
    <>
     <Card className='addcity addpartycard'>
      <Card.Header> <h3 style={{color:"darkblue",fontFamily:"sans-serif",textAlign:"center",fontWeight:"bold"}}>Add Party Details</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <label className='form-label'>Enter Party Name:</label>
      <input type="text" className="form-control mb-3" value={party} onChange={(e)=>setParty(e.target.value)}/>
      <label className='form-label'>Enter Party Logo URL:</label>
          <input
            type="text"
            className="form-control mb-3"
            value={partylogo}
            onChange={(e) => setPartylogo(e.target.value)}
            placeholder="Enter logo URL"
          />
      <div className='btnss'>
      <button type="button" className="btn btn-success mb-3 me-2" onClick={partyid ? UpdateParty : Addpartydetails}>{partyid ? "Update" : "Submit"}</button>
      <button type="button" className="btn btn-primary mb-3" onClick={GetAllpartyDetails}>Show</button>
      </div>
        </Card.Text>
      </Card.Body>
    </Card>


    {hideform && (
    <Card className='displaypartycard'>
      <Card.Header><h3 style={{ color: "darkblue", fontFamily: "sans-serif",textAlign:"center", fontWeight: "bold" }}>Party List</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <table className='table table-striped'>
<thead>
  <tr>
    <th>Partyid</th>
    <th>Party Name</th>
    <th>Party Logo</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
{
  partylist.map((item,index)=>{
    return(
      <tr key={index}>
        <td>{item.partyid}</td>
        <td>{item.party}</td>
        <td><img src={item.partylogo} alt="party logo" width="50px" height="50px"/></td>
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

