import React from "react";
import { Layout, Menu } from "antd";
const { Content } = Layout;

const ServicePage: React.FC = () => {
  return (
    <Layout>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <h1>Welcome to the Service Page</h1>
        <p>This is the main content area for the Service page.</p>
      </Content>
    </Layout>
  );
};

export default ServicePage;