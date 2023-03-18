import React from 'react'
import { UploadOutlined, UserOutlined, VideoCameraOutlined ,AppstoreAddOutlined,LoginOutlined,UserAddOutlined  } from '@ant-design/icons';
import { Layout, Menu} from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;4

const CustomSlider = () => {

  const slider_items = [
    {
      icon : AppstoreAddOutlined ,
      label : "Take Appointment",
      path : "/appointment"
    },
    {
      icon : LoginOutlined ,
      label : "Login",
      path : "/login"
    },
    {
      icon : UserAddOutlined,
      label : "Sign Up",
      path : "/signup"
    }

  ]
  return (
    <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onBreakpoint={(broken) => {
          console.log(broken);
        }}
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
      >
        <h1 className="logo" >CareConnect</h1>
        <Menu
          theme='dark'
          mode="inline"
          defaultSelectedKeys={['4']}
          items={slider_items.map(
            (items, index) => ({
              key: String(index + 1),
              icon: React.createElement(items.icon),
              label: <Link to={items.path}>{items.label}</Link>,
            }),
          )}
        />
      </Sider>
  )
}

export default CustomSlider