import React from 'react'
import {Link} from 'react-router-dom'
import { Row, Col, Button } from 'react-bootstrap'

export default function Dashboard() {
  return (
   <>
   <div>
        <Row>
            <Col><Button><Link to="/donar">Donar</Link></Button></Col>
            <Col><Button>Receiver</Button></Col>
            <Col><Button>Volunteer</Button></Col>
        </Row>
   </div>
   </>
  )
}
