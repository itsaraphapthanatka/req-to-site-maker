import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button } from "antd";
import { FolderOpenOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getCollection } from '@/server/collection';
const { Content } = Layout;
const { Title } = Typography;
const ProductPage: React.FC = () => {
  const navigate = useNavigate();
  const [collectiondata, setcollectiondata] = useState<any[]>([]);
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
      title: 'Category Name',
      dataIndex: 'collec_name',
      key: 'collec_name',
      render: (_, record) => (
        <>
          <p>{record.collec_name}</p>
          <p>{record.collec_name_th}</p>
        </>
      ),
    },
    // {
    //   title: 'Action',
    //   dataIndex: 'action',
    //   key: 'action',
    //   render: (_, record) => (
    //     <>
    //       <Button
    //         type="text"
    //         danger
    //         icon={<DeleteOutlined />}
    //         onClick={(e) => {
    //           e.stopPropagation(); // ✅ ป้องกันไม่ให้ trigger row click
    //           handleDelete(record.id);
    //         }}
    //       />
    //     </>
    //   ),
    // }
  ];
  const fetchCollectionData = async () => {
    const response = await getCollection();
    const items = Array.isArray(response) ? response : [];
    items.sort((a: any, b: any) => (a.position ?? 0) - (b.position ?? 0));
    setcollectiondata(items);
  };
  useEffect(() => {
    fetchCollectionData();
  }, []);
  return (
    <Layout>
      <Content
        style={{
          margin: "24px 16px",
          padding: 24,
          minHeight: 280,
        }}
      >
        <Title level={1}>Collection</Title>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={collectiondata}
          onRow={(record) => ({
            onClick: () => navigate(`/admin/product/${record.id}`)
          })}
        />
      </Content>
    </Layout>
  );
};

export default ProductPage;