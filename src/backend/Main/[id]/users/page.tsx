import React from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Layout, Typography, Flex, Button, Space } from 'antd';
import { Form, Input, Select } from 'antd';
import { message } from 'antd';
import { editUser, getUserById } from '@/server/users';

interface UsersProps {
    id: number;
    uname: string | null;
    upass: string | null;
    email: string | null;
    ustatus: string | null;
    createuser: string | null;
    createdate: string | null;
    edituser: string | null;
    editdate: string | null;
    deluser: string | null;
    deldate: string | null;
}

const { Content } = Layout;
const { Title } = Typography;

const UsersDetail: React.FC = () => {
    const navigate = useNavigate();
    const { id } = useParams<{ id: string }>();
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = React.useState(false);
    const fetchData = async () => {
        if (!id) return;
        const res = await getUserById(Number(id));
        form.setFieldsValue(res);
    };
    React.useEffect(() => {
        fetchData();
    }, []);
    const onFinish = async (values: UsersProps) => {
        console.log('Received values of form:', values);
        const res = await editUser(Number(id), values);
        console.log(res);
        if (res.status === 200) {
            message.success(`${res.data.email} has been updated successfully`);
        } else {
            message.error(`${res}`);
        }
        form.resetFields();
        fetchData();
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
                <Title level={1}>Users Detail</Title>
                <Form
                    form={form}
                    name="editUser"
                    autoComplete="off"
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >
                    <Form.Item label="Email" name="email" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password" name="upass" rules={[{ required: true }]}>
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Name-Surname" name="uname" rules={[{ required: true }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Status" name="ustatus" rules={[{ required: true }]}>
                        <Select
                            placeholder="Select a status"
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                        />
                    </Form.Item>
                    <Form.Item>
                        <Flex justify="end">
                            <Space wrap>
                                <Button type="default" onClick={() => navigate(-1)}>
                                    Cancel
                                </Button>
                                <Button type="primary" htmlType="submit">
                                    Edit
                                </Button>
                            </Space>
                        </Flex>
                    </Form.Item>
                </Form>

            </Content>
        </Layout>
    );
}

export default UsersDetail;
