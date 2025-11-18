import React from "react";
import { Layout, Menu } from "antd";
const { Content } = Layout;

const ContactUsPage: React.FC = () => {
  return (
    <Layout>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <h1>Welcome to the Contact Us Page</h1>
        <p>This is the main content area for the Contact Us page.</p>
      </Content>
    </Layout>
  );
};

export default ContactUsPage;