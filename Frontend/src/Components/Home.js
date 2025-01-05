import React from 'react';
import './styles.css';
import Carousel from 'react-bootstrap/Carousel';
import Navbar from './Navbar';

export default function Home() {


  return (
    <>
      
    <Navbar/>
      <div style={{ marginTop: "72px" }}>
        <Carousel data-bs-theme="dark">
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://media.istockphoto.com/id/1097228434/photo/close-up-of-human-hand-casting-and-inserting-a-vote-and-choosing-and-making-a-decision-what.jpg?s=612x612&w=0&k=20&c=gpO2ZzhWoj4wn6MzxlwclyAjBQh0LuMr5gAMCIzK9qM="
              height="500px"
              alt="First slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://s3-h2s-v2.s3.ap-south-1.amazonaws.com/2023-03-09T11%3A29%3A56.308Z-9th%20March%20ps1%20%E2%80%93%202%20%281%29-compressed.jpg"
              height="500px"
              alt="Second slide"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img
              className="d-block w-100"
              src="https://img.freepik.com/free-vector/vote-india-voters-day-tricolor-background-celebrate-democracy_1017-50479.jpg"
              height="500px"
              alt="Third slide"
            />
          </Carousel.Item>
        </Carousel>
      </div><br />
    </>
  );
}
