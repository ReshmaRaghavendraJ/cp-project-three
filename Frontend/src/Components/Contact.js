import Navbar from './Navbar';
import Card from 'react-bootstrap/Card';
import flag1  from '../Components/flag1.mp4';


export default function Contact() 
{


  return (
    <>
      <Navbar/>

    <div className="video-container" style={{ textAlign: "center", marginTop: "72px" }}>
        <video width="100%" height="auto" controls>
          <source src={flag1} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>


    <Card className='cards'>
      <Card.Body>
        <Card.Title><h3 style={{textAlign:"center"}}>Contact-Us</h3></Card.Title>
        <Card.Text>
          Address:  Nirvachan Sadan,
          Ashoka Road, New Delhi 110001
        </Card.Text>
        <Card.Text>
        Control Room:
        23052220, 23052221
        </Card.Text>
        <Card.Text>
        Email:
        electionoffice@gmail.com
        </Card.Text>
      </Card.Body>
    </Card>
    </>
  )
}
