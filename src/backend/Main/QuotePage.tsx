import React from "react";
import { Layout, Typography, Table, Button } from "antd";
import { FolderOpenOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { deleteQuote, getQuote } from "../../server/quote";

const { Content } = Layout;
const { Title } = Typography;

const QuotePage: React.FC = () => {
    const navigate = useNavigate();
    const [data, setData] = React.useState([]);

    const fetchData = async () => {
        const response = await getQuote();
        const item = Array.isArray(response) ? response : [];
        setData(item);
    }

    React.useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        deleteQuote(id);
        fetchData();
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
            dataIndex: 'product_type',
            key: 'product_type',
        },
        {
            title: 'Quantity / Size',
            dataIndex: 'qty_size',
            key: 'qty_size',
        },
        {
            title: 'Additional Details',
            dataIndex: 'addition_details',
            key: 'addition_details',
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
                            handleDelete(record.id);
                        }}
                    />
                </>
            ),
        }
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
                // onRow={(record) => ({
                //     onClick: () => navigate(`/product/${record.key}`)
                // })}
                />
            </Content>
        </Layout>
    );
};

export default QuotePage;