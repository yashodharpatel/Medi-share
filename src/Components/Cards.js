import React from 'react'
import Card from 'react-bootstrap/Card';
import Login from "../Components/Authentication/Login";

export const Cards = () => {
  return (
    <>
    <div className='d-flex'>
    <Card>
      <Card.Body>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Title>Be a Donar</Card.Title>
        
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Login/>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Title>Order a Medicine</Card.Title>
        
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Login/>
      </Card.Body>
    </Card>
    <Card>
      <Card.Body>
        <Card.Img variant="top" src="holder.js/100px180?text=Image cap" />
        <Card.Title>Be a Volunteer</Card.Title>
        
        <Card.Text>
          Some quick example text to build on the card title and make up the
          bulk of the card's content.
        </Card.Text>
        <Card.Link href="#">Card Link</Card.Link>
        <Login/>
      </Card.Body>
    </Card>
    </div>
     
    </>
  )
}
