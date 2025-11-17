import { useState } from "react";
import { Image, Carousel, Collapse, Modal, CollapseProps } from "antd";
import { Button } from "@/components/ui/button";
import fac1 from "@/assets/fac1.jpg";
import fac2 from "@/assets/fac2.jpg";
import RE_01 from "@/assets/RE_01.jpg";
import RE_02 from "@/assets/RE_02.jpg";
import RE_03 from "@/assets/RE_03.jpg";
import RE_04 from "@/assets/RE_04.jpg";
// ✅ ต้อง import รูปทั้งหมดที่คุณอ้างถึง
import RE_05 from "@/assets/RE_05.jpg";
import RE_06 from "@/assets/RE_06.jpg";
import RE_07 from "@/assets/RE_07.jpg";
import RE_08 from "@/assets/RE_08.jpg";
import RE_09 from "@/assets/RE_09.jpg";
import RE_10 from "@/assets/RE_10.jpg";
import RE_11 from "@/assets/RE_11.jpg";
import RE_12 from "@/assets/RE_12.jpg";
import RE_13 from "@/assets/RE_13.jpg";
import RE_14 from "@/assets/RE_14.jpg";
import RE_15 from "@/assets/RE_15.jpg";
import RE_16 from "@/assets/RE_16.jpg";
import styled from "styled-components";
import workspace from "@/assets/workspace.jpg";
import o0783 from "@/assets/o0783.jpg";
import o0795 from "@/assets/o0795.jpg";
import o0763 from "@/assets/o0763.jpg";
import o0402 from "@/assets/o0402.jpg";
import bgworkspace from "@/assets/img2.png";
import oem66 from "@/assets/66.jpg";

const StyledCollapse = styled(Collapse)`
  position: relative;
  overflow: hidden;

  .ant-collapse-content {
    position: relative;
    background-image: url(${bgworkspace});
    background-size: cover;
    background-position: center;
    background-repeat: no-repeat;
    color: #111827;
    z-index: 1;
  }

  /* ✅ เพิ่ม overlay โปร่งใส */
  .ant-collapse-content::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.6); /* ปรับค่าความโปร่งใสได้ */
    z-index: 0;
  }

  /* ✅ ทำให้ข้อความอยู่เหนือ overlay */
  .ant-collapse-content > * {
    position: relative;
    z-index: 1;
  }
`;



