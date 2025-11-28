import { useState, useEffect } from "react";
import { Collapse, Modal, Carousel, Image } from "antd";
import { getAbout } from "@/server/about";
import { getExperience } from "@/server/experience";
import { getProfessional } from "@/server/professional";
import { getNaturalFiber } from "@/server/natural_fiber";
import { getInternationalStandard } from "@/server/internationnal_standards";
import { useLang } from "@/context/LanguageContext";

const API_URL = import.meta.env.VITE_API_URL;

interface ExperienceItem {
  title: string;
  desc: string;
  image: string[];
}

const translations = {
  en: {
    about: "About Us",
    experience: "Experience",
    professional: "Professional Team",
    naturalFiber: "Natural Fibers",
    internationalStandard: "International Standards",
    desc1: "Founder & Director of SARANYA Clothing",
    desc2: "A Fashion Journey and Commitment",
    desc3: "Experiences that have led to her professional career",
    desc4: "International Standards and Trust",
    experiencelang: "Experience",
    year: "Year Experience",
  },
  th: {
    about: "เกี่ยวกับเรา",
    experience: "ประสบการณ์",
    professional: "ทีมงานเชี่ยวชาญ",
    naturalFiber: "เส้นใยธรรมชาติ",
    internationalStandard: "มาตรฐานสากล",
    desc1: "ผู้ก่อตั้งและผู้อำนวยการ SARANYA Clothing",
    desc2: "เส้นทางแฟชั่นและความมุ่งมั่น",
    desc3: "ประสบการณ์ที่นำไปสู่อาชีพ",
    desc4: "มาตรฐานสากลและความไว้วางใจ",
    experiencelang: "ประสบการณ์",
    year: "ปี ประสบการณ์",
  },
};

// ฟังก์ชันช่วยสำหรับดึง array รูปภาพ
const collectImages = (data: any, key: string): string[] => {
  if (!data) return [];
  if (Array.isArray(data)) {
    return data.map((item) => item?.[key]).filter((v: any) => typeof v === "string");
  }
  if (typeof data[key] === "string") return [data[key]];
  if (Array.isArray(data[key])) return data[key].filter((v: any) => typeof v === "string");
  return [];
};

const About = () => {
  const { lang } = useLang();

  const [openModal, setOpenModal] = useState(false);
  const [selectedStep, setSelectedStep] = useState<ExperienceItem | null>(null);

  const [about, setAbout] = useState<any>(null);
  const [collapseData, setCollapseData] = useState<ExperienceItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const experienceRes = await getExperience();
        const professionalRes = await getProfessional();
        const naturalFiberRes = await getNaturalFiber();
        const internationalRes = await getInternationalStandard();
        const aboutRes = await getAbout();

        setAbout(Array.isArray(aboutRes) ? aboutRes[0] : aboutRes);

        const exp = Array.isArray(experienceRes) ? experienceRes : [experienceRes];
        const pro = Array.isArray(professionalRes) ? professionalRes : [professionalRes];
        const nat = Array.isArray(naturalFiberRes) ? naturalFiberRes : [naturalFiberRes];
        const intl = Array.isArray(internationalRes) ? internationalRes : [internationalRes];

        const arr: ExperienceItem[] = [
          { title: translations[lang].experience, desc: "", image: collectImages(exp, "img") },
          { title: translations[lang].professional, desc: "", image: collectImages(pro, "img") },
          { title: translations[lang].naturalFiber, desc: "", image: collectImages(nat, "img") },
          { title: translations[lang].internationalStandard, desc: "", image: collectImages(intl, "img") },
        ];

        setCollapseData(arr);
      } catch (err) {
        console.error("Error loading data:", err);
      }
    };

    fetchData();
  }, [lang]);

  const handleOpenModal = (item: ExperienceItem) => {
    setSelectedStep(item);
    setOpenModal(true);
  };

  const modalContent =
    selectedStep && selectedStep.image.length > 0 ? (
      <Carousel autoplay autoplaySpeed={5000} dots arrows>
        {selectedStep.image.map((src, idx) => (
          <div key={idx} className="flex justify-center items-center">
            <Image.PreviewGroup>
              <Image src={API_URL + src} alt={`${selectedStep.title} ${idx + 1}`} />
            </Image.PreviewGroup>
          </div>
        ))}
      </Carousel>
    ) : (
      <p className="text-center py-10 text-muted-foreground">ไม่มีรูปภาพสำหรับขั้นตอนนี้</p>
    );

  return (
    <>
      <section id="about" className="py-24 bg-secondary/30 relative">
        <div className="container mx-auto px-4">
          {/* About Us */}
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">{translations[lang].about}</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              {lang === "en" ? about?.description : about?.description_th}
            </p>
          </div>

          {/* Founder Section */}
          <div className="relative mb-20 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 text-center md:text-left">
              <p className="text-sm uppercase tracking-wider text-primary mb-4">{translations[lang].desc1}</p>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                {lang === "en" ? about?.founderName : about?.founderName_th}
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {lang === "en" ? about?.founderDesc : about?.founderDesc_th}
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Image
                src={API_URL + about?.founderImg}
                alt={about?.founderName}
                className="rounded-2xl shadow-elegant w-full"
              />
            </div>
          </div>

          {/* Section 2 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <Image
                src={API_URL + about?.sec2Img}
                alt="Section 2 Image"
                className="rounded-2xl shadow-elegant w-full"
              />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{translations[lang].desc2}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {lang === "en" ? about?.sec2Desc : about?.sec2Desc_th}
              </p>
            </div>
          </div>

          {/* Section 3 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            {/* Text */}
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{translations[lang].desc3}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {lang === "en" ? about?.sec3Desc : about?.sec3Desc_th}
              </p>
            </div>

            {/* Image */}
            <div className="relative flex justify-center md:justify-end">
              <Image
                src={API_URL + about?.sec3img}
                alt="Section 3 Image"
                className="rounded-2xl shadow-elegant w-full max-w-md"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-elegant hidden md:block">
                <p className="text-4xl font-bold">{about?.sec3Experience}</p>
                <p className="text-sm">{translations[lang].year}</p>
              </div>
            </div>
          </div>


          {/* Section 4 */}
          <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="order-2 md:order-1">
              <Image
                src={API_URL + about?.sec4img}
                alt="Section 4 Image"
                className="rounded-2xl shadow-elegant w-full"
              />
            </div>
            <div className="order-1 md:order-2 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">{translations[lang].internationalStandard}</h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
                {lang === "en" ? about?.sec4Desc : about?.sec4Desc_th}
              </p>
            </div>
          </div>

          {/* Highlights Collapse */}
          <div className="text-center">
            <Collapse
              size="large"
              style={{ background: "transparent" }}
              items={[
                {
                  key: "highlights",
                  label: translations[lang].experience,
                  children: (
                    <div className="flex flex-col gap-2 items-center">
                      {collapseData.map((item, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleOpenModal(item)}
                          className="text-left hover:text-primary"
                        >
                          {item.title}
                        </button>
                      ))}
                    </div>
                  ),
                },
              ]}
            />
          </div>
        </div>
      </section>

      {/* Modal for Carousel */}
      <Modal open={openModal} onCancel={() => setOpenModal(false)} footer={null}>
        {modalContent}
      </Modal>
    </>
  );
};

export default About;
