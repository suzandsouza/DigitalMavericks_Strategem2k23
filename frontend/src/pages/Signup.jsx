import { Button, Card, Form, Input, Divider } from "antd";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
export default function Signup(){
  return (
      <div className="containerControllerLogin">
        <Card className="cardl">
          <h1>Sign up</h1>
          <h2>
            Already have an account? <a href="/login">Sign In</a>
          </h2>
          <Form name="register-form">
            <Form.Item
              name="name"
              rules={[
                {
                  required: true,
                  message: "Please input your Full Name!",
                },
              ]}
            >
              <Input placeholder="Full name" />
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
              <Input placeholder="Email Id" />
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
              <Input placeholder="Phone Number" />
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