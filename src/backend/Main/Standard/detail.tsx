import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Image, UploadFile, UploadProps, Radio, Flex, Modal, Form, Upload, message } from "antd";
const { Content } = Layout;
const { Title } = Typography;
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
import { HomeOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb } from 'antd';
import type { ColumnsType } from 'antd/es/table';
import { DraggableTable } from "@/components/DraggableTable";

const API_URL = import.meta.env.VITE_API_URL;
interface Standard {
    id: number;
    standname: string;
}
interface StandardSet {
    id: number;
    standsetname: string;
}

interface StandardResponse {
    id: number;
    standname: string;
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
    const [form] = Form.useForm();
    const [isModalOpenAdd, setIsModalOpenAdd] = useState(false);
    const [fileList, setFileList] = React.useState<UploadFile[]>([]);

    const fetchData = async () => {
        setLoading(true);
        const res = await getStandard_product_set_detail(Number(id), Number(standard_id));

        const arr = Array.isArray(res) ? res : [];
        setData(arr);

        // หาแถวที่ main
        const mainItem = arr.find(item => item.s_set_chk_main === 1);
        setSelectedMainId(mainItem ? mainItem.id : null);

        setLoading(false);
    };


    const fetchStandard = async () => {
        setLoading(true);
        const res = await getStandard_product_by_standard_id(Number(id));
        setStandard(res); // object
        setLoading(false);
    };

    const fetchStandardSet = async () => {
        setLoading(true);
        const res = await getStandard_product_set_by_id(Number(standard_id));
        console.log("sss", res);
        setStandardSet(res); // object
        setLoading(false);
    };

    useEffect(() => {
        fetchData();
        fetchStandard();
        fetchStandardSet();
    }, []);

    const handleDelete = async (id) => {
        setLoading(true);
        await deleteStandard_product_set_detail(id);
        fetchData();
        setLoading(false);
    };

    const handleCheckboxChange = async (id: number) => {
        setSelectedMainId(id);
        await updateMain(id);
    };

    const handleDragEnd = (newData: StandardSetDetail[]) => {
        setData(newData);
        console.log("newData", newData);
    };

    const columns: ColumnsType<StandardSetDetail> = [
        // {
        //     title: 'Parent',
        //     key: 's_set_chk_main',
        //     align: 'center',
        //     width: '10%',

        //     render: (_, record) => (
        //         <Radio
        //             checked={selectedMainId === record.id}
        //             onClick={(e) => e.stopPropagation()}  // สำคัญมาก
        //             onChange={() => handleCheckboxChange(record.id)}
        //         />
        //     ),
        // },
        {
            title: 'Image',
            dataIndex: 'image',
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
                    onClick={(e) => {
                        e.stopPropagation();
                        handleDelete(record.id);
                    }}
                />
            ),
        }
    ];

    const onFinish = async (values: any) => {
        if (fileList.length === 0) {
            message.error("Please upload at least one image");
            return;
        }

        const formData = new FormData();

        formData.append("s_id", String(id));
        formData.append("s_set_id", String(standard_id));
        formData.append("s_set_title", standard?.standname || "");
        formData.append("s_set_desc", "");
        if (selectedMainId) {
            formData.append("s_set_chk_main", "1");
        } else {
            formData.append("s_set_chk_main", "0");
        }
        formData.append("file", fileList[0].originFileObj as File);
        try {
            setLoading(true);
            await createStandard_product_set_detail(formData);
            message.success("Standard product set detail created successfully");
            form.resetFields();
            setFileList([]);
            setIsModalOpenAdd(false);
            fetchData();
            setLoading(false);
        } catch (error) {
            console.log("Error creating standard product set detail:", error);
            console.log("error", error);
            setLoading(false);
        }
    };

    const updateMain = async (detailId: number) => {
        try {
            setLoading(true);

            await updateStandard_product_set_main(detailId);

            await fetchData();
            message.success("Updated main item");
        } catch (error) {
            console.log(error);
            message.error("Failed to update main item");
        } finally {
            setLoading(false);
        }
    };



    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
    };

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



    return (
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
            <Title level={1}>
                Standard Products Set
            </Title>
            <Flex align="center" justify="end" className="mb-4">
                <Button type="primary" htmlType="submit" onClick={() => setIsModalOpenAdd(true)}>
                    Add Standard Set Detail
                </Button>
            </Flex>
            <div style={{ marginBottom: 16 }}>
                <Breadcrumb
                    items={[
                        {
                            href: `/admin/standard`,
                            title: <HomeOutlined />,
                        },
                        {
                            href: `/admin/standardset/${id}`,
                            title: (
                                <>
                                    <span>{standard?.standname}</span>
                                </>
                            ),
                        },
                        {
                            href: `/admin/standardsetdetail/${id}/${standard_id}`,
                            title: (
                                <>
                                    <span>{standardSet?.standsetname}</span>
                                </>
                            ),
                        },
                    ]}
                />
            </div>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={record => record.id}
                loading={loading}
                onRow={() => ({
                    onClick: (e) => e.stopPropagation()
                })}
                pagination={{
                    pageSize: 10,
                    total: data.length,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    showTotal: (total, range) => `${range[0]}-${range[1]} of ${total} items`,
                }}


            />
            <Modal
                title="Add Standard Set"
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
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    layout="vertical"

                >
                    <Form.Item
                        name="s_set_img"
                        label="Image"
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
                            <Button icon={<UploadOutlined />}>Upload PNG, JPG, or MP4 only</Button>
                        </Upload>
                    </Form.Item>

                </Form>
            </Modal>
        </Content>
    );
};

export default StandardSetDetailPage;
