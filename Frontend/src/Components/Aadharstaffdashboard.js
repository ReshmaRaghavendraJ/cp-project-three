import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Outlet } from 'react-router-dom'
import Nav from 'react-bootstrap/Nav';

export default function Aadharstaffdashboard() 
{
  const location = useLocation(); // Get current location
  const [activeKey, setActiveKey] = useState(location.pathname);

  useEffect(() => {
    setActiveKey(location.pathname); // Update active key when location changes
  }, [location]);

  // Function to determine the color based on the active state
  const getLinkStyle = (path) => {
    return activeKey === path ? { color: "blue", backgroundColor: "white"} : { color: "pink" };
  };

  return (
    <>
       <div>
        <Nav
          className="nav"
          variant="tabs"
          activeKey={activeKey}
          onSelect={setActiveKey}
          style={{
            height: "138px",
            textAlign: "center",
            background: "darkblue",
            fontSize: "larger",
            fontWeight:"bold",
            width:"100%"
          }}
        >
          <Nav.Item className='navitem'>
            <Nav.Link
              as={Link}
              to="Aadharcardholder"
              style={getLinkStyle('/Aadharcardholder')}
              className="nav-link-custom"
            >
              Add-Aadharcardholder
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='navitem'>
            <Nav.Link
              as={Link}
              to="/"
              style={getLinkStyle('/')}
              className="nav-link-custom"
            >
              Logout
            </Nav.Link>
          </Nav.Item>
          </Nav>
          <h1 className='text-center' style={{ color: "white", fontFamily: "fantasy", marginTop: "-130px" }}>
          Empower Democracy
        </h1>
        <h4 style={{color:"cyan",textAlign:"center"}}>Welcome to AadharStaff Dashboard</h4>
      </div>
      <Outlet/>
    </>
  )
}
