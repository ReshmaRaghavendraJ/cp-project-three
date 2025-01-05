import { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Card from 'react-bootstrap/Card';

export default function VoterRegister() 
{
    const [voterid,setvoterid]=useState('');
  const [name,setName]=useState('');
  const [age,setAge]=useState('');
  const [address,setAddress]=useState('');
  const [mobileno,setMobileno]=useState('');
  const [password,setPassword]=useState('');
 const[voterregisterlist,setVoterregisterlist]=useState([]);
 const[filepath,setFilePath]=useState("");
 const[hideform,setHideform]=useState(false);
 const[adharno,setAdharno]=useState('');

 const Image=(e)=>{
  let file=e.target.files[0];
  setFilePath(file);
  const reader=new FileReader();
  reader.readAsDataURL(file);
  reader.onload=()=>{
    setFilePath(reader.result);
  };
 };

 
  function AddVoterRegister()    /*this function is for Post Voter Register details based on Consituency */
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
        if(age<18)
          {
            toast.error("Can't generate Voter Card for below 18 years old")
            return;
          }
        if(adharno==='')
        {
          toast.error("Please enter adharno");
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
            if(password==='') 
              {
                toast.error("please enter password");
                return;
              }
              if(!filepath) 
                {
                  toast.error("please upload your photo");
                  return;
                }
    const conname=sessionStorage.getItem('constituencyid');
    const formData = new FormData();
    formData.append('filepath', filepath);
    const obj={name,age,adharno,address,mobileno,password,filepath};
    axios
    .post(`http://localhost:8080/AddVoterRegister/${conname}`,obj)
    .then((res)=>{
      toast.success(res.data);
      alert("Image uploaded Successfully");
      setHideform(false);
     clearAll();
    })
    .catch((err)=>{
      toast.error(err.response.data);
      alert("Error while uploading image")
    });
  }
    
  // function GetAllVoterRegisterDetails()       /*this function is for Get all Voter Register details */
  // {
  //   axios
  //   .get("http://localhost:8080/GetAllVoterRegisterDetails")
  //   .then((res)=>{
  //       setVoterregisterlist(res.data);
  //     clearAll();
  //   })
  //   .catch((err)=>{
  //     toast.error(err.response.data);
  //   });
  // }


  function GetByConId ()    /*this function is for Get Voter details  who belongs to particular constituency id */
  {
    const conname=sessionStorage.getItem('constituencyid');
    axios
    .get(`http://localhost:8080/GetByConId/${conname}`)
    .then((res)=>{
        setVoterregisterlist(res.data);
        setHideform(true);
    })
    .catch((err)=>{
      toast.error(err.response.data);
    });
  }


  function UpdateVoterReg()   /*PUT */
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
        if(age<18)
        {
          toast.error("Can't generate Voter Card for below 18 years old")
          return;
        }
        if(adharno==='')
          {
            toast.error("Please enter adharno");
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
              if(!filepath) 
                {
                  toast.error("please upload your photo");
                  return;
                }
    const conname=sessionStorage.getItem('constituencyid');
    const formData = new FormData();
    if (filepath) {
      formData.append('filepath', filepath); // Append file to form data
  }
   // formData.append('filepath', filepath);   // Append file to form data
    const obj={name,age,adharno,address,mobileno,password,filepath};
  axios
  .put(`http://localhost:8080/UpdateVoterReg/${voterid}/${conname}`,obj)
  .then((res)=>{
    toast.success(res.data);
    alert("Image uploaded Successfully")
  })
  .catch((err)=>{
    toast.error(err.response.data);
    alert("Error while uploading image")
  })
  }

  function assignvalue(voters)
  {
    setvoterid(voters.voterid);
    setName(voters.name);
    setAge(voters.age);
    setAdharno(voters.adharno);
    setAddress(voters.address);
    setMobileno(voters.mobileno);
    setPassword(voters.password);
    setFilePath(voters.filepath);
  }

  function clearAll()
  {
    setAdharno("");
    setvoterid("");
    setName("");
    setAge("");
    setAddress("");
    setMobileno("");
    setPassword("");
    setFilePath("");
  }

  return (
    <>
    <Card className='addcity addvoterreg'>
      <Card.Header><h3 style={{color:"darkblue",fontFamily:"sans-serif",textAlign:"center",fontWeight:"bold"}}>Add Voter Register</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <label className='form-label'>Enter Name:</label>
    <input type="text" className="form-control mb-3" value={name} onChange={(e)=>setName(e.target.value)}/>

    <label className='form-label'>Enter Age:</label>
    <input type="text" className="form-control mb-3" value={age} onChange={(e)=>setAge(e.target.value)}/>

    <label className='form-label'>Enter Adharno:</label>
    <input type="text" className="form-control mb-3" value={adharno} onChange={(e)=>setAdharno(e.target.value)}/>

    <label className='form-label'>Enter Address:</label>
    <input type="text" className="form-control mb-3" value={address} onChange={(e)=>setAddress(e.target.value)}/>

    <label className='form-label'>Enter Mobileno:</label>
    <input type="text" className="form-control mb-3" value={mobileno} onChange={(e)=>setMobileno(e.target.value)} placeholder='+91'/>

    <label className='form-label'>Enter Password:</label>
    <input type="password" className="form-control mb-3" value={password} onChange={(e)=>setPassword(e.target.value)} placeholder='*****'/>

    <label>Upload your Photo:</label>
    <input type="file" className="form-control mb-3" onChange={Image}/>
    <div className='btnss'>
    <button type="button" className="btn btn-success mb-3 me-2" onClick={voterid ? UpdateVoterReg : AddVoterRegister}>{voterid ? "Update" : "Submit"}</button>
    <button type="button" className="btn btn-primary mb-3" onClick={GetByConId}>Show</button>
    </div>
        </Card.Text>
      </Card.Body>
    </Card><br></br>


    { hideform && (
    <Card className='displayvoterreg'>
      <Card.Header><h3 style={{ color: "darkblue", fontFamily: "sans-serif", textAlign:"center", fontWeight: "bold" }}>Voter Register List</h3></Card.Header>
      <Card.Body>
        <Card.Text>
        <table className='table table-striped'>
<thead>
  <tr>
    <th>Voterid</th>
    <th> Name</th>
    <th>Age</th>
    <th>Adharno</th>
    <th>Address</th>
    <th>Mobileno</th>
    <th>Password</th>
    <th>Constituency-id</th>
    <th>Constituency</th>
    <th>Photo</th>
    <th>Edit</th>
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
        <td>{item.age}</td>
        <th>{item.adharno}</th>
        <td>{item.address}</td>
        <td>{item.mobileno}</td>
        <td>{item.password}</td>
        <td>{item.constituency.constituencyid}</td>
        <td>{item.constituency.constituency}</td>
        <td><img src={item.filepath} alt="voter" width="150" height="150" /></td>
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
