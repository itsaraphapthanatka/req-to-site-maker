import React from "react";
import { Layout, Typography, Table, Button } from "antd";
import { FolderOpenOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
const { Content } = Layout;
const { Title } = Typography;
const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const handleDelete = (id) => {
    console.log(id);
    alert(id)
  }
  const columns = [
    {
      title: 'Category Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
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
      status: 'Active',
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
        <Title level={1}>Product</Title>
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

export default ProductPage;