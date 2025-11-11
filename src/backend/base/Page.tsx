import React, { useEffect,useState } from 'react';
import { UploadOutlined, UserOutlined, VideoCameraOutlined } from '@ant-design/icons';
import { Layout, Menu } from 'antd';
import Header from './Header';
import Sider from './Sider';
import Footer from './Footer';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../Main/Dashboard';
import HeroPage from '../Main/HeroPage';
import { Grid } from "antd";

const { Content } = Layout;
const { useBreakpoint } = Grid;


const App: React.FC<{ children?: React.ReactNode }> = ({ children }) => {


  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const [mobileVisible, setMobileVisible] = useState(false);
  const screens = useBreakpoint();
  const navigate = useNavigate();
  useEffect(() => {
    const isAuthenticated = localStorage.getItem('isAuthenticated');
    if (process.env.NODE_ENV === 'development') {
      console.log('Authentication status:', isAuthenticated);
    }
    if (!isAuthenticated || isAuthenticated !== 'true') {
      if (process.env.NODE_ENV === 'development') {
        console.log('User not authenticated, redirecting to login page.');
      }
      navigate('/login');
    }
  }, [navigate]);

  const toggleSider = () => {
    if (screens.md) setCollapsed(!collapsed);
    else setMobileVisible(!mobileVisible);
  };


  const closeMobileSider = () => setMobileVisible(false);

  return (
    <>
      <Layout>
        <Sider collapsed={collapsed} mobileVisible={mobileVisible} onClose={closeMobileSider} />
        <Layout>
          <Header collapsed={collapsed} onToggle={toggleSider} title="Dashboard" />
          {children}
          <Footer />
        </Layout>
      </Layout>
    </>
  );
};

export default App;