import React, { useEffect, useState } from 'react';
import { Layout, Typography, Button, Flex, Image, Table, Modal, Input, Form } from 'antd';
import { PlusOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons';
import { useNavigate } from 'react-router-dom';
import { deleteReview, getReview } from '../../server/review';
const { Content } = Layout;
const { Title } = Typography;

const API_URL = import.meta.env.VITE_API_URL;

interface Review {
    id: number;
    title: string;
    title_th: string;
    desc: string;
    desc_th: string;
    src: string;
    reviewStatus: string;
    createBy: string;
}
const ReviewPage: React.FC = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchReview = async () => {
        setLoading(true);
        const response = await getReview();
        const item = Array.isArray(response) ? response : [];
        console.log(item);
        setReviews(item);
        setLoading(false);
    }

    useEffect(() => {
        fetchReview();
    }, []);

    const columns = [
        {
            title: 'Source',
            dataIndex: 'src',
            key: 'src',
            render: (text, record) => (
                record.src.includes(".mp4") ? (
                    <video width={200} height={200} src={API_URL + record.src} autoPlay loop muted />
                ) : (
                    <Image
                        width={100}
                        src={API_URL + record.src}
                    />
                )
            ),
        },
        {
            title: 'Title',
            dataIndex: 'title',
            key: 'title',
            render: (text, record) => (
                <div>
                    <p>{record.title}</p>
                    <p>{record.title_th}</p>
                </div>
            ),
        },
        {
            title: 'Status',
            dataIndex: 'reviewStatus',
            key: 'reviewStatus',
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button
                        type="text"
                        icon={<EditOutlined />}
                        onClick={(e) => {
                            e.stopPropagation();
                            navigate(`/admin/review/Edit/${record.id}`);
                        }}
                    />
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

    const handleDelete = async (id: number) => {
        await deleteReview(id);
        fetchReview();
    }

    return (
        <Layout>
            <Content style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
            }}>
                <Title level={1} >Review</Title>
                <div className="site-layout-content" style={{ padding: 24, background: '#fff', minHeight: 280 }}>
                    <Flex justify="end" align="center">
                        <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/review/add')}>
                            Add Review
                        </Button>
                    </Flex>
                    <Table
                        rowKey={(record) => record.id}
                        style={{
                            marginTop: 24,
                        }}
                        columns={columns}
                        dataSource={reviews}
                        pagination={false}

                    />
                </div>
            </Content>
        </Layout>
    );
};

export default ReviewPage;