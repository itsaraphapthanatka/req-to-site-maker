import React from "react";
import { Layout, Typography, Form, Input, Button } from "antd";
const { TextArea } = Input;
const { Content } = Layout;
const { Title } = Typography;
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
        <Title level={1}>Setup Contact</Title>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
        >
          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Factory</div>
          <Form.Item label="Factory Address">
            <Input placeholder="Name" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Phone Number</div>
          <Form.Item label="Phone Number">
            <Input placeholder="Phone Number" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Email</div>
          <Form.Item label="Email">
            <Input placeholder="Email" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Working Hours</div>
          <Form.Item label="Working Hours">
            <Input placeholder="Working Hours" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Contact via other channels</div>
          <Form.Item label="Facebook">
            <Input placeholder="Facebook" />
          </Form.Item>
          <Form.Item label="Instagram">
            <Input placeholder="Instagram" />
          </Form.Item>
          <Form.Item label="X">
            <Input placeholder="X" />
          </Form.Item>
          <Form.Item label="Linkedin">
            <Input placeholder="Linkedin" />
          </Form.Item>
          <Form.Item label="Line">
            <Input placeholder="Line" />
          </Form.Item>
          <Form.Item label="Tiktok">
            <Input placeholder="Tiktok" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Google Map (iframe)</div>
          <Form.Item label="Google Map">
            <TextArea placeholder="Google Map" rows={4} cols={80} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
            <Button type="primary">Save</Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default ContactUsPage;