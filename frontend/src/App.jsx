import React from 'react';
import { Layout, theme } from 'antd';
import CustomSlider from './components/CustomSlider';
import CustomHeader from './components/CustomHeader';
import { Outlet, useLocation } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from "./pages/Home"
const { Content } = Layout;
const App = () => {


  const location = useLocation().pathname
  return (
    <>

      <Layout className='root__container'>
        {
          location === "/login" ?
            <Login />
            :
            location === "/signup" ?
              <Signup />
              : 
            location === "/" ?
              <Outlet/>
              :
              <>
                <CustomSlider />
                <Layout>
                  <CustomHeader />
                  <Content style={{margin : "24px 16px 0"}}>
                    <Outlet />
                  </Content>
                </Layout>
              </>
        }
      </Layout>

    </>
  );
};
{/* <Content style={{ margin: '24px 16px 0' }}>
  <div style={{ padding: 24,background: colorBgContainer }}>content</div>
</Content> */}

export default App;