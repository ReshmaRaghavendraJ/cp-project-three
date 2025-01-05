import React, { useEffect } from 'react'
import Nav from 'react-bootstrap/Nav';
import { Link, useLocation } from 'react-router-dom';
import { useState } from 'react';

export default function Navbar()
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
              to="/"
              style={getLinkStyle('/')}
              className="nav-link-custom"
            >
              Home
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='navitem'>
            <Nav.Link
              as={Link}
              to="/About"
              style={getLinkStyle('/About')}
              className="nav-link-custom"
            >
              About
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='navitem'>
            <Nav.Link
              as={Link}
              to="/Login"
              style={getLinkStyle('/Login')}
              className="nav-link-custom"
            >
              Login
            </Nav.Link>
          </Nav.Item>
          <Nav.Item className='navitem'>
            <Nav.Link
              as={Link}
              to="/Contact"
              style={getLinkStyle('/Contact')}
              className="nav-link-custom"
            >
              Contact
            </Nav.Link>
          </Nav.Item>
        </Nav>
        <h1 className='text-center' style={{ color: "white", fontFamily: "fantasy", marginTop: "-120px" }}>
          Empower Democracy
        </h1>
      </div>
      </>
  )
}
