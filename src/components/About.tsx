import { Card } from "@/components/ui/card";
import founderImage from "@/assets/1.jpg";
import workshopImage from "@/assets/2.jpg";
import workshopImage2 from "@/assets/workspace.jpg";
import workspaceImage from "@/assets/3.jpg";
import transportImage from "@/assets/transport.jpg";
import cert1 from "@/assets/cert1.jpg";
import cert2 from "@/assets/cert2.jpg";
import team1 from "@/assets/team1.jpg";
import team2 from "@/assets/team2.jpg";
import fabric1 from "@/assets/fabric1.jpg";
import fabric2 from "@/assets/fabric2.jpg";
import fabric3 from "@/assets/fabric3.jpg";
import ex1 from "@/assets/ex1.jpg";
import ex2 from "@/assets/ex2.jpg";
import ex3 from "@/assets/ex3.jpg";
import exc1 from "@/assets/exc1.jpg";
import te from "@/assets/team.jpg";
import fi1 from "@/assets/fi1.png";
import fi2 from "@/assets/f2.png";
import f3_1 from "@/assets/f3_1.png";
import qq1 from "@/assets/qq1.jpg";
import award5 from "@/assets/award5.jpg";
import { Award, Users, Heart, TrendingUp } from "lucide-react";
import { useState, useEffect } from "react";
import { Collapse, Modal, Carousel, Image, CollapseProps } from 'antd';
import { getAbout } from "@/server/about";
import { getExperience } from "@/server/experience";
import { getProfessional } from "@/server/professional";
import { getNaturalFiber } from "@/server/natural_fiber";
import { getInternationalStandard } from "@/server/internationnal_standards";

const API_URL = import.meta.env.VITE_API_URL;

interface ExperienceItem {
  title: string;
  desc: string;
  image: string[];   // เก็บ ['/static/...1.jpg', '/static/...2.jpg']
}


