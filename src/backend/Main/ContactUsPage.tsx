import React, { useState, useEffect } from "react";
import { Layout, Typography, Form, Input, Button } from "antd";
import { getContact, updateContact } from "../../server/contact";
const { TextArea } = Input;
const { Content } = Layout;
const { Title } = Typography;

interface Contact {
  id: number;
  factoryAddress: string;
  phone: string;
  email: string;
  workinghour: string;
  facebook: string;
  instagram: string;
  x_twitter: string;
  youtube: string;
  line: string;
  tiktok: string;
  googlemap: string;
}


const ContactUsPage: React.FC = () => {
  const [form] = Form.useForm();
  const [contact, setContact] = useState<Contact>();


  const fetchContact = async () => {
    const response = await getContact();
    const item = Array.isArray(response) ? response[0] : response;
    form.setFieldsValue(item);
    setContact(item);
  };
  useEffect(() => {
    fetchContact();
  }, []);

  const onFinish = async (values: any) => {
    console.log('Received values of form:', values);
    console.log('contact', contact.id);
    const id = contact.id;
    await updateContact(id, values);
    fetchContact();

  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

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
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Factory</div>
          <Form.Item label="Factory Address" name="factoryAddress">
            <Input placeholder="Factory Address" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Phone Number</div>
          <Form.Item label="Phone Number" name="phone">
            <Input placeholder="Phone Number" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Email</div>
          <Form.Item label="Email" name="email">
            <Input placeholder="Email" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Working Hours</div>
          <Form.Item label="Working Hours" name="workinghour">
            <Input placeholder="Working Hours" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Contact via other channels</div>
          <Form.Item label="Facebook" name="facebook">
            <Input placeholder="Facebook" />
          </Form.Item>
          <Form.Item label="Instagram" name="instagram">
            <Input placeholder="Instagram" />
          </Form.Item>
          <Form.Item label="X" name="x_twitter">
            <Input placeholder="X" />
          </Form.Item>
          <Form.Item label="Linkedin" name="linkedin">
            <Input placeholder="Linkedin" />
          </Form.Item>
          <Form.Item label="Line" name="line">
            <Input placeholder="Line" />
          </Form.Item>
          <Form.Item label="Tiktok" name="tiktok">
            <Input placeholder="Tiktok" />
          </Form.Item>
          <Form.Item label="Youtube" name="youtube">
            <Input placeholder="Youtube" />
          </Form.Item>

          <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Google Map (iframe)</div>
          <Form.Item label="Google Map" name="googlemap">
            <TextArea placeholder="Google Map" rows={4} cols={80} />
          </Form.Item>

          <Form.Item wrapperCol={{ span: 14, offset: 4 }}>
            <Button htmlType="submit" type="primary">Save</Button>
          </Form.Item>
        </Form>
      </Content>
    </Layout>
  );
};

export default ContactUsPage;