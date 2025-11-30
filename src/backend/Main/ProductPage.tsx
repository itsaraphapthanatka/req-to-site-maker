import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Modal, InputNumber, Form, Input, message, Flex } from "antd";
import { FolderOpenOutlined, DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { getCollection, createCollection, deleteCollection, uploadCollectionImage, updateCollection } from '@/server/collection';
const { Content } = Layout;
const { Title } = Typography;
const ProductPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const [collectiondata, setcollectiondata] = useState<any[]>([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [isModalVisibleEdit, setIsModalVisibleEdit] = useState(false);
  const [editID, setEditID] = useState<number>(0);
  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };
  const handleDelete = async (id) => {
    console.log(id);
    const response = await deleteCollection(id);
    if (response) {
      fetchCollectionData();
      message.success('Delete successfully');
    } else {
      message.error('Delete failed');
    }
  }
  const handleAdd = () => {
    setIsModalVisible(true);
  }
  const handleAddCollection = async (values: any) => {
    console.log('Received values of form:', values);
    setIsModalVisible(false);

    const response = await createCollection(values);
    if (response) {
      fetchCollectionData();
      message.success('Add successfully');
    } else {
      message.error('Add failed');
    }
    form.resetFields();
  };
  const handleEdit = (record) => {
    setIsModalVisibleEdit(true);
    form.setFieldsValue({
      id: record.id,
      name_edit: record.collec_name,
      name_th_edit: record.collec_name_th,
    });
    setEditID(record.id);
  }
  const handleEditCollection = async (values: any) => {
    console.log('Received values of form:', values);
    setIsModalVisibleEdit(false);
    const response = await updateCollection(editID, values);
    if (response) {
      fetchCollectionData();
      message.success('Edit successfully');
    } else {
      message.error('Edit failed');
    }
  };
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
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_, record) => (
        <>
          <Button
            type="text"
            icon={<FolderOpenOutlined />}
            onClick={(e) => {
              e.stopPropagation(); // ✅ ป้องกันไม่ให้ trigger row click
              handleEdit(record);
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
        <Flex justify="end" align="center" gap={16} style={{ marginBottom: 16 }}>
          <Button type="primary" onClick={() => handleAdd()}>Add Collection</Button>
        </Flex>
        <Table
          rowKey={record => record.id}
          columns={columns}
          dataSource={collectiondata}
          onRow={(record) => ({
            onClick: () => navigate(`/admin/product/${record.id}`)
          })}
        />
      </Content>
      <Modal
        title="Add Collection"
        open={isModalVisible}
        onOk={() => {
          form.submit();
          setIsModalVisible(false);
        }}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form
          name="add_collection"
          form={form}
          onFinish={handleAddCollection}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="name"
            label="Collection Name"
            rules={[{ required: true, message: 'Please input collection name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_th"
            label="Collection Name (Thai)"
            rules={[{ required: true, message: 'Please input collection name (Thai)!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
      <Modal
        title="Edit Collection"
        open={isModalVisibleEdit}
        onOk={() => {
          form.submit();
          setIsModalVisibleEdit(false);
        }}
        onCancel={() => setIsModalVisibleEdit(false)}
      >
        <Form
          name="edit_collection"
          form={form}
          onFinish={handleEditCollection}
          onFinishFailed={onFinishFailed}
          layout="vertical"
        >
          <Form.Item
            name="name_edit"
            label="Collection Name"
            rules={[{ required: true, message: 'Please input collection name!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="name_th_edit"
            label="Collection Name (Thai)"
            rules={[{ required: true, message: 'Please input collection name (Thai)!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  );
};

export default ProductPage;