
import React from 'react';
import { Container, Nav, Navbar } from 'react-bootstrap';

const MiddleBar = () => {
    return (
    <Navbar className ="navbar-container">
      <Container className ="d-flex justify-content-center">
          <Nav className ="d-flex justify-content-center">
            <Nav.Link href="#action1">Home</Nav.Link>
            <Nav.Link href="#action2">Hot Deals</Nav.Link>
            <Nav.Link href="#">Categories</Nav.Link>
            <Nav.Link href="#">Laptops</Nav.Link>
            <Nav.Link href="#">Smartphones</Nav.Link>
            <Nav.Link href="#">Cameras</Nav.Link>
            <Nav.Link href="#">Accessories</Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    );
};

export default MiddleBar;