import React, { useEffect, useState } from 'react';
import { Layout, Menu, Drawer } from 'antd';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  UserOutlined, HomeOutlined, SettingOutlined, ContactsOutlined, 
  SkinOutlined, MacCommandOutlined, ProductOutlined, BlockOutlined, 
  ScheduleOutlined 
} from '@ant-design/icons';
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
  const location = useLocation();
  const screens = useBreakpoint();

  const menuItems = [
    { key: 'home', icon: <HomeOutlined />, label: 'Home', path: '/admin/dashboard' },
    { key: 'hero', icon: <ContactsOutlined />, label: 'Hero Page', path: '/admin/hero' },
    { key: 'about', icon: <SkinOutlined />, label: 'About Page', path: '/admin/about' },
    { key: 'service', icon: <MacCommandOutlined />, label: 'Service Page', path: '/admin/service' },
    { key: 'product', icon: <ProductOutlined />, label: 'Product Page', path: '/admin/product' },
    { key: 'blog', icon: <BlockOutlined />, label: 'Blog Page', path: '/admin/blog' },
    { key: 'contact', icon: <ScheduleOutlined />, label: 'Contact Page', path: '/admin/contactus' },
  ];

  // ให้ Menu เลือกตาม URL ปัจจุบัน
  const currentKey = menuItems.find(item => location.pathname.startsWith(item.path))?.key;

  const menuList = menuItems.map(item => ({
    key: item.key,
    icon: item.icon,
    label: item.label,
    onClick: () => navigate(item.path)
  }));

  // Desktop Sider
  const siderContent = (
    <Sider collapsed={collapsed} breakpoint="lg" style={{ minHeight: '100vh' }}>
      <div className="logo" style={{ textAlign: 'center', padding: 16 }}>
        <img src={logo} alt="Logo" style={{ width: '100%' }} />
      </div>

      <Menu 
        theme="dark" 
        mode="inline" 
        selectedKeys={[currentKey as string]}   // << สำคัญ
        items={menuList} 
      />
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
      <Menu 
        mode="inline" 
        selectedKeys={[currentKey as string]} 
        items={menuList} 
      />
    </Drawer>
  );

  return screens.md ? siderContent : drawerContent;
};

export default SiderMenu;