const About = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [selectedStep, setSelectedStep] = useState<ExperienceItem>(null);
  const [about, setAbout] = useState<any>(null);
  const [experiencData, setExperience] = useState<any>(null);
  const [professionalData, setProfessional] = useState<any>(null);
  const [naturalFiberData, setNaturalFiber] = useState<any>(null);
  const [internationalStandardData, setInternationalStandard] = useState<any>(null);
  const [collapseData, setCollapseData] = useState<ExperienceItem[]>([]);
  const fetchExperience = async () => {
    try {
      const response = await getExperience();
      console.log(response);
      const item = Array.isArray(response) ? response[0] : response;
      setExperience(item);
    } catch (error) {
      console.error("Error fetching experience:", error);
    }
  };

  const fetchAbout = async () => {
    try {
      const response = await getAbout();
      console.log(response);
      const item = Array.isArray(response) ? response[0] : response;
      setAbout(item);
    } catch (error) {
      console.error("Error fetching about:", error);
    }
  };

  const fetchProfessional = async () => {
    try {
      const response = await getProfessional();
      console.log(response);
      const item = Array.isArray(response) ? response[0] : response;
      setProfessional(item);
    } catch (error) {
      console.error("Error fetching professional:", error);
    }
  };

  const fetchNaturalFiber = async () => {
    try {
      const response = await getNaturalFiber();
      console.log(response);
      const item = Array.isArray(response) ? response[0] : response;
      setNaturalFiber(item);
    } catch (error) {
      console.error("Error fetching natural fiber:", error);
    }
  };

  const fetchInternationalStandard = async () => {
    try {
      const response = await getInternationalStandard();
      console.log(response);
      const item = Array.isArray(response) ? response[0] : response;
      setInternationalStandard(item);
    } catch (error) {
      console.error("Error fetching international standard:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const experienceRes = await getExperience();
        const professionalRes = await getProfessional();
        const naturalFiberRes = await getNaturalFiber();
        const internationalRes = await getInternationalStandard();

        const exp = Array.isArray(experienceRes) ? experienceRes : [experienceRes];
        const pro = Array.isArray(professionalRes) ? professionalRes : [professionalRes];
        const nat = Array.isArray(naturalFiberRes) ? naturalFiberRes : [naturalFiberRes];
        const intl = Array.isArray(internationalRes) ? internationalRes : [internationalRes];

        const arr: ExperienceItem[] = [
          {
            title: "Experience",
            desc: "", // ถ้ามี description จาก backend ก็ใส่เพิ่มตรงนี้
            image: collectImages(exp, "img"),            // 👈 ได้ ['/static/experience/Untitled.011_1.jpeg', '/static/experience/Untitled.011_2.jpg']
          },
          {
            title: "Professional Team",
            desc: "",
            image: collectImages(pro, "img"),            // ถ้า professionalRes เป็น object เดียวก็ยังใช้ได้
          },
          {
            title: "Natural Fibers",
            desc: "",
            image: collectImages(nat[0], "image"),       // ดูตามโครงสร้างจริงของ naturalFiberRes
          },
          {
            title: "International Standards",
            desc: "",
            image: collectImages(intl[0], "image"),
          },
        ];

        setCollapseData(arr);
        console.log("arr", arr);
      } catch (error) {
        console.error("Error fetching data for Collapse:", error);
      }
    };

    fetchData();
    fetchAbout();
  }, []);


  const collectImages = (data: any, key: string): string[] => {
    if (!data) return [];

    // กรณีเป็น array ของ object เช่น [{img: '...'}, {img: '...'}]
    if (Array.isArray(data)) {
      return data
        .map((item) => item?.[key])
        .filter((v: any) => typeof v === "string");
    }

    // กรณีเป็น object เดี่ยว ที่มี field เป็น string
    if (typeof data[key] === "string") {
      return [data[key]];
    }

    // กรณี field นั้นเป็น array อยู่แล้ว
    if (Array.isArray(data[key])) {
      return data[key].filter((v: any) => typeof v === "string");
    }

    return [];
  };


  // const experience = [
  //   {
  //     title: "Experience", desc: "ในวงการแฟชั่น",
  //     image: [
  //       { src: ex1, alt: "คุณศราลักษณ์ รัตนวัน - ผู้ก่อตั้ง SARANYA CLOTHING" },
  //       { src: ex2, alt: "เวิร์คช็อปการผลิตเสื้อผ้าแฟชั่นคุณภาพสูง" },
  //       { src: ex3, alt: "เวิร์คช็อปการผลิตเสื้อผ้าแฟชั่นคุณภาพสูง" },
  //     ]
  //   },
  //   {
  //     title: "Professional Team", desc: "เชี่ยวชาญทุกขั้นตอน",
  //     image: [
  //       { src: te, alt: "ทีมงานมืออาชีพในการผลิตเสื้อผ้าแฟชั่น" },
  //       // { src: team2, alt: "ช่างตัดเย็บผู้ชำนาญการในโรงงาน SARANYA CLOTHING" },
  //     ]
  //   },
  //   {
  //     title: "Natural Fibers", desc: "เป็นมิตรต่อสิ่งแวดล้อม",
  //     image: [
  //       { src: fi1, alt: "การเลือกใช้เส้นใยธรรมชาติในการผลิตเสื้อผ้า" },
  //       { src: fi2, alt: "เส้นใยธรรมชาติคุณภาพสูงที่ใช้ใน SARANYA CLOTHING" },
  //       { src: f3_1, alt: "กระบวนการผลิตที่เป็นมิตรต่อสิ่งแวดล้อม" },
  //       // { src: fabric1, alt: "การเลือกใช้เส้นใยธรรมชาติในการผลิตเสื้อผ้า" },
  //       // { src: fabric2, alt: "เส้นใยธรรมชาติคุณภาพสูงที่ใช้ใน SARANYA CLOTHING" },
  //       // { src: fabric3, alt: "กระบวนการผลิตที่เป็นมิตรต่อสิ่งแวดล้อม" },
  //     ]
  //   },
  //   {
  //     title: "International Standards", desc: "คุณภาพระดับส่งออก",
  //     image: [
  //       { src: exc1, alt: "การควบคุมคุณภาพตามมาตรฐานสากล" },
  //       // { src: award5, alt: "รางวัลและการรับรองคุณภาพจากองค์กรระดับสากล" },
  //     ]
  //   },
  // ];


  const items: CollapseProps["items"] = collapseData.map((item) => ({
    key: item.title,
    label: item.title,
    img: item.image,
    children: <p>{item.desc}</p>,
  }));

  const handleOpenModal = (item: ExperienceItem) => {
    console.log("item", item);
    setSelectedStep(item);
    setOpenModal(true);
  };

  const modalContent =
    selectedStep && selectedStep.image.length > 0 ? (
      <Carousel
        autoplay
        autoplaySpeed={5000}
        slidesToShow={1}
        slidesToScroll={1}
        dots
        arrows
      >
        {selectedStep.image.map((src, idx) => (
          <div key={idx} className="flex justify-center items-center">
            <Image.PreviewGroup>
              <Image src={API_URL + src} alt={`${selectedStep.title} ${idx + 1}`} />
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
      <section id="about" className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">About Us</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {about?.description}
            </p>
          </div>

          {/* Founder Section */}
          <div className="relative mb-20">
            <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1">
                <div className="text-center md:text-left">
                  <p className="text-sm uppercase tracking-wider text-primary mb-4">
                    Founder & Director of SARANYA Clothing
                  </p>
                  <h3 className="text-3xl md:text-4xl font-bold mb-4">
                    {about?.founderName}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed mb-4">
                    {about?.founderDesc}
                  </p>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <div className="relative">
                  <Image
                    src={API_URL + about?.founderImg}
                    alt="คุณศราลักษณ์ รัตนวัน - ผู้ก่อตั้ง SARANYA CLOTHING"
                    className="rounded-2xl shadow-elegant w-full"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="relative">
                <img
                  src={API_URL + about?.sec2Img}
                  alt="คุณศราลักษณ์ รัตนวัน - ผู้ก่อตั้ง SARANYA CLOTHING"
                  className="rounded-2xl shadow-elegant w-full"
                />
              </div>
            </div>
            <div className="order-2 md:order-1">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  A Fashion Journey and Commitment
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {about?.sec2Desc}
                </p>

              </div>
            </div>

          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">

            <div className="order-1 md:order-2">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  Experiences that have led to her professional career
                </h3>
              </div>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {about?.sec3Desc}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src={API_URL + about?.sec3Img}
                  alt="คุณศราลักษณ์ รัตนวัน - ผู้ก่อตั้ง SARANYA CLOTHING"
                  className="rounded-2xl shadow-elegant w-full"
                />
                <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-elegant hidden md:block">
                  <p className="text-4xl font-bold">{about?.sec3Experience}</p>
                  <p className="text-sm">Year Experiences</p>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <div className="relative">
                <img
                  src={API_URL + about?.sec4img}
                  alt="คุณศราลักษณ์ รัตนวัน - ผู้ก่อตั้ง SARANYA CLOTHING"
                  className="rounded-2xl shadow-elegant w-full"
                />
              </div>
            </div>
            <div className="order-2 md:order-1">
              <div className="text-center md:text-left">
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  International Standards and Trust
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  {about?.sec4Desc}
                </p>

              </div>
            </div>

          </div>

          {/* Highlights */}
          <div className="">
            <div className="text-center mb-6">
              <Collapse
                size="large"
                style={{ background: "transparent" }}
                items={[
                  {
                    key: "1",
                    label: "Experiences",
                    children: (
                      <div className="flex flex-col justify-center items-center gap-2">
                        {collapseData.map((item, idx) => (
                          <button
                            key={idx}
                            type="button"
                            onClick={() => handleOpenModal(item)}
                            className="text-left"
                          >
                            <span className="text-muted-foreground text-sm">
                              {item.title}
                            </span>
                          </button>
                        ))}
                      </div>
                    ),
                  },
                ]}
              />

            </div>
          </div>

        </div>
      </section>
      <Modal
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default About;
