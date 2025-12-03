import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Image, Modal, Form, Upload, message, Radio, Input, Flex } from "antd";
import { DeleteOutlined, UploadOutlined } from '@ant-design/icons';
import {
    getStandard_product_by_standard_id,
    getStandard_product_set_by_id,
    getStandard_product_set_detail,
    createStandard_product_set_detail,
    deleteStandard_product_set_detail,
    updateStandard_product_set_main,
} from '@/server/collection';
import { useNavigate, useParams } from "react-router-dom";
import type { ColumnsType } from 'antd/es/table';
import { UploadFile, UploadProps } from 'antd/es/upload/interface';

const { Content } = Layout;
const { Title } = Typography;

const API_URL = import.meta.env.VITE_API_URL;

interface Standard {
    id: number;
    standname: string;
}
interface StandardSet {
    id: number;
    standsetname: string;
}

interface StandardSetDetail {
    id: number;
    s_set_chk_main: number;
    s_set_img: string;
    s_set_title: string;
}

const StandardSetDetailPage = () => {
    const { id, standard_id } = useParams();
    const navigate = useNavigate();

    const [data, setData] = useState<StandardSetDetail[]>([]);
    const [standard, setStandard] = useState<Standard | null>(null);
    const [standardSet, setStandardSet] = useState<StandardSet | null>(null);
    const [loading, setLoading] = useState(false);
    const [selectedMainId, setSelectedMainId] = useState<number | null>(null);

    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [form] = Form.useForm();

    // Fetch data
    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await getStandard_product_set_detail(Number(id), Number(standard_id));
            const arr = Array.isArray(res) ? res : [];
            setData(arr);

            // หาแถวที่ main
            const mainItem = arr.find(item => item.s_set_chk_main === 1);
            setSelectedMainId(mainItem ? mainItem.id : null);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStandard = async () => {
        setLoading(true);
        try {
            const res = await getStandard_product_by_standard_id(Number(id));
            setStandard(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    const fetchStandardSet = async () => {
        setLoading(true);
        try {
            const res = await getStandard_product_set_by_id(Number(standard_id));
            setStandardSet(res);
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
        fetchStandard();
        fetchStandardSet();
    }, []);

    // Delete
    const handleDelete = async (id: number) => {
        setLoading(true);
        try {
            await deleteStandard_product_set_detail(id);
            message.success("Deleted successfully");
            fetchData();
        } catch (error) {
            console.log(error);
            message.error("Delete failed");
        } finally {
            setLoading(false);
        }
    };

    // Update Main
    const handleRadioChange = async (id: number) => {
        setLoading(true);
        try {
            setSelectedMainId(id); // update UI
            await updateStandard_product_set_main(id); // update backend
            fetchData();
            message.success("Updated main item");
        } catch (error) {
            console.log(error);
            message.error("Failed to update main item");
        } finally {
            setLoading(false);
        }
    };

    // Upload
    const beforeUpload = (file: File) => {
        const isImage = file.type.startsWith('image/');
        const isVideo = file.type.startsWith('video/');
        if (!isImage && !isVideo) {
            message.error('You can only upload image or video files!');
        }
        return false;
    };

    const handleUploadChange: UploadProps["onChange"] = ({ fileList: newList }) => {
        setFileList(newList);
    };

    // Add new detail
    const onFinish = async (values: any) => {
        if (fileList.length === 0) {
            message.error("Please upload at least one image");
            return;
        }

        const formData = new FormData();
        formData.append("s_id", String(id));
        formData.append("s_set_id", String(standard_id));
        formData.append("s_set_title", values.s_set_title || "");
        formData.append("s_set_desc", "");
        formData.append("s_set_chk_main", values.s_set_chk_main ? "1" : "0");
        formData.append("file", fileList[0].originFileObj as File);

        try {
            setLoading(true);
            await createStandard_product_set_detail(formData);
            message.success("Created successfully");
            form.resetFields();
            setFileList([]);
            setIsModalOpenAdd(false);
            fetchData();
        } catch (error) {
            console.log(error);
            message.error("Create failed");
        } finally {
            setLoading(false);
        }
    };

    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

    const columns: ColumnsType<StandardSetDetail> = [
        {
            title: 'Main',
            key: 's_set_chk_main',
            width: 80,
            render: (_, record) => (
                <Radio
                    checked={selectedMainId === record.id}
                    onChange={() => handleRadioChange(record.id)}
                />
            ),
        },
        {
            title: 'Image',
            dataIndex: 's_set_img',
            key: 'image',
            render: (text: string, record: StandardSetDetail) => (
                <Image
                    src={API_URL + record.s_set_img}
                    alt={record.s_set_title}
                    style={{ width: 100, height: 100 }}
                />
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
                    onClick={() => handleDelete(record.id)}
                />
            ),
        }
    ];

    return (
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
            <Title level={1}>
                Standard Products Set
            </Title>
            <Flex align="center" justify="end" style={{ marginBottom: 16 }}>
                <Button type="primary" onClick={() => setIsModalOpenAdd(true)}>
                    Add Standard Set Detail
                </Button>
            </Flex>

            <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
                loading={loading}
                pagination={{
                    pageSize: 10,
                    total: data.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}
            />

            <Modal
                title="Add Standard Set Detail"
                open={isModalOpenAdd}
                onOk={() => form.submit()}
                onCancel={() => {
                    form.resetFields();
                    setFileList([]);
                    setIsModalOpenAdd(false);
                }}
                okText="Add"
                cancelText="Cancel"
            >
                <Form
                    form={form}
                    layout="vertical"
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                >


                    <Form.Item
                        name="file"
                        label="Upload Image/Video"
                        valuePropName="fileList"
                        getValueFromEvent={(e) => e.fileList}
                        rules={[{ required: true }]}
                    >
                        <Upload
                            fileList={fileList}
                            maxCount={1}
                            beforeUpload={beforeUpload}
                            onChange={handleUploadChange}
                        >
                            <Button icon={<UploadOutlined />}>Upload PNG, JPG, MP4</Button>
                        </Upload>
                    </Form.Item>
                </Form>
            </Modal>
        </Content>
    );
};

export default StandardSetDetailPage;
