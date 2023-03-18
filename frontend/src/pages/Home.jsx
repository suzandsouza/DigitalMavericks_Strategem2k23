import React from 'react'
import { Divider, Card, Avatar, Row, Col, Button } from "antd"
import { Link } from "react-router-dom"
import PatientRegistrationFrom from "../components/Patient/PatientRegistrationFrom.jsx"
import { data } from '../components/Cards/dummyData.jsx'
const Home = () => {

  const [role, setRole] = React.useState(JSON.parse(localStorage.getItem("User")) || "")
  const { Meta } = Card
  const [allAppointmentsData, setAppointmentData] = React.useState(data)

  const appointCard = allAppointmentsData?.map((app, index) => {
    console.log(app)
    return (
      <Col sm={24} md={6} lg={8} key={index}>
        <Link to={`/auth/${app.patientName}`}>
          <Card
            style={{
              width: "100%"
            }}

          >
            <Meta
              avatar={<Avatar src={app.doctorImage} size={"large"} />}
              title={app.doctorName}
              description={app.reason}
            />
            <Divider orientation='left'> Reason</Divider>
            <p>{app.reason}</p>
            <Divider orientation='left'></Divider>
            <div className='timeslot'>
              <p>{app.Date} , {app.Day}</p>
            </div>
          </Card>
        </Link>
      </Col>
    )
  })
  return (
    <div className='home_container book_appointment_section'>
      {
        role === "Patient" ?
          <Button type="primary" ><Link to={"/appointment"}>Book Appointment </Link></Button>

          :
          ""
      }
      {
        role &&
        <Divider orientation='left'><h1>{role === "patient" ? "Your Appointments" : "All Appointment"}</h1></Divider>
      }     
       {
        !appointCard || role !== "admin/Doctor"? 
            <Button><Link to={"/appointment"}>Book Appointment</Link></Button>
        :
        <Row gutter={[16, 16]}>
          {appointCard}
        </Row>
      } 
      {/* HElLp */}
      {/* <PatientRegistrationFrom /> */}
    </div>
  )
}

export default Home