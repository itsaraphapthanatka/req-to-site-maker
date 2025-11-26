import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button } from "antd";
const { Content } = Layout;
const { Title } = Typography;
import { DeleteOutlined } from '@ant-design/icons';
import { getStandard_product } from '@/server/collection';
import { useNavigate } from "react-router-dom";


const StandardPage = () => {
    const navigate = useNavigate();
    const [data, setData] = useState<any[]>([]);

    const fetchData = async () => {
        const res = await getStandard_product();
        const item = Array.isArray(res) ? res : [];
        setData(item);
    }

    useEffect(() => {
        fetchData();
    }, []);

    const handleDelete = (id) => {
        console.log(id);
        alert(id)
    }
    const columns = [
        {
            title: 'ID',
            dataIndex: 'id',
            key: 'id',
        },
        {
            title: 'Standard',
            dataIndex: 'standname',
            key: 'standname',
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
        <Content
            style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
            }}
        >
            <Title level={1}>Standard Products</Title>
            <Table
                columns={columns}
                dataSource={data}
                rowKey={(record) => record.id}
                pagination={false}
                onRow={(record) => ({
                    onClick: () => {
                        navigate(`/admin/standardset/${record.id}`);
                    },
                })}
            />
        </Content>
    );
};

export default StandardPage;
