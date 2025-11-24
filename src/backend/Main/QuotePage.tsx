import React from "react";
import { Layout, Typography, Table, Button } from "antd";
import { FolderOpenOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const { Title } = Typography;

const QuotePage: React.FC = () => {
    const navigate = useNavigate();
    const handleDelete = (id) => {
        console.log(id);
        alert(id)
    }
    const columns = [
        {
            title: 'Name-Surname',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
        },
        {
            title: 'Phone Number',
            dataIndex: 'phone',
            key: 'phone',
        },
        {
            title: 'Product Type',
            dataIndex: 'productType',
            key: 'productType',
        },
        {
            title: 'Quantity / Size',
            dataIndex: 'quantity',
            key: 'quantity',
        },
        {
            title: 'Service Type',
            dataIndex: 'serviceType',
            key: 'serviceType',
        },
        {
            title: 'Additional Details',
            dataIndex: 'additionalDetails',
            key: 'additionalDetails',
        },
        {
            title: 'Status',
            dataIndex: 'status',
            key: 'status'
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: (_, record) => (
                <>
                    <Button
                        type="text"
                        danger
                        icon={<DeleteOutlined />}
                        onClick={(e) => {
                            e.stopPropagation(); // ✅ ป้องกันไม่ให้ trigger row click
                            handleDelete(record.key);
                        }}
                    />
                </>
            ),
        }
    ];
    const data = [
        {
            key: '1',
            name: 'New Collection',
            email: 'New Collection',
            phone: 'New Collection',
            productType: 'New Collection',
            quantity: 'New Collection',
            serviceType: 'New Collection',
            additionalDetails: 'New Collection',
            status: 'New',
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
                <Title level={1}>Quote Request</Title>
                <Table
                    rowKey="key"
                    columns={columns}
                    dataSource={data}
                    onRow={(record) => ({
                        onClick: () => navigate(`/product/${record.key}`)
                    })}
                />
            </Content>
        </Layout>
    );
};

export default QuotePage;