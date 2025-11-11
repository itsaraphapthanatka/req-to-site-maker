import React from "react";
import { Layout, Button, Avatar, Badge, Dropdown, Grid } from "antd";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  BellOutlined,
  UserOutlined,
  LogoutOutlined,
  SettingOutlined,
  MenuOutlined,
  HomeOutlined,
} from "@ant-design/icons";

const { Header: AntHeader } = Layout;
const { useBreakpoint } = Grid;

interface HeaderProps {
  collapsed?: boolean;
  onToggle: () => void;
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ collapsed = false, onToggle, title = "App" }) => {
  const screens = useBreakpoint();
  const userEmail = sessionStorage.getItem("userEmail");

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    sessionStorage.clear();
    window.location.href = "/admin";
  };

  const menuItems = [
    { key: "profile", label: "Profile", icon: <UserOutlined /> },
    { key: "settings", label: "Settings", icon: <SettingOutlined /> },
    { key: "logout", label: "Logout", icon: <LogoutOutlined />, onClick: logout },
  ];

  return (
    <AntHeader style={{ padding: "0 16px", display: "flex", alignItems: "center", background: "#fff", boxShadow: "0 1px 4px rgba(0,0,0,0.08)" }}>
      <div style={{ display: "flex", alignItems: "center", flex: 1 }}>
        {screens.md ? (
          <Button type="text" onClick={onToggle} icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />} />
        ) : (
          <Button type="text" onClick={onToggle} icon={<MenuOutlined />} />
        )}
        <div style={{ marginLeft: 12, fontWeight: 600, fontSize: 16, display: "flex", alignItems: "center" }}>
          <HomeOutlined style={{ marginRight: 8 }} /> {title}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
        <Badge count={3}>
          <Button type="text" icon={<BellOutlined style={{ fontSize: 18 }} />} />
        </Badge>

        <Dropdown menu={{ items: menuItems }} placement="bottomRight">
          <div style={{ display: "flex", alignItems: "center", cursor: "pointer" }}>
            <Avatar style={{ backgroundColor: "#7265e6" }} icon={<UserOutlined />} />
            {screens.md && <span style={{ marginLeft: 8 }}>{userEmail}</span>}
          </div>
        </Dropdown>
      </div>
    </AntHeader>
  );
};

export default Header;
