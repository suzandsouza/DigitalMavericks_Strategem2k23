import React from 'react'
import { 
  UploadOutlined, UserOutlined, VideoCameraOutlined 
  ,AppstoreAddOutlined,LoginOutlined,UserAddOutlined ,HomeFilled  
 } from '@ant-design/icons';
import { Layout, Menu} from 'antd';
import { Link } from 'react-router-dom';
const { Sider } = Layout;

const CustomSlider = () => {
  const [role , setRole] = React.useState("")
  React.useEffect(()=>{
    let rl = JSON.parse(localStorage.getItem("User"))
    if(rl){
      setRole(rl.role)
    }
  },[])
  const slider_items = [
    {
      icon : HomeFilled ,
      label : "Home Page",
      path : "/dashboard"
    },
    {
      icon : AppstoreAddOutlined ,
      label : role === "patient" ? "Take Appointment" : "Check Appointments",
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
  const slider_admin = [
    {
      icon : HomeFilled ,
      label : "Home Page",
      path : "/dashboard"
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
        <h1 className="logo" style={{marginLeft : "15px"}}><Link to={"/"} >CareConnect</Link></h1>
        <Menu
          theme='dark'
          mode="inline"
          items={
            role === "patient" || role === "" ? 
            slider_items.map((items, index) => ({
              key: String(index + 1),
              icon: React.createElement(items.icon),
              label: <Link to={items.path}>{items.label}</Link>,
            }))
            :
            slider_admin.map((items, index) => ({
              key: String(index + 1),
              icon: React.createElement(items.icon),
              label: <Link to={items.path}>{items.label}</Link>,
            })
          )}
        />
      </Sider>
  )
}

export default CustomSlider