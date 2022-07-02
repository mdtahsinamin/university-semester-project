
import { Container, Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const MiddleBar = () => {
    return (
    <Navbar className ="navbar-container">
      <Container className ="d-flex justify-content-center">
          <Nav className ="d-flex justify-content-center">
            <Nav.Link>
               <Link to ='/all-products'>Hot Deals</Link>
            </Nav.Link>
            <Nav.Link>
               <Link to ='/search'>Search</Link>
            </Nav.Link>
            <Nav.Link>
               <Link to ='/all-products'>Laptops</Link>
            </Nav.Link>
            <Nav.Link>
            <Link to ='/all-products'>Smartphones</Link>
            </Nav.Link>
          </Nav>
      </Container>
    </Navbar>
    );
};

export default MiddleBar;