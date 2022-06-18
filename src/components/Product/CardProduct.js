import React from 'react';
import { Button, Card } from 'react-bootstrap';

const CardProduct = (props) => {
   const {name , img} = props.product;
    return (
        <div className="col-md-4">
        <Card style={{ width: '18rem'}}>
        <Card.Img variant="top" src={img}/>
        <Card.Body>
            <Card.Title>{name}</Card.Title>
            <Card.Text>
            Some quick example text to build on the card title and make up the bulk of
            the content.
            </Card.Text>
            <Button variant="primary">Shop Now</Button>
        </Card.Body>
      </Card>
        </div>
    );
};

export default CardProduct;