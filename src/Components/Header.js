import React, { useState } from "react";
import { Link } from "react-router-dom";
import NGOLogin from "./NGO Authentication/NGOLogin"
import Forgotpassword from "./Authentication/Forgotpassword";

export const Header = () => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(!clicked);
  };

  return (
    <>
      {/* <Navbar bg="light" expand="lg">
        <Container>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#home">Home</Nav.Link>
              <Nav.Link href="#link">Link</Nav.Link>
              <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar> */}
      <div className="nav banner-nav" id="nav">
      <div className="set-width-1400">
        <div className="inside-nav">
          <div className="d-flex align-items-center justify-content-center">
            <div className="menu-icon" onClick={handleClick}>
              <i className={clicked ? "fas fa-times" : "fas fa-bars"} />
            </div>
            <div className="logo">
              <Link to="/" className="remove-td" style={{ color: "#048dbb" }}>
                medi<span style={{ color: "black" }}>share</span>
              </Link>
            </div>
          </div>
          <ul
            className={
              clicked
                ? "nav-links banner-navlinks"
                : "nav-links banner-navlinks close"
            }
          >
            <li>Support</li>
            <li>Learn</li>
            <li>Contact</li>
          </ul>
          <NGOLogin />
        </div>
        <Forgotpassword />
      </div>
    </div>
    </>
  );
};
