import React, { useState, useEffect } from "react";
import { DetailTab } from "./experience/DetailTab"
import { ExperienceTab } from "./experience/ExperienceTab"
import { Layout, Typography, Input, Tabs, Form } from "antd";
const { Title } = Typography;
const { Content } = Layout;
import { getAbout } from "@/server/about";

export interface About {
  id: number;
  desc: string;
  desc_th: string;
  founderName: string;
  founderName_th: string;
  founderDesc: string;
  founderDesc_th: string;
  founderImg: string;
  sec2Desc: string;
  sec2Img: string;
  sec2Desc_th: string;
  sec3Desc: string;
  sec3Desc_th: string;
  sec3img: string;
  sec3Experience: string;
  sec4Desc: string;
  sec4Desc_th: string;
  sec4img: string;
}

const AboutPage: React.FC = () => {
  const [value, setValue] = useState('');
  const [about, setAbout] = useState<About[]>([]);
  const [abouts, setAbouts] = useState<About[]>([]);

  const [form] = Form.useForm();

  const fetchAbout = async () => {
    const response = await getAbout();
    console.log(response);
    const items = Array.isArray(response) ? response : [];
    setAbout(items);
    form.setFieldsValue(items);
  };

  useEffect(() => {
    fetchAbout();
  }, []);

  const aboutTabItems = [
    {
      key: '1',
      label: 'Details',
      children: <DetailTab data={about} />
    },
    {
      key: '2',
      label: 'Experience',
      children: <ExperienceTab data={about} />,
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
          type="card"
          defaultActiveKey="1"
          items={aboutTabItems}
        />

      </Content>
    </Layout>
  );
};

export default AboutPage;