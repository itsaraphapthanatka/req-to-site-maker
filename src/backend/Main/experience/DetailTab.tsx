import React, { useState } from "react";
import { UploadOutlined } from '@ant-design/icons';
import { Input, Form, Image, Button, Upload } from "antd";
const { TextArea } = Input;


const DetailTab: React.FC = () => {
    const [value, setValue] = useState('');
  return (
    <>
        <Form
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 14 }}
        layout="horizontal"
        // style={{ maxWidth: 600 }}
        >
        <Form.Item label="Description">
            <TextArea
            value="A manufacturer of quality fashion clothing that combines beauty, refinement, and professionalism. We are ready to partner with your brands to create international-class fashion designs."
            onChange={(e) => setValue(e.target.value)}
            placeholder="Description"
            autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </Form.Item>

        
        <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Founder & Director of SARANYA Clothing</div>

        <Form.Item label="Founder Name">
            <Input
            value="Ms. Saralak Ratanawan"
            onChange={(e) => setValue(e.target.value)}
            placeholder="Founder Name"
            />
        </Form.Item>

        
        <Form.Item label="Description">
            <TextArea
            value={'In a world of hustle and bustle, "SARANYA Clothing" was born from the desire to create a small space for beauty to breathe. We believe in understated luxury, the luxury of light, flowing fabrics, refined silhouettes, and natural light that gently reflects the definition of a woman. Every piece of “SARANYA Clothing” is designed not just to be worn, but to "be with you" in the rhythm of real life, on simpler days and in the most beautiful moments, without having to arrange it. Our inspiration comes from nature, art and the emotions of women who know the value of serenity. We blend artistry and contemporary to create a style that is warm, refined and alive.'}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Mission"
            autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </Form.Item>

        <Form.Item label="Image">
            <Image width={200} src="https://saranya.appreview.asia/assets/1-4kMLB__5.jpg" />
        </Form.Item>  

        <Form.Item label="Update Image">
        <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture"
            maxCount={1}
            >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
        </Form.Item>

        
        <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>A Fashion Journey and Commitment</div>

        <Form.Item label="Description">
            <TextArea
            value={`With over 30 years of experience in the fashion industry, Ms. Saralak Ratanawan is behind the creation of quality clothing that reflects beauty, perfectionism, and attention to details at every stage of production. Saralak’s inspiration stems from a passion for natural fiber clothing and the art of design and tailoring, seamlessly blending simplicity and contemporary style. Her journey into the fashion world began at Taksila Fashion Institute, one of the Thailand's leading fashion design schools, where she laid the foundation for professional design and production. She subsequently expanded her knowledge by participating in workshops with various fashion institutions both domestically and internationally, broadening her perspectives and continuously learning about international fashion trends. She also joined the Association of Manufacturers, Importers and Exporters (SMEs), which furthered her international experience and vision in fashion. With her commitment and love for fashion, Saralak has elevated the production of Thai natural fiber clothing to international standards under the name “SARANYA Clothing” - a brand where simplicity becomes art.`}
            onChange={(e) => setValue(e.target.value)}
            placeholder="History and Commitment"
            autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </Form.Item>
        <Form.Item label="Image">
            <Image width={200} src="https://saranya.appreview.asia/assets/2-B-AIxcEW.jpg" />
        </Form.Item>  

        <Form.Item label="Update Image">
        <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture"
            maxCount={1}
            >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
        </Form.Item>

        
        <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>Experiences that have led to her professional career</div>

        <Form.Item label="Description">
            <TextArea
            value={`With her extensive experience and dedication in fashion and design, Saralak Ratanawan has developed a concept based on her passion for natural fibers, combining it with the art of design. She has applied her expertise in meticulous tailoring to every detail, and has applied this experience to the creation of the "SARANYA Clothing" brand, a ready-to-wear garment manufacturer that embodies the perfectionism, quality, and professionalism of every process of production. With expertise in both ODM (Original Design Manufacturer) and OEM (Original Equipment Manufacturer) systems, SARANYA Clothing is not only a clothing manufacturer but also a fashion partner, ready to collaborate with clients of all brands to create world-class products.`}
            onChange={(e) => setValue(e.target.value)}
            placeholder="History and Commitment"
            autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </Form.Item>
        <Form.Item label="Experiences">
            <Input
            value={'30+'}
            onChange={(e) => setValue(e.target.value)}
            placeholder="Experiences"
            />
        </Form.Item>
        <Form.Item label="Image">
            <Image width={200} src="https://saranya.appreview.asia/assets/3-CxAWAlD5.jpg" />
        </Form.Item>  

        <Form.Item label="Update Image">
        <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture"
            maxCount={1}
            >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
        </Form.Item>
        
        
        <div style={{ marginBottom: '16px', fontWeight: 'bold' }}>International Standards and Trust</div>

        <Form.Item label="Description">
            <TextArea
            value={`We strive to elevate our manufacturing standards to international standards. Our manufacturing process is rigorously inspected at every stage, from selecting environmentally friendly natural fibers to meticulous tailoring by skilled craftsmen. With a quality control system that meets international standards, we precisely produce every product to ensure each piece reflects the beauty, durability, and timeless value of fashion. The trust of both domestic and international customers is a testimony to our professionalism and commitment to delivering quality clothing that meets international standards.`}
            onChange={(e) => setValue(e.target.value)}
            placeholder="History and Commitment"
            autoSize={{ minRows: 3, maxRows: 5 }}
            />
        </Form.Item>
        <Form.Item label="Image">
            <Image width={200} src="https://saranya.appreview.asia/assets/transport-BnMYcwpc.jpg" />
        </Form.Item>  

        <Form.Item label="Update Image">
        <Upload
            action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
            listType="picture"
            maxCount={1}
            >
            <Button icon={<UploadOutlined />}>Upload (Max: 1)</Button>
            </Upload>
        </Form.Item>
        
        </Form>
    </>
    );
    }

export { DetailTab };