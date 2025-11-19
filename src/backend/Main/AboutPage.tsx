import React, { useState } from "react";
import { DetailTab } from "./experience/DetailTab"
import { ExperienceTab } from "./experience/ExperienceTab"
import { Layout, Typography, Input, Tabs } from "antd";
const { Title } = Typography;
const { Content } = Layout;

const AboutPage: React.FC = () => {
  const [value, setValue] = useState('');

  const aboutTabItems = [
    {
      key: '1',
      label: 'Details',
      children: <DetailTab />
    },
    {
      key: '2',
      label: 'Experience',
      children: <ExperienceTab />,
    },
  ];

  return (
    <Layout>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
         <Title level={1}>Welcome to About</Title>
         <Tabs
          defaultActiveKey="1"
          items={aboutTabItems}
        />
          
      </Content>
    </Layout>
  );
};

export default AboutPage;