const Services = () => {

  
  // 👇 state สำหรับ modal
  const [openModal, setOpenModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState<any>(null);

  // 👇 state สำหรับเลือกประเภท modal (odm / oem)
  const [selectedModal, setSelectedModal] = useState<"odm" | "oem" | null>(null);

  // ... (odmSteps, oemSteps เหมือนเดิม แต่เปลี่ยน src ของรูปให้ใช้ตัวแปร import)
  const odmSteps = [
    {
      id: 1,
      title: "Receive customer brief - Consults and understand brand vision",
      description: "รับบรีฟความต้องการลูกค้า",
      image: [
        {
          src: o0783,
          alt: "รับบรีฟความต้องการลูกค้า",
        },
        {
          src: o0763,
          alt: "รับบรีฟความต้องการลูกค้า",
        },
        {
          src: o0402,
          alt: "รับบรีฟความต้องการลูกค้า",
        },
      ],
    },
    {
      id: 2,
      title: "Factory presents finished designs - displays existing ODM catalogues",
      description: "โรงงานนำเสนอแบบสำเร็จ (Catalog ODM)",
      image: [
        {
          src: RE_04,
          alt: "โรงงานนำเสนอแบบสำเร็จ (Catalog ODM)",
        },
      ],
    },
    {
      id: 3,
      title: "Customized designs - Modifies designs as needed",
      description: "ปรับแบบให้เข้ากับแบรนด์ลูกค้า",
    },
    {
      id: 4,
      title: "Sample production - Creates prototypes for review",
      description: "ปรับแบบให้เข้ากับแบรนด์ลูกค้า",
      image: [
        {
          src: RE_05,
          alt: "ปรับแบบให้เข้ากับแบรนด์ลูกค้า",
        },
      ],
    },
    {
      id: 5,
      title: "Customer confirms designs - Approves samples before actual production",
      description: "ผลิตจริง (Mass Production)",
      image: [
        {
          src: RE_06,
          alt: "ผลิตจริง (Mass Production)",
        },
      ],
    },
    {
      id: 6,
      title: "Production planning - Prepares raw materials and set a timeline",
      description: "ตรวจสอบคุณภาพ (QC)",
      image: [
        {
          src: RE_07,
          alt: "ตรวจสอบคุณภาพ (QC)",
        },
      ],
    },
    {
      id: 7,
      title: "Mass production - Starts mass production",
      description: "ติดแบรนด์ / บรรจุภัณฑ์",
      image: [
        {
          src: "@/assets/RE_08.jpg",
          alt: "ติดแบรนด์ / บรรจุภัณฑ์",
        },
      ],
    },
    {
      id: 8,
      title: "Quality control (QC) - Strict quality control on every piece of products",
      description: "จัดส่งสินค้าให้ลูกค้า",
      image: [
        {
          src: RE_09,
          alt: "จัดส่งสินค้าให้ลูกค้า",
        },
      ],
    },
    {
      id: 9,
      title: "Branding/packaging - Packaging according to the customer's brand",
      description: "จัดส่งสินค้าให้ลูกค้า",
      image: [
        {
          src: RE_02,
          alt: "จัดส่งสินค้าให้ลูกค้า",
        },
      ],
    },
    {
      id: 10,
      title: "Shipping to customers - Safely delivered to customers",
      description: "จัดส่งสินค้าให้ลูกค้า",
      image: [
        {
          src: RE_03,
          alt: "จัดส่งสินค้าให้ลูกค้า",
        },
      ],
    }
  ];

  const oemSteps = [
    {
      title: "Customer Design - Receives customer patterns and specifications",
      description: "รับแบบจากลูกค้า",
      image: [
        {
          src: oem66,
          alt: "รับแบบจากลูกค้า",
        },
      ],
    },
    {
      title: "Sample Production - Produces samples according to specifications",
      description: "ผลิตตัวอย่าง (Sample)",
      image: [
        {
          src: "@/assets/RE_10.jpg",
          alt: "ผลิตตัวอย่าง (Sample)",
        },
      ],
    },
    {
      title: "Customer Confirms Design - Approves samples before actual production",
      description: "ลูกค้ายืนยันแบบ",
      image: [
        {
          src: "@/assets/RE_11.jpg",
          alt: "ลูกค้ายืนยันแบบ",
        },
      ],
    },
    {
      title: "Production Planning - Prepares raw materials and set timeline",
      description: "วางแผนการผลิต",
      image: [
        {
          src: "@/assets/RE_12.jpg",
          alt: "วางแผนการผลิต",
        },
      ],
    },
    {
      title: "Mass Production - Starts mass production",
      description: "ผลิตจริง (Mass Production)",
      image: [
        {
          src: "@/assets/RE_13.jpg",
          alt: "ผลิตจริง (Mass Production)",
        },
      ],
    },
    {
      title: "Quality Control (QC) - Strict quality control on every item",
      description: "ตรวจสอบคุณภาพ (QC)",
      image: [
        {
          src: "@/assets/RE_14.jpg",
          alt: "ตรวจสอบคุณภาพ (QC)",
        },
      ],
    },
    {
      title: "Branding/Packaging - Packaging according to the customer's brand",
      description: "ติดแบรนด์ / บรรจุภัณฑ์",
      image: [
        {
          src: "@/assets/RE_15.jpg",
          alt: "ติดแบรนด์ / บรรจุภัณฑ์",
        },
      ],
    },
    {
      title: "Shipping to Customer – Delivers to customer safely.",
      description: "จัดส่งสินค้าให้ลูกค้า",
      image: [
        {
          src: "@/assets/RE_16.jpg",
          alt: "จัดส่งสินค้าให้ลูกค้า",
        },
      ],
    },
  ];

  // ✅ ฟังก์ชันเปิด modal และเลือก step ที่ต้องการ
  const handleOpenModal = (type: "odm" | "oem", step: any) => {
    setSelectedModal(type);
    setSelectedStep(step);
    setOpenModal(true);
  };

  const items: CollapseProps["items"] = [
    {
      key: "1",
      label: "Original Design Manufacturing (ODM)",
      children: (
        <p className="space-y-3 mb-8">
          {odmSteps.map((step, idx) => (
            <a
              onClick={() => handleOpenModal("odm", step)}
              key={idx}
              className="flex items-start cursor-pointer"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-3">
                {idx + 1}
              </span>
              <p className="pt-0">{step.title}</p>
            </a>
          ))}
        </p>
      ),
      showArrow: false,
    },
    {
      key: "2",
      label: "Original Equipment Manufacturing (OEM)",
      children: (
        <p className="space-y-3 mb-8">
          {oemSteps.map((step, idx) => (
            <a
              onClick={() => handleOpenModal("oem", step)}
              key={idx}
              className="flex items-start cursor-pointer"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-3">
                {idx + 1}
              </span>
              <p className="pt-0">{step.title}</p>
            </a>
          ))}
        </p>
      ),
      showArrow: false,
    },
  ];

  // ✅ แสดงเฉพาะรูปใน step ที่ถูกเลือก
  const modalContent = selectedStep?.image ? (
    <Carousel autoplay autoplaySpeed={5000} slidesToShow={1} slidesToScroll={1} dots={true} arrows={true}>
      {selectedStep.image.map((img: any, idx: number) => (
        <div key={idx} className="flex justify-center items-center">
          <Image.PreviewGroup
            items={selectedStep.image.map((img: any) => ({
              src: img.src,
              alt: img.alt,
            }))}
          >
            <Image
              src={img.src}
              alt={img.alt}
            />
          </Image.PreviewGroup>
        </div>
      ))}
    </Carousel>
  ) : (
    <p className="text-center py-10 text-muted-foreground">
      ไม่มีรูปภาพสำหรับขั้นตอนนี้
    </p>
  );

  return (
    <>
      <section id="services" className="py-24 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Our Services</h2>
          </div>
          <div className="text-center">
            <StyledCollapse
              size="large"
              style={{ background: "var(--background, #fff)", color: "var(--foreground,rgb(243, 237, 237))", border: "1px solid rgb(220, 220, 220)", borderRadius: "10px", padding: "10px", marginBottom: "10px", boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)", transition: "all 0.3s ease" }}
              
              items={items}
            />
          </div>
        </div>
      </section>

      {/* ✅ Modal แสดงเฉพาะรูปของ step ที่ถูกเลือก */}
      <Modal
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default Services;
