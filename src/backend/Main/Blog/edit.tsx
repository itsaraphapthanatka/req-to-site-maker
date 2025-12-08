import React, { useEffect, useState } from 'react'
import { Form, Input, Button, Typography, Layout, Image, message, Select, Flex, Upload, Divider } from 'antd'
import { UploadOutlined } from '@ant-design/icons';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
const { Content } = Layout;
const { Title } = Typography;
import { getBlogById, updateBlog } from '@/server/blog';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;
const EditBlog = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [description, setDescription] = useState(""); // <-- state สำหรับ ReactQuill
    const [description_th, setDescription_th] = useState(""); // <-- state สำหรับ ReactQuill
    const [fileList, setFileList] = useState<any[]>([]);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [blog, setBlog] = useState<any>(null);

    const fetchBlog = async (id: number) => {
        const response = await getBlogById(id);
        setBlog(response);
        form.setFieldsValue({
            title: response.title,
            title_th: response.title_th || "",
            blogType: response.blogsType,
            status: response.blogsStatus,
            img: response.img,
            description: response.content, // optional
            description_th: response.content_th, // optional
        });

        setDescription(response.content);   // <------ สำคัญ
        setDescription_th(response.content_th);   // <------ สำคัญ
        setFileList([
            {
                uid: response.id.toString(),
                name: response.title,
                status: 'done',
                url: API_URL + response.img,
            },
        ]);
        setPreviewImage(response.img);
    };


    useEffect(() => {
        if (id) {
            fetchBlog(Number(id));
        }
    }, [id]);


    const onFinish = async (values) => {
        const formData = new FormData();

        formData.append("title", values.title);
        formData.append("title_th", values.title_th || "");
        formData.append("content", description);
        formData.append("content_th", description_th);
        formData.append("blogsType", values.blogType || "");
        formData.append("blogsStatus", values.status || "");

        // ✔ เช็คว่าผู้ใช้เลือกไฟล์ใหม่ไหม
        if (fileList.length > 0 && fileList[0].originFileObj) {
            formData.append("file", fileList[0].originFileObj);  // ← รูปใหม่
        }
        // ❌ ถ้าไม่เลือกไฟล์ → ไม่ต้อง append("file")

        const res = await axios.put(`${API_URL}/blogs/${id}`, formData, {
            headers: { "Content-Type": "multipart/form-data" },
        });

        message.success("Updated successfully!");
    };




    const onFinishFailed = (errorInfo: any) => {
        console.log('Failed:', errorInfo);
        message.error('Form submission failed!');
    };

    const handleChange = (info: any) => {
        if (info.file.status === 'done') {
            message.success(`${info.file.name} file uploaded successfully`);
        } else if (info.file.status === 'error') {
            message.error(`${info.file.name} file upload failed.`);
        }
    };

    const beforeUpload = (file: any) => {
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
            message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
            message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
    };

    return (
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
            <Title level={1}>Edit Blog {id}</Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="Parent Image">
                    {previewImage && (
                        <Image width={200} src={API_URL + previewImage} />
                    )}
                </Form.Item>

                <Form.Item
                    label="Upload Parent Image"
                    name="image"
                // rules={[{ required: true, message: 'Please upload an image!' }]}
                >
                    <Upload
                        name="file" // ต้องตรงกับ FastAPI parameter
                        listType="picture"
                        maxCount={1}
                        fileList={fileList}
                        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                        beforeUpload={() => false} // ไม่อัปโหลดทันที ให้ submit ครั้งเดียว
                    >
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>


                </Form.Item>


                <Form.Item
                    label="Title"
                    name="title"
                    rules={[{ required: true, message: 'Please input your title!' }]}
                >
                    <Input />
                </Form.Item>

                {/* ✔ ReactQuill เก็บค่าใน state และ sync กลับเข้า Form manual */}
                <Form.Item label="Description" name="description" required>
                    <ReactQuill
                        theme="snow"
                        value={description}
                        onChange={setDescription}
                        modules={{
                            toolbar: [
                                ["bold", "italic", "underline", "strike", "blockquote"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["link", "image"],
                                ["clean"],
                            ],
                        }}
                        style={{ height: "300px", zIndex: 0 }}
                    />
                </Form.Item>

                <Divider style={{ marginTop: "100px" }}>Blog (TH)</Divider>


                <Form.Item
                    label="Title (TH)"
                    name="title_th"
                >
                    <Input />
                </Form.Item>

                <Form.Item label="Description (TH)" name="description_th" required>
                    <ReactQuill
                        theme="snow"
                        value={description_th}
                        onChange={setDescription_th}
                        modules={{
                            toolbar: [
                                ["bold", "italic", "underline", "strike", "blockquote"],
                                [{ list: "ordered" }, { list: "bullet" }],
                                ["link", "image"],
                                ["clean"],
                            ],
                        }}
                        style={{ height: "300px", zIndex: 0 }}
                    />
                </Form.Item>

                <Form.Item label="Blog Type" name="blogType" style={{ marginTop: "50px" }}>
                    <Select
                        placeholder="Select Blog Type"
                        options={[
                            { value: 'blog', label: 'Blog' },
                            { value: 'news', label: 'News' },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Status" name="status">
                    <Select
                        placeholder="Select Status"
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                    />
                </Form.Item>

                <Form.Item style={{ marginTop: "20px" }}>
                    <Flex justify="end">
                        <Button type="default" onClick={() => navigate("/admin/blog")}>
                            Cancel
                        </Button>
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Content >
    )
}

export default EditBlog
