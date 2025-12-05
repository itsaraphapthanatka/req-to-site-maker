import { useEffect, useState } from 'react'
import { Form, Input, Button, message, Typography, Layout, Image, Upload, Divider, Select, Flex } from 'antd'
import { useNavigate, useParams } from 'react-router-dom'
const { Content } = Layout;
const { Title } = Typography;
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { UploadOutlined } from '@ant-design/icons';
import { getReviewById, updateReview } from '@/server/review';
import axios from 'axios';


const EditReview = () => {
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const API_URL = import.meta.env.VITE_API_URL;
    const { id } = useParams();
    const [loading, setLoading] = useState(false);
    const [previewImage, setPreviewImage] = useState<string | null>(null);
    const [fileList, setFileList] = useState<any[]>([]);
    const [description, setDescription] = useState('');
    const [description_th, setDescription_th] = useState('');

    useEffect(() => {
        const fetchReview = async () => {
            try {
                setLoading(true);
                const response = await getReviewById(Number(id));
                const item = Array.isArray(response) ? response[0] : response;
                if (item.src) {
                    setPreviewImage(item.src);
                }
                setDescription(item.desc);
                setDescription_th(item.desc_th);
                form.setFieldsValue(item);
            } catch (error) {
                console.error('Error fetching review:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchReview();
    }, [id]);

    const onFinish = async (values: any) => {
        try {
            setLoading(true);
            const formData = new FormData();
            formData.append("title", values.title);
            formData.append("title_th", values.title_th);
            formData.append("desc", description);
            formData.append("desc_th", description_th);
            formData.append("reviewstatus", "active");
            formData.append("position", values.position || "");
            formData.append("editBy", "admin");
            formData.append("editAt", new Date().toISOString());

            if (fileList.length > 0 && fileList[0].originFileObj) {
                formData.append("src", fileList[0].originFileObj);
            }

            await axios.put(`${API_URL}/reviews/${id}`, formData, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            message.success("Update successful");
        } catch (error) {
            console.error("Error updating review:", error);
            message.error(`Failed to ${error.response.data.detail}`);
        } finally {
            setLoading(false);
        }
    };


    const onFinishFailed = (errorInfo: any) => {
        console.error('Failed:', errorInfo);
    };

    return (
        <Content style={{ margin: "24px 16px", padding: 24, minHeight: 280 }}>
            <Title level={1}>Edit Review {id}</Title>

            <Form
                form={form}
                layout="vertical"
                onFinish={onFinish}
                onFinishFailed={onFinishFailed}
            >
                <Form.Item label="Parent Image or Video">
                    {previewImage && (
                        previewImage.includes(".mp4") ? (
                            <video width={200} height={200} src={API_URL + previewImage} autoPlay loop muted />
                        ) : (
                            <Image width={100} src={API_URL + previewImage} />
                        )
                    )}
                </Form.Item>

                <Form.Item label="Upload Parent Image or Video" name="image">
                    <Upload
                        name="file"
                        listType="picture"
                        maxCount={1}
                        fileList={fileList}
                        onChange={({ fileList: newFileList }) => setFileList(newFileList)}
                        beforeUpload={() => false}
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
                <Form.Item label="Description" name="desc" required>
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

                <Form.Item label="Description (TH)" name="desc_th" required>
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

                {/* <Form.Item label="Blog Type" name="position" style={{ marginTop: "50px" }}>
                    <Select
                        placeholder="Select Blog Type"
                        options={[
                            { value: 'blog', label: 'Blog' },
                            { value: 'news', label: 'News' },
                        ]}
                    />
                </Form.Item>
                <Form.Item label="Status" name="reviewstatus">
                    <Select
                        placeholder="Select Status"
                        options={[
                            { value: 'active', label: 'Active' },
                            { value: 'inactive', label: 'Inactive' },
                        ]}
                    />
                </Form.Item> */}

                <Form.Item style={{ marginTop: "100px" }}>
                    <Flex justify="end">
                        <Button type="primary" htmlType="submit">
                            Submit
                        </Button>
                    </Flex>
                </Form.Item>
            </Form>
        </Content >
    )
}

export default EditReview   