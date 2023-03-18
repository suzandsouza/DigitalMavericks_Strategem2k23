import React from 'react'
import { Button, Card, Col, Divider, Row } from "antd";
import PatientRegistrationFrom from "../components/Patient/PatientRegistrationFrom.jsx"
import Navbar from '../components/Navbar.jsx';
import homebg from '../assets/homebg.png'
import image1 from "../assets/image1.png"
import image2 from "../assets/image2.png"
import image3 from "../assets/image3.png"

export default function Home() {
  return (
    <div className='homeContainer'>
      <Navbar />
      <Col className="containerController">
      <img src={homebg} alt="homebg" />
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
      <div className="features" id="feature">
        <h1 className="heading">Our Unique Features</h1>
        <Divider className="divider" />
        <Row className="cardController">
          <Card className="card">
            <h1>Face Authentication</h1>
            <p>
              Authenticate Yourself Securely With Your Face!
            </p>
            <img alt="image1" src={image1} />
          </Card>
          <Card className="card">
            <h1>Digital Medical Records</h1>
            <p>
            You Can Upload The Records Before Your Visit!
            </p>
            <img alt="image2" src={image2} />
          </Card>
          <Card className="card">
            <h1>Get Tokens Virtually</h1>
            <p>
              Hasslefree token System for patients
            </p>
            <img alt="image3" src={image3} />
          </Card>
        </Row>
      </div>
      <Navbar />
      <p className='footer-home'>Made With ❤ By Team Digital Mavericks</p>
    </div>
  );
}
