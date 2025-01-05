import React from 'react';
import Navbar from './Navbar';
import './styles.css';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

export default function About() {

  return (
    <>
    <Navbar/><br></br><br></br><br></br>
        
        <h1 style={{ color: "green", textAlign: "center" }}>Voting is your right and your duty</h1><br></br>
        <Container style={{marginLeft:"200px",marginTop:"-5px"}}>
      <Row>
        <Col><img className="imggs" src="https://t4.ftcdn.net/jpg/03/01/88/91/360_F_301889163_tHkgenQP5srhNYmMUnOBTCVURCzEaTkK.jpg" alt="backgrdimg1" width="500px" height="400px" style={{border:"2px solid black"}}/></Col>
        <Col><img className="imggs" src="https://t3.ftcdn.net/jpg/07/84/53/30/360_F_784533049_NH4E05ipQ60QI3JVdKmRX3b75UcHnag4.jpg" alt="backgrdimg1" width="400px" height="400px" style={{marginLeft:"-70px",border:"2px solid black"}}/></Col>
      </Row>
      <Row>
        <Col><img className="imggs" src="https://media.istockphoto.com/id/2166761483/photo/a-hand-holds-a-ballot-paper-in-a-ballot-box-against-the-background-of-the-indian-flag-people.jpg?s=612x612&w=0&k=20&c=85TNdX4l3h4vlSIH7PbxLFi1mi5B8GQPKb1Yj-tcJwI=" alt="backgrdimg1" height="300px" width="300px" style={{border:"2px solid black"}}/></Col>
        <Col><img className="imggs" src="https://st5.depositphotos.com/73622836/71457/v/450/depositphotos_714575186-stock-illustration-illustration-hand-voting-sign-india.jpg" alt="backgrdimg1" width="350px" height="300px" style={{marginLeft:"-80px",border:"2px solid black"}}/></Col>
        <Col><img className="imggs" src="https://www.mnnonline.org/wp-content/uploads/2024/05/pexels-stillpixels-3699921.jpg" alt="backgrdimg1" width="250px" height="300px" style={{marginLeft:"-110px",border:"2px solid black"}}/></Col>
      </Row>
    </Container><br></br>
    </>
  );
}
