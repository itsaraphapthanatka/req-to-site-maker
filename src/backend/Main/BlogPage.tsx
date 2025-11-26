import React, { useEffect, useState } from "react";
import { Layout, Typography, Table, Button, Flex, Image } from "antd";
import { FolderOpenOutlined, DeleteOutlined, EditOutlined, PlusOutlined } from '@ant-design/icons';
import { useNavigate } from "react-router-dom";
import { deleteBlog, getBlog } from "../../server/blog";
const { Content } = Layout;
const { Title } = Typography;
const API_URL = import.meta.env.VITE_API_URL;
interface Blog {
  id: number;
  title: string;
  content: string;
  img: string;
  blogsType: string;
  blogsStatus: string;
}

const BlogPage: React.FC = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const fetchBlog = async () => {
    const response = await getBlog();
    const item = Array.isArray(response) ? response : [];
    console.log(item);
    setBlogs(item);
  }
  useEffect(() => {
    fetchBlog();
  }, []);

  const handleDelete = async (id: number) => {
    await deleteBlog(id);
    fetchBlog();
  }
  const columns = [
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (text, record) => (
        <Image
          width={100}
          src={API_URL + record.img}
        />
      ),
    },
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Status',
      dataIndex: 'blogsStatus',
      key: 'blogsStatus',
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
        <Title level={1}>Blog</Title>
        <Flex justify="end" align="center">
          <Button type="primary" icon={<PlusOutlined />} onClick={() => navigate('/admin/blog/Add')}>
            Add Blog
          </Button>
        </Flex>
        <Table
          columns={columns}
          dataSource={blogs}
        // onRow={(record) => ({
        //   onClick: () => navigate(`/admin/blog/Edit/${record.key}`)
        // })}
        />
      </Content>
    </Layout>
  );
};

export default BlogPage;