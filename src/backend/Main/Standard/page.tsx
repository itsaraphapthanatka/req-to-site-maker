import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Flex, Modal, Tooltip, Input, Form } from "antd";
const { Content } = Layout;
const { Title } = Typography;
import { DeleteOutlined } from '@ant-design/icons';
import {
    getStandard_product_by_standard_id,
    getStandard_product_set_by_standard_id,
    createStandard_product_set,
    deleteStandard_product_set
} from '@/server/collection';
import { useNavigate, useParams } from "react-router-dom";
import { text } from "stream/consumers";

interface Standard {
    id: number;
    standname: string;
}

interface StandardResponse {
    id: number;
    standname: string;
}

const StandardSetPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [standard, setStandard] = useState<Standard | null>(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [text, setText] = useState('');
    const [form] = Form.useForm();
    const onFinish = async (values: any) => {
        // console.log(values);
        setIsModalOpenAdd(false);
        const newData = {
            standid: Number(id),
            standsetname: values.standsetname,
            standsetdesc: values.standsetdesc,
        };
        console.log(newData);
        // setData([...data, newData]);
        const res = await createStandard_product_set(newData);
        // console.log(res);
        fetchData();
    };
    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };
    const fetchData = async () => {
        setLoading(true);
        const res = await getStandard_product_set_by_standard_id(Number(id));
        setData(Array.isArray(res) ? res : []);
        setLoading(false);
    };

    const fetchStandard = async () => {
        setLoading(true);
        const res = await getStandard_product_by_standard_id(Number(id));
        setStandard(res); // object
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        fetchStandard();
    }, []);

    const handleDelete = async (id) => {
        const res = await deleteStandard_product_set(id);
        console.log(res);
        fetchData();
    };
    const handleOk = () => {
        setIsModalOpen(false);
    };
    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleShow = (text) => {
        console.log(text);
        setIsModalOpen(true);
        setText(text);
    };

    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Standard Set',
            dataIndex: 'standsetname',
            key: 'standsetname',
        },
        {
            title: 'Description',
            dataIndex: 'standsetdesc',
            key: 'standsetdesc',
            render: (text) => (
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    <Button type="link"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShow(text);
                        }}
                    >Show</Button>
                </div>
            ),
        },
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <Button
                    type="text"
                    danger
                    icon={<DeleteOutlined />}
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(record.id);
                    }}
                />
            ),
        }
    ];
    return (
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
            <Title level={1}>
                Standard Products {standard?.standname}
            </Title>

            <Flex align="center" justify="end" className="mb-4">
                <Button type="primary" htmlType="submit" onClick={() => setIsModalOpenAdd(true)}>
                    Add Standard Set
                </Button>
            </Flex>

            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
                loading={loading}
                onRow={(record) => ({
                    onClick: () => navigate(`/admin/standardsetdetail/${id}/${record.id}`),
                })}
            />
            <Modal
                title="Description"
                open={isModalOpen}
                onOk={handleOk}
                onCancel={handleCancel}
            >
                <>
                    <p>{text}</p>
                </>
            </Modal>
            <Modal
                title="Add Standard Set"
                open={isModalOpenAdd}
                onOk={() => form.submit()}
                onCancel={() => setIsModalOpenAdd(false)}
                okText="Add"
                cancelText="Cancel"
            >
                <>
                    <Form
                        form={form}
                        onFinish={onFinish}
                        onFinishFailed={onFinishFailed}
                        layout="vertical"
                    >
                        <Form.Item name="standsetname" label="Standard Set Name">
                            <Input />
                        </Form.Item>
                        <Form.Item name="standsetdesc" label="Standard Set Description">
                            <Input.TextArea />
                        </Form.Item>
                    </Form>
                </>
            </Modal>
        </Content>
    );
};

export default StandardSetPage;
