import { Button, Card, Form, Input, Row, Col,Divider } from "antd";
import { Link } from "react-router-dom";
export default function Login() {
  return (
    <Row className="containerControllerLogin">
      <Col xs={24} sm={4} md={6} lg={8} xl={12}>
        <Card className="cardl">
          <h1>Login</h1>
          <h2>
            Don't have an account? <a href="/signup">Sign Up</a>
          </h2>
          <Form
            name="register-form"
          >
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
              Sign In
            </Button>

            <Divider></Divider>
            <Link type="primary" to={"/"} >Go To HomePage</Link>
          </Form>
        </Card>
      </Col>

    </Row>
  );

}
