import React from "react";
import { Layout, Tabs } from "antd";
import { OdmTab } from "./Service/OdmTab";
import { OemTab } from "./Service/OemTab";


const { Content } = Layout;

const ServicePage: React.FC = () => {

  const tabItem = [
    {
      key: '1',
      label: 'ODM',
      children: <OdmTab />
    },
    {
      key: '2',
      label: 'OEM',
      children: <OemTab />,
    },
  ]
  return (
    <Layout>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
      <Tabs
        type="card"
        defaultActiveKey="1"
        items={tabItem}
      />

       
      </Content>
    </Layout>
  );
};

export default ServicePage;