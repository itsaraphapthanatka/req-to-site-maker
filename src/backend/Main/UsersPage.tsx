import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Flex, Modal, Form, Input, Select } from "antd";
import { DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getUsers, createUser, editUser, deleteUser } from '@/server/users';
import { message } from 'antd';

const { Content } = Layout;
const { Title } = Typography;

interface UsersProps {
    key: number;
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

const UsersPage: React.FC = () => {
    const navigate = useNavigate();
    const [users, setUsers] = useState<UsersProps[]>([]);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [loading, setLoading] = useState(true);
    const [form] = Form.useForm();

    const onFinish = async (values: UsersProps) => {
        console.log('Received values of form:', values);
        const res = await createUser(values);
        console.log(res);
        if (res.status === 201) {
            message.success(`${res.status}`);
        } else {
            message.error(`${res.status}`);
        }
        setIsModalVisible(false);
        form.resetFields();
        fetchData();
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const handleDelete = async (id: number) => {
        const res = await deleteUser(id);
        message.success(`${res.detail}`);
        // refresh table
        fetchData();
    }
    const columns = [
        {
            title: 'Name-Surname',
            dataIndex: 'uname',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Status',
            dataIndex: 'ustatus',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: (_: UsersProps, record: UsersProps) => (
                <>
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                            e.stopPropagation(); // ✅ ป้องกันไม่ให้ trigger row click
                            handleDelete(record.id);
                        }}
                    />
                </>
            ),
        }
    ];
    const fetchData = async () => {
        setLoading(true);
        try {
            const usersData = await getUsers();
            const items = Array.isArray(usersData) ? usersData : [];
            const filtered = items.filter((item: UsersProps) => item.ustatus === 'active');
            setUsers(filtered);
        } catch (error) {
            console.error("Failed to fetch users:", error);
            // Optionally handle error state here
        }
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
    }, []); // Empty dependency array to run only once on mount

    return (
        <Layout>
            <Content
                style={{
                    margin: "24px 16px",
                    padding: 24,
                    minHeight: 280,
                }}
            >
                <Title level={1}>Setup Users</Title>
                <Flex justify='flex-end' align='flex-Start' className='mb-5'>
                    <Button type="primary" onClick={() => setIsModalVisible(true)}>Add</Button>
                </Flex>
                <Table
                    rowKey="id"
                    columns={columns}
                    dataSource={users}
                    onRow={(record) => ({
                        onClick: () => navigate(`/admin/users/${record.id}`)
                    })}
                    loading={loading}
                />
            </Content>
            <Modal
                title="Add User"
                open={isModalVisible}
                onOk={() => form.submit()}
                onCancel={() => setIsModalVisible(false)}
                okText="Add"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    name="basic"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                    layout="vertical"
                >
                    <Form.Item label="Email"
                        name="email"
                        rules={[{ required: true, message: 'Please input your email!' }]}
                    >
                        <Input />
                    </Form.Item>
                    <Form.Item label="Password"
                        name="upass"
                        rules={[{ required: true, message: 'Please input your password!' }]}
                    >
                        <Input.Password />
                    </Form.Item>
                    <Form.Item label="Name-Surname"
                        name="uname"
                        rules={[{ required: true, message: 'Please input your name!' }]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item label="Status"
                        name="ustatus"
                        rules={[{ required: true, message: 'Please input your status!' }]}
                    >
                        <Select
                            placeholder="Select a status"
                            options={[
                                { value: 'active', label: 'Active' },
                                { value: 'inactive', label: 'Inactive' },
                            ]}
                        />
                    </Form.Item>
                </Form>
            </Modal>
        </Layout>

    );
};

export default UsersPage;