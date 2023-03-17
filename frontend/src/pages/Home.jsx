import React from 'react'
import { Button, Card, Col, Divider, Row } from "antd";
import PatientRegistrationFrom from "../components/Patient/PatientRegistrationFrom.jsx"

export default function Home() {
  return (
    <div className='homeContainer'>
      <Col className="containerController">
        <Col className="text">
          <h1>
            Booking An Appointment
            <br />
            Made Easy!
          </h1>
          <h2>We provide safe, secure and hasslefree patient registration.</h2>
          <Button type="primary" className="button">
            <a href="/signup">Signup Now!</a>
          </Button>
        </Col>
      </Col>
      <div className="features">
        <h1 className="heading">Our Unique Features</h1>
        <Divider className="divider" />
        <Row className="cardController">
          <Card className="card">
            <h1></h1>
            <p>
              
            </p>
            {/* <img alt="" src={"/images/1.png"} /> */}
          </Card>
          <Card className="card">
            <h1></h1>
            <p>
            </p>
            {/* <img alt="" src={"/images/2.png"} /> */}
          </Card>
          <Card className="card">
            <h1></h1>
            <p>
        
            </p>
            {/* <img alt="" src={"/images/3.png"} /> */}
          </Card>
        </Row>
      </div>
    </div>
  );
}
