import React from "react"
import { Button, Card, Form, Input, Divider,Select } from "antd";
import { Link ,useNavigate} from "react-router-dom";
import { URL } from "../utils/util.jsx"

import axios from "axios"

export default function Signup() {

  const navigate = useNavigate()
  const initialValues = {
    name: "",
    email: "",
    contact: "",
    password: "",
    role : ""
  }
  const [role , setRole]  =React.useState()

  const handleSubmit = async (values) => {
    console.log('Received values of form: ', values);
    let user  = {
      role : role
    }
    // made post request for sign up
    localStorage.setItem("User",JSON.stringify(user))
    navigate("/dashboard")
  }

  const handleSelect = (e)=>{
    setRole(e)
  }
  return (
    <div className="containerController">
      <Card className="card">
        <h1>Sign up</h1>
        <h2>
          Already have an account? <a href="/login">Sign In</a>
        </h2>

        <Form name="register-form"
          onFinish={handleSubmit}
          initialValues={initialValues}>
          <Form.Item
            name="name"
            rules={[
              {
                required: true,
                message: "Please input your Full Name!",
              },
            ]}
          >
            <Input type="text" placeholder="Full name" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="email"placeholder="Email Id" />
          </Form.Item>
          <Form.Item
            name="contact"
            rules={[
              {
                required: true,
                message: "Please input your email!",
              },
            ]}
          >
            <Input type="tel"placeholder="Phone Number" />
          </Form.Item>

          <Form.Item
            rules={[
              {
                required: true,
                message: 'Please select Your Role',
              },
            ]}
          >
            <Select placeholder="select your Role" onSelect={handleSelect}>
              <Option value="patient">Patient</Option>
              <Option value="admin/Doctor">Admin / Doctor</Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="password"
            rules={[
              {
                required: true,
                message: "Please input your password!",
              },
            ]}
          >
            <Input type="password" placeholder="Password" />
          </Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="loginButton"
          >
            Sign Up
          </Button>
          <Divider></Divider>
          <Link type="primary" to={"/"} >Go To HomePage</Link>
        </Form>
      </Card>
    </div>
  );
}