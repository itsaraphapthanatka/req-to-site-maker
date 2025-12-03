import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Flex, Modal, Tooltip, Input, Form, message, Divider } from "antd";
const { Content } = Layout;
const { Title } = Typography;
import { DeleteOutlined } from '@ant-design/icons';
import {
    getStandard_product_by_standard_id,
    getStandard_product_set_by_standard_id,
    createStandard_product_set,
    deleteStandard_product_set,
    updateStandard_product_set
} from '@/server/collection';
import { useNavigate, useParams } from "react-router-dom";
import { text } from "stream/consumers";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Quill from 'quill';
interface Standard {
    id: number;
    standname: string;
    standname_th: string;
}

interface StandardResponse {
    id: number;
    standname: string;
    standname_th: string;
}

const StandardSetPage = () => {
    const Delta = Quill.import('delta');

    const { id } = useParams();
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);
    const [standard, setStandard] = useState<Standard | null>(null);
    const [loading, setLoading] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [text, setText] = useState('');
    const [form] = Form.useForm();
    const [editId, setEditId] = useState<number | null>(null);
    const [description, setDescription] = useState("");
    const [description_th, setDescription_th] = useState("");
    const [standsetName, setStandsetName] = useState("");
    const [standsetNameTh, setStandsetNameTh] = useState("");
    const [editForm] = Form.useForm();
    const onFinish = async (values: any) => {
        // console.log(values);
        setIsModalOpenAdd(false);
        const newData = {
            standid: Number(id),
            standsetname: values.standsetname,
            standsetname_th: values.standsetname_th,
            standsetdesc: values.standsetdesc,
            standsetdesc_th: values.standsetdesc_th,
            standsetimg: "",
            position: 0,

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
        console.log(res);
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

    const handleOk = async (values) => {
        if (!editId) return;

        try {
            const data = {
                standid: Number(id),
                standsetname: values.standsetname_en_edit,
                standsetname_th: values.standsetname_th_edit,
                standsetdesc: description,
                standsetdesc_th: description_th,
            };

            console.log("sending data:", data);
            await updateStandard_product_set(editId, data);

            message.success("Updated successfully");
            fetchData();
            setIsModalOpen(false);
        } catch (error) {
            message.error("Update failed");
        }
    };



    const handleCancel = () => {
        setIsModalOpen(false);
    };

    const handleShow = (text, text_th, id, name, name_th) => {
        setIsModalOpen(true);
        setDescription(text);
        setDescription_th(text_th);
        setEditId(id);
        setStandsetName(name);
        setStandsetNameTh(name_th);

        editForm.setFieldsValue({
            standsetname_en_edit: name,
            standsetname_th_edit: name_th,
        });
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
            render: (_, record) => (
                <>
                    <p>{record.standsetname}</p>
                    <p>{record.standsetname_th}</p>
                </>
            )
        },
        {
            title: 'Description',
            dataIndex: 'standsetdesc',
            key: 'standsetdesc',
            render: (_, record) => (
                <div style={{ whiteSpace: 'pre-wrap' }}>
                    <Button type="link"
                        onClick={(e) => {
                            e.stopPropagation();
                            handleShow(
                                record.standsetdesc,
                                record.standsetdesc_th,
                                record.id,
                                record.standsetname,
                                record.standsetname_th
                            );
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
                title="Edit Standard Set"
                open={isModalOpen}
                onOk={() => editForm.submit()}
                onCancel={handleCancel}
            >
                <Form
                    form={editForm}
                    layout="vertical"
                    onFinish={handleOk}
                >
                    <Form.Item name="standsetname_en_edit" label="Standard Set Name">
                        <Input />
                    </Form.Item>

                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        style={{ height: "200px" }}
                    />

                    <Divider>TH</Divider>

                    <Form.Item name="standsetname_th_edit" label="Standard Set Name (Thai)">
                        <Input />
                    </Form.Item>

                    <ReactQuill
                        theme="snow"
                        value={description_th}
                        onChange={setDescription_th}
                        style={{ height: "200px" }}
                    />
                </Form>
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
                            <ReactQuill
                                theme="snow"
                                style={{ height: "200px" }}
                            />
                        </Form.Item>

                        <Divider style={{ marginTop: "80px" }}>Th</Divider>
                        <Form.Item name="standsetname_th" label="Standard Set Name (Thai)">
                            <Input />
                        </Form.Item>

                        <Form.Item style={{ marginBottom: "80px" }} name="standsetdesc_th" label="Standard Set Description (Thai)">
                            <ReactQuill
                                theme="snow"
                                style={{ height: "200px" }}
                            />
                        </Form.Item>
                    </Form>
                </>
            </Modal>
        </Content>
    );
};

export default StandardSetPage;
