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
import { useState } from "react";
import { Collapse, Modal, Carousel, Image, CollapseProps } from 'antd';


const About = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const [selectedStep, setSelectedStep] = useState<any>(null);
  const experience = [
    { title: "Experience", desc: "ในวงการแฟชั่น",
      image: [
        { src: ex1, alt: "คุณศราลักษณ์ รัตนวัน - ผู้ก่อตั้ง SARANYA CLOTHING" },
        { src: ex2, alt: "เวิร์คช็อปการผลิตเสื้อผ้าแฟชั่นคุณภาพสูง" },
        { src: ex3, alt: "เวิร์คช็อปการผลิตเสื้อผ้าแฟชั่นคุณภาพสูง" },
      ]
    },
    { title: "Professional Team", desc: "เชี่ยวชาญทุกขั้นตอน",
      image: [
        { src: te, alt: "ทีมงานมืออาชีพในการผลิตเสื้อผ้าแฟชั่น" },
        // { src: team2, alt: "ช่างตัดเย็บผู้ชำนาญการในโรงงาน SARANYA CLOTHING" },
      ]
    },
    { title: "Natural Fibers", desc: "เป็นมิตรต่อสิ่งแวดล้อม",
      image: [
        { src: fi1, alt: "การเลือกใช้เส้นใยธรรมชาติในการผลิตเสื้อผ้า" },
        { src: fi2, alt: "เส้นใยธรรมชาติคุณภาพสูงที่ใช้ใน SARANYA CLOTHING" },
        { src: f3_1, alt: "กระบวนการผลิตที่เป็นมิตรต่อสิ่งแวดล้อม" },
        // { src: fabric1, alt: "การเลือกใช้เส้นใยธรรมชาติในการผลิตเสื้อผ้า" },
        // { src: fabric2, alt: "เส้นใยธรรมชาติคุณภาพสูงที่ใช้ใน SARANYA CLOTHING" },
        // { src: fabric3, alt: "กระบวนการผลิตที่เป็นมิตรต่อสิ่งแวดล้อม" },
      ]
    },
    { title: "International Standards", desc: "คุณภาพระดับส่งออก",
      image: [
        { src: exc1, alt: "การควบคุมคุณภาพตามมาตรฐานสากล" },
        // { src: award5, alt: "รางวัลและการรับรองคุณภาพจากองค์กรระดับสากล" },
      ]
    },
  ];

  const items: CollapseProps["items"] = experience.map((item) => ({
    key: item.title,
    label: item.title,
    children: <p>{item.desc}</p>,
  }));

const handleOpenModal = (item: any) => {
    setSelectedStep(item);
    setOpenModal(true);
  }

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
    <section id="about" className="py-24 bg-secondary/30 relative">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            A manufacturer of quality fashion clothing that combines beauty, refinement, and professionalism. We are ready to partner with your brands to create international-class fashion designs.
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
                  Ms. Saralak Ratanawan
                </h3>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  In a world of hustle and bustle, "SARANYA Clothing" was born from the desire to create a small space for beauty to breathe.  We believe in understated luxury, the luxury of light, flowing fabrics, refined silhouettes, and natural light that gently reflects the definition of a woman.  Every piece of “SARANYA Clothing” is designed not just to be worn, but to "be with you" in the rhythm of real life, on simpler days and in the most beautiful moments, without having to arrange it.  Our inspiration comes from nature, art and the emotions of women who know the value of serenity.  We blend artistry and contemporary to create a style that is warm, refined and alive.
                </p>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="relative">
                <img
                  src={founderImage}
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
                src={workshopImage}
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
              With over 30 years of experience in the fashion industry, Ms. Saralak Ratanawan is behind the creation of quality clothing that reflects beauty, perfectionism, and attention to details at every stage of production.
Saralak’s inspiration stems from a passion for natural fiber clothing and the art of design and tailoring, seamlessly blending simplicity and contemporary style.
Her journey into the fashion world began at Taksila Fashion Institute, one of the Thailand's leading fashion design schools, where she laid the foundation for professional design and production.  She subsequently expanded her knowledge by participating in workshops with various fashion institutions both domestically and internationally, broadening her perspectives and continuously learning about international fashion trends.
She also joined the Association of Manufacturers, Importers and Exporters (SMEs), which furthered her international experience and vision in fashion.  With her commitment and love for fashion, Saralak has elevated the production of Thai natural fiber clothing to international standards under the name “SARANYA Clothing” - a brand where simplicity becomes art.

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
            With her extensive experience and dedication in fashion and design, Saralak Ratanawan has developed a concept based on her passion for natural fibers, combining it with the art of design.  She has applied her expertise in meticulous tailoring to every detail, and has applied this experience to the creation of the "SARANYA Clothing" brand, a ready-to-wear garment manufacturer that embodies the perfectionism, quality, and professionalism of every process of production.  With expertise in both ODM (Original Design Manufacturer) and OEM (Original Equipment Manufacturer) systems, SARANYA Clothing is not only a clothing manufacturer but also a fashion partner, ready to collaborate with clients of all brands to create world-class products.
            </p>
          </div>
          <div className="order-1 md:order-2">
            <div className="relative">
              <img
                src={workspaceImage}
                alt="คุณศราลักษณ์ รัตนวัน - ผู้ก่อตั้ง SARANYA CLOTHING"
                className="rounded-2xl shadow-elegant w-full"
              />
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-elegant hidden md:block">
                <p className="text-4xl font-bold">30+</p>
                <p className="text-sm">Year Experiences</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <div className="relative">
              <img
                src={transportImage}
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
We strive to elevate our manufacturing standards to international standards.  Our manufacturing process is rigorously inspected at every stage, from selecting environmentally friendly natural fibers to meticulous tailoring by skilled craftsmen. With a quality control system that meets international standards, we precisely produce every product to ensure each piece reflects the beauty, durability, and timeless value of fashion.
The trust of both domestic and international customers is a testimony to our professionalism and commitment to delivering quality clothing that meets international standards.
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
          items={[{ key: '1', label: 'Experience', children: <p>{experience.map((item, idx) => (
            <a key={idx} href={`#${item.title}`} onClick={() => handleOpenModal(item)}><p className="text-muted-foreground text-sm">{item.title}</p></a>
            // <Card key={idx} className="p-6 text-center hover:shadow-elegant transition-smooth bg-card" onClick={() => setOpenModal(true)}>
            //   <div className="flex justify-center mb-4">
            //     <div className="p-4 rounded-full bg-primary/10">
            //       <item.icon className="w-8 h-8 text-primary" />
            //     </div>
            //   </div>
            //   <h4 className="font-bold text-lg mb-2">{item.title}</h4>
            //   <p className="text-muted-foreground text-sm">{item.desc}</p>
            // </Card>
          ))}</p> }]}
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
