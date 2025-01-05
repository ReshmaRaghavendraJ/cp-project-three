import axios from 'axios';
import React, {  useState } from 'react'
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';

export default function Addcity() 
{
   const [cityid,setCityid]=useState();
  const [city,setCity]=useState();
  const[citylist,setcitylist]=useState([]);
  const[hideform,setHideform]=useState(false);


  function Addcitydetails()   /*Post*/
  {
    if(city==='') 
      {
        toast.error("please enter city name");
        return;
      }
  const obj={city};
    axios
    .post("http://localhost:8080/Addcitydetails",obj)
    .then((res)=>{
      toast.success(res.data);
      setHideform(false);
     clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

  function GetAllcityDetails()   /*Get*/
  {
    axios
    .get("http://localhost:8080/GetAllcityDetails")
    .then((res)=>{
      setcitylist(res.data);
      setHideform(true);
      clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }

function Editbasedonid()    /*PUT */
{
  if(city==='') 
    {
      toast.error("please enter city name");
      return;
    }
  const obj={city};
  axios
  .put(`http://localhost:8080/Editbasedonid/${cityid}`,obj)
  .then((res)=>{
    toast.success(res.data);
    GetAllcityDetails();
  })
  .catch((err)=>{
    toast.error(err.response.data);
  })
}

function assignvalue(cities)   /*assign values for PUT operation*/
{
  setCityid(cities.cityid);
  setCity(cities.city);
}

  function clearAll()
  {
   setCity('');
  }

  return (
    <>
    <div className='container mb-3 addcity'>
    
    <Card className='citycard'>
      <Card.Header><h3 style={{color:"darkblue",fontFamily:"sans-serif",textAlign:"center",fontWeight:"bold"}}>Add City Details</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <label className='form-label'>Enter city:</label>
      <input type="text" className="form-control mb-3" value={city} onChange={(e)=>setCity(e.target.value)}/>
        </Card.Text>
        <div className='btnss'>
        <button type="button" className="btn btn-success mb-3 me-2"  onClick={cityid ? Editbasedonid : Addcitydetails}>{cityid ? "Update" : "Submit"}</button>
      <button type="button" className="btn btn-primary mb-3" onClick={GetAllcityDetails}>Show</button>
      </div>
      </Card.Body>
    </Card>
    

{hideform && (
    <Card className='displaycitycard'>
      <Card.Header>   <h3 style={{ color: "darkblue", fontFamily: "sans-serif",textAlign:"center", fontWeight: "bold" }}>City List</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <table className='table table-striped'>
<thead>
  <tr>
    <th>Cityid</th>
    <th>City Name</th>
    <th>Action</th>
  </tr>
</thead>
<tbody>
{
  citylist.map((item,index)=>{
    return(
      <tr key={index}>
        <td>{item.cityid}</td>
        <td>{item.city}</td>
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
</div>
  </>
  )
}
