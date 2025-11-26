import { useEffect, useState } from "react";
import { Collapse, Modal, Carousel, Image, CollapseProps } from "antd";
import styled from "styled-components";
import bgworkspace from "@/assets/img2.png"; // ใช้เฉพาะเป็นพื้นหลัง ไม่เกี่ยวกับรูปจาก API
import {
  getOdmService,
  getOdmServiceDetail,
  getOemService,
  getOemServiceDetail,
} from "@/server/service";

const API_URL = import.meta.env.VITE_API_URL;

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

  .ant-collapse-content::before {
    content: "";
    position: absolute;
    inset: 0;
    background-color: rgba(255, 255, 255, 0.6);
    z-index: 0;
  }

  .ant-collapse-content > * {
    position: relative;
    z-index: 1;
  }
`;

interface ServiceStep {
  id: number;
  name: string;
  position: number;
}

interface ModalImage {
  src: string;
  alt: string;
}

const Services = () => {
  const [odmSteps, setOdmSteps] = useState<ServiceStep[]>([]);
  const [oemSteps, setOemSteps] = useState<ServiceStep[]>([]);
  const [openModal, setOpenModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState<"odm" | "oem" | null>(null);
  const [selectedStep, setSelectedStep] = useState<ServiceStep | null>(null);
  const [modalImages, setModalImages] = useState<ModalImage[]>([]);
  const [loadingDetail, setLoadingDetail] = useState(false);

  // ถ้าต้องต่อ BASE_URL ให้แก้ตรงนี้
  const API_BASE_URL = "";

  const mapDetailImages = (detailRes: any, title: string): ModalImage[] => {
    const arr = Array.isArray(detailRes) ? detailRes : [detailRes];

    return arr
      .filter((d) => d && typeof d.img === "string")
      .map((d) => ({
        src: API_URL ? `${API_URL}${d.img}` : d.img,
        alt: title,
      }));
  };

  const fetchOdmService = async () => {
    try {
      const response = await getOdmService();
      setOdmSteps(Array.isArray(response) ? response : []);
      console.log("odmSteps", response);
    } catch (error) {
      console.error("Error fetching ODM service:", error);
    }
  };

  const fetchOemService = async () => {
    try {
      const response = await getOemService();
      setOemSteps(Array.isArray(response) ? response : []);
      console.log("oemSteps", response);
    } catch (error) {
      console.error("Error fetching OEM service:", error);
    }
  };

  useEffect(() => {
    fetchOdmService();
    fetchOemService();
  }, []);

  const handleOpenModal = async (type: "odm" | "oem", step: ServiceStep) => {
    try {
      setSelectedModal(type);
      setSelectedStep(step);
      setLoadingDetail(true);
      setModalImages([]);

      let detailRes;
      if (type === "odm") {
        detailRes = await getOdmServiceDetail(step.id);
      } else {
        detailRes = await getOemServiceDetail(step.id);
      }

      const imgsFromApi = mapDetailImages(detailRes, step.name);
      setModalImages(imgsFromApi);
      console.log(`${type.toUpperCase()} step`, step);
      console.log(`${type.toUpperCase()} detailRes`, detailRes);
      console.log(`${type.toUpperCase()} modalImages`, imgsFromApi);

      setOpenModal(true);
    } catch (err) {
      console.error("Error fetching service detail:", err);
      setModalImages([]);
      setOpenModal(true);
    } finally {
      setLoadingDetail(false);
    }
  };

  const items: CollapseProps["items"] = [
    {
      key: "odm",
      label: "Original Design Manufacturing (ODM)",
      children: (
        <div className="space-y-3 mb-8">
          {odmSteps.map((step, idx) => (
            <button
              key={step.id}
              type="button"
              onClick={() => handleOpenModal("odm", step)}
              className="flex items-start cursor-pointer text-left w-full"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-3">
                {idx + 1}
              </span>
              <p className="pt-0">{step.name}</p>
            </button>
          ))}
          {odmSteps.length === 0 && (
            <p className="text-muted-foreground text-sm">No ODM steps available.</p>
          )}
        </div>
      ),
      showArrow: false,
    },
    {
      key: "oem",
      label: "Original Equipment Manufacturing (OEM)",
      children: (
        <div className="space-y-3 mb-8">
          {oemSteps.map((step, idx) => (
            <button
              key={step.id}
              type="button"
              onClick={() => handleOpenModal("oem", step)}
              className="flex items-start cursor-pointer text-left w-full"
            >
              <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-3">
                {idx + 1}
              </span>
              <p className="pt-0">{step.name}</p>
            </button>
          ))}
          {oemSteps.length === 0 && (
            <p className="text-muted-foreground text-sm">No OEM steps available.</p>
          )}
        </div>
      ),
      showArrow: false,
    },
  ];

  const modalContent = (() => {
    if (loadingDetail) {
      return (
        <p className="text-center py-10 text-muted-foreground">
          กำลังโหลดรูปภาพ...
        </p>
      );
    }

    if (modalImages.length === 0) {
      return (
        <p className="text-center py-10 text-muted-foreground">
          ไม่มีรูปภาพสำหรับขั้นตอนนี้
        </p>
      );
    }

    return (
      <Carousel
        autoplay
        autoplaySpeed={5000}
        slidesToShow={1}
        slidesToScroll={1}
        dots
        arrows
      >
        {modalImages.map((img, idx) => (
          console.log("imgkkkk", img),
          <div key={idx} className="flex justify-center items-center">
            <Image.PreviewGroup
              items={modalImages.map((x) => ({
                src: x.src,
                alt: x.alt,
              }))}
            >
              <Image src={img.src} alt={img.alt} />
            </Image.PreviewGroup>
          </div>
        ))}
      </Carousel>
    );
  })();

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
              style={{
                background: "var(--background, #fff)",
                color: "var(--foreground,rgb(243, 237, 237))",
                border: "1px solid rgb(220, 220, 220)",
                borderRadius: "10px",
                padding: "10px",
                marginBottom: "10px",
                boxShadow: "0 0 10px 0 rgba(0, 0, 0, 0.1)",
                transition: "all 0.3s ease",
              }}
              items={items}
            />
          </div>
        </div>
      </section>

      <Modal
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        {selectedStep && (
          <h3 className="text-lg font-semibold mb-4">
            {selectedStep.name}
          </h3>
        )}
        {modalContent}
      </Modal>
    </>
  );
};

export default Services;
