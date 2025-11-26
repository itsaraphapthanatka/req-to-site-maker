import React, { useEffect, useState } from "react";
import { About } from "../AboutPage";
import { UploadOutlined } from '@ant-design/icons';
import { Input, Form, Image, Button, Upload, Flex } from "antd";
import { updateAbout } from "@/server/about";
import axios from "axios";
import type { UploadFile, UploadChangeParam } from "antd/es/upload";

const API_URL = import.meta.env.VITE_API_URL;
const { TextArea } = Input;

interface DetailTabProps {
    data: About[];
}

const DetailTab: React.FC<DetailTabProps> = ({ data }) => {
    const [form] = Form.useForm();

    // file lists for three uploads
    const [founderFileList, setFounderFileList] = useState<UploadFile[]>([]);
    const [experienceFileList, setExperienceFileList] = useState<UploadFile[]>([]);
    const [standardFileList, setStandardFileList] = useState<UploadFile[]>([]);
    const [historyFileList, setHistoryFileList] = useState<UploadFile[]>([]);

    // handlers
    const handleFounderChange = ({ fileList }: UploadChangeParam<UploadFile>) => {
        setFounderFileList(fileList);
    };
    const handleExperienceChange = ({ fileList }: UploadChangeParam<UploadFile>) => {
        setExperienceFileList(fileList);
    };
    const handleStandardChange = ({ fileList }: UploadChangeParam<UploadFile>) => {
        setStandardFileList(fileList);
    };
    const handleHistoryChange = ({ fileList }: UploadChangeParam<UploadFile>) => {
        setHistoryFileList(fileList);
    };

    useEffect(() => {
        if (data && data.length > 0) {
            const d = data[0];

            // set form initial values (note: file inputs are separate controlled states)
            form.setFieldsValue({
                desc: d.desc,
                founder_name: d.founderName,
                mission: d.founderDesc,
                history: d.sec2Desc,
                experience_desc: d.sec3Desc,
                experience_years: d.sec3Experience,
                standard_desc: d.sec4Desc,
                // don't set fileList here — keep current images shown via <Image>
            });

            // If you want to prefill fileList from existing URLs (optional), you can:
            if (d.founderImg) {
                setFounderFileList([{
                    uid: "founder-current",
                    name: d.founderImg.split('/').pop() || "founder.jpg",
                    status: "done",
                    url: d.founderImg,
                }] as unknown as UploadFile[]);
            }
            if (d.sec2Img) {
                setHistoryFileList([{
                    uid: "history-current",
                    name: d.sec2Img.split('/').pop() || "history.jpg",
                    status: "done",
                    url: d.sec2Img,
                }] as unknown as UploadFile[]);
            }
            if (d.sec3img) {
                setExperienceFileList([{
                    uid: "exp-current",
                    name: d.sec3img.split('/').pop() || "experience.jpg",
                    status: "done",
                    url: d.sec3img,
                }] as unknown as UploadFile[]);
            }
            if (d.sec4img) {
                setStandardFileList([{
                    uid: "std-current",
                    name: d.sec4img.split('/').pop() || "standard.jpg",
                    status: "done",
                    url: d.sec4img,
                }] as unknown as UploadFile[]);
            }
        }
    }, [data, form]);

    const d = data[0] || ({} as About);

    const onFinish = async (values: any) => {
        console.log("values", values);
        try {
            const about = {
                desc: values.desc,
                founderName: values.founder_name,
                founderDesc: values.mission,
                sec2Desc: values.history,
                sec3Desc: values.experience_desc,
                sec3Experience: values.experience_years,
                sec4Desc: values.standard_desc,
            };

            const id = d.id;

            // 1) update text fields
            await updateAbout(id, about as About);

            // 1) upload founder image (if user selected a new file)
            // note: values.founder_image is an UploadFile[] (from getValueFromEvent)
            if (values.founder_image && values.founder_image.length > 0) {
                const first = values.founder_image[0];
                // skip if it's already an URL-only item (status done with url) and user didn't change
                if (first.originFileObj) {
                    const formData = new FormData();
                    formData.append("founderImg", first.originFileObj);
                    await axios.put(`${API_URL}/about/update-founder-image/${id}`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                }
            }

            // 2) upload history image
            if (values.history_image && values.history_image.length > 0) {
                const first = values.history_image[0];
                if (first.originFileObj) {
                    const formData = new FormData();
                    formData.append("sec2Img", first.originFileObj);
                    console.log("formData", formData);
                    await axios.put(`${API_URL}/about/update-sec2-image/${id}`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                }
            }

            // 3) upload experience image
            if (values.experience_image && values.experience_image.length > 0) {
                const first = values.experience_image[0];
                if (first.originFileObj) {
                    const formData = new FormData();
                    formData.append("sec3img", first.originFileObj);
                    await axios.put(`${API_URL}/about/update-sec3-image/${id}`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                }
            }

            // 4) upload standard image
            if (values.standard_image && values.standard_image.length > 0) {
                const first = values.standard_image[0];
                if (first.originFileObj) {
                    const formData = new FormData();
                    formData.append("sec4img", first.originFileObj);
                    await axios.put(`${API_URL}/about/update-sec4-image/${id}`, formData, {
                        headers: { "Content-Type": "multipart/form-data" },
                    });
                }
            }

            console.log("Update success");
            window.location.reload();
        } catch (err) {
            console.error("Update failed", err);
        }
    };

    return (
        <Form
            form={form}
            labelCol={{ span: 4 }}
            wrapperCol={{ span: 14 }}
            layout="horizontal"
            onFinish={onFinish}
        >
            <Form.Item label="Description" name="desc">
                <TextArea placeholder="Description" autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>

            <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Founder & Director of SARANYA Clothing</div>

            <Form.Item label="Founder Name" name="founder_name">
                <Input placeholder="Founder Name" />
            </Form.Item>

            <Form.Item label="Mission" name="mission">
                <TextArea placeholder="Mission" autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>

            {d.founderImg && (
                <Form.Item label="Current Image">
                    <Image width={200} src={API_URL + d.founderImg} />
                </Form.Item>
            )}

            {/* UPLOAD NEW FOUNDER IMAGE */}
            <Form.Item
                label="Founder Image"
                name="founder_image"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => e && e.fileList}
            >
                <Upload
                    fileList={founderFileList}
                    onChange={handleFounderChange}
                    beforeUpload={() => false}
                    maxCount={1}
                    listType="picture"
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>

            <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>A Fashion Journey and Commitment</div>

            <Form.Item label="history" name="history">
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>

            {/* SHOW history current image */}
            {d.sec2Img && (
                <Form.Item label="Current Image" name="sec2_image_current">
                    <Image width={200} src={d.sec2Img} />
                </Form.Item>
            )}

            {/* UPLOAD NEW HISTORY IMAGE */}
            <Form.Item
                label="History Image"
                name="history_image"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => e && e.fileList}
            >
                <Upload
                    fileList={historyFileList}
                    onChange={handleHistoryChange}
                    beforeUpload={() => false}
                    maxCount={1}
                    listType="picture"
                >
                    <Button icon={<UploadOutlined />}>Upload</Button>
                </Upload>
            </Form.Item>

            <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Experiences that have led to her professional career</div>

            <Form.Item label="Experience Description" name="experience_desc">
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>

            <Form.Item label="Experiences (Years)" name="experience_years">
                <Input placeholder="30+" />
            </Form.Item>

            {/* SHOW experience current image */}
            {d.sec3img && (
                <Form.Item label="Current Image" name="experience_image_current">
                    <Image width={200} src={d.sec3img} />
                </Form.Item>
            )}

            {/* UPLOAD NEW EXPERIENCE IMAGE */}
            <Form.Item
                label="Experience Image"
                name="experience_image"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => e && e.fileList}
            >
                <Upload
                    fileList={experienceFileList}
                    onChange={handleExperienceChange}
                    beforeUpload={() => false}
                    maxCount={1}
                    listType="picture"
                >
                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                </Upload>
            </Form.Item>

            <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>International Standards and Trust</div>

            <Form.Item label="Description" name="standard_desc">
                <TextArea autoSize={{ minRows: 3, maxRows: 5 }} />
            </Form.Item>

            {/* SHOW standard current image */}
            {d.sec4img && (
                <Form.Item label="Current Image" name="standard_image_current">
                    <Image width={200} src={d.sec4img} />
                </Form.Item>
            )}

            {/* UPLOAD NEW STANDARD IMAGE */}
            <Form.Item
                label="Standard Image"
                name="standard_image"
                valuePropName="fileList"
                getValueFromEvent={(e: any) => e && e.fileList}
            >
                <Upload
                    fileList={standardFileList}
                    onChange={handleStandardChange}
                    beforeUpload={() => false}
                    maxCount={1}
                    listType="picture"
                >
                    <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
                </Upload>
            </Form.Item>

            <Flex align="end" justify="end">
                <Form.Item>
                    <Button type="primary" htmlType="submit">Save</Button>
                </Form.Item>
            </Flex>
        </Form>
    );
};

export { DetailTab };
