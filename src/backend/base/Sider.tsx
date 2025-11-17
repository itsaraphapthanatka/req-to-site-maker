import React from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { useNavigate } from 'react-router-dom';
import { UserOutlined, HomeOutlined, SettingOutlined } from '@ant-design/icons';
import logo from '@/assets/logo.png';
import { Grid } from 'antd';

const { Sider } = Layout;
const { useBreakpoint } = Grid;

interface SiderMenuProps {
  collapsed?: boolean;
  mobileVisible?: boolean;
  onClose?: () => void;
}

const SiderMenu: React.FC<SiderMenuProps> = ({ collapsed = false, mobileVisible = false, onClose }) => {
  const navigate = useNavigate();
  const screens = useBreakpoint();

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Home', onClick: () => navigate('/admin/dashboard') },
    { key: 'hero', icon: <UserOutlined />, label: 'Hero Page', onClick: () => navigate('/admin/hero') },
    { key: 'about', icon: <UserOutlined />, label: 'About Page', onClick: () => navigate('/admin/about') },
  ];

  // Desktop Sider
  const siderContent = (
    <Sider  collapsed={collapsed} breakpoint="lg" style={{ minHeight: '100vh' }}>
      <div className="logo" style={{ textAlign: 'center', padding: 16 }}>
        <img src={logo} alt="Logo" style={{ width: '100%' }} />
      </div>
      <Menu theme="dark" mode="inline" defaultSelectedKeys={['home']} items={menuItems} />
    </Sider>
  );

  // Mobile Drawer
  const drawerContent = (
    <Drawer
      title="Navigation"
      placement="left"
      open={mobileVisible}
      onClose={onClose}
      closable={true}
      styles={{ body: { padding: 0 } }}
      width={240}
    >
      <Menu mode="inline" defaultSelectedKeys={['home']} items={menuItems} />
    </Drawer>
  );

  return screens.md ? siderContent : drawerContent;
};

export default SiderMenu;
