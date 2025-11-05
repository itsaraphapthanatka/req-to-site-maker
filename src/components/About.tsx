import { Card } from "@/components/ui/card";
import founderImage from "@/assets/founder-portrait.jpg";
import workshopImage from "@/assets/workshop.jpg";
import workspaceImage from "@/assets/workspace.jpg";
import { Award, Users, Heart, TrendingUp } from "lucide-react";
import { useState } from "react";
import { Collapse } from 'antd';


const open = [
  { icon: Award, title: "ประสบการณ์ 30+ ปี", desc: "ในวงการแฟชั่น" },
  { icon: Users, title: "ทีมมืออาชีพ", desc: "เชี่ยวชาญทุกขั้นตอน" },
  { icon: Heart, title: "เส้นใยธรรมชาติ", desc: "เป็นมิตรต่อสิ่งแวดล้อม" },
  { icon: TrendingUp, title: "มาตรฐานสากล", desc: "คุณภาพระดับส่งออก", open: true },
];

const About = () => {
  const [openModal, setOpenModal] = useState(false);
  const [selectedModal, setSelectedModal] = useState(null);
  const highlights = [
    { icon: Award, title: "ประสบการณ์", desc: "ในวงการแฟชั่น", open: false },
    { icon: Users, title: "ทีมมืออาชีพ", desc: "เชี่ยวชาญทุกขั้นตอน", open: false },
    { icon: Heart, title: "เส้นใยธรรมชาติ", desc: "เป็นมิตรต่อสิ่งแวดล้อม", open: false },
    { icon: TrendingUp, title: "มาตรฐานสากล", desc: "คุณภาพระดับส่งออก", open: false },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">About Us</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            History and trustworthiness of the factory
          </p>
        </div>

        {/* Founder Section */}
        <div className="relative mb-20">
          <div className="relative z-10 grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="text-center md:text-left">
                <p className="text-sm uppercase tracking-wider text-primary mb-4">
                  Founder & Director
                </p>
                <h3 className="text-3xl md:text-4xl font-bold mb-4">
                  คุณศราลักษณ์ รัตนวัน
                </h3>
                <blockquote className="text-xl italic text-muted-foreground mb-6 border-l-4 border-primary pl-6">
                  "ผู้ผลิตเสื้อผ้าแฟชั่นคุณภาพ ที่ผสานความงาม ความประณีต และความเป็นมืออาชีพ พร้อมเป็นพันธมิตรทางแฟชั่น สร้างสรรค์ผลงานระดับสากลร่วมกับทุกแบรนด์"
                </blockquote>
                <p className="text-muted-foreground leading-relaxed mb-4">
                  ท่ามกลางโลกแฟชั่นทีเต็มไปด้วยเสียงและความเร่งรีบ "SARANYA clothing" เกิดขึ้นจากความตั้งใจจะสร้างพื้นที่เล็กๆ ให้ความงามได้หายใจ เราเชื่อในความหรูที่ไม่ต้องประกาศ หรูจากเนื้อผ้าที่พลิ้วเบา โครงเสื้อที่เรียบแต่ละเมียด และแสงธรรมชาติที่สะท้อนนิยามของผู้หญิงอย่างอ่อนโยนทุกชิ้นงานของ SARANYA clothing ไม่ได้ถูกออกแบบเพียงเพื่อสวมใส่ แต่เพื่อ "อยู่กับคุณ" ในจังหวะชีวิตจริง ในวันที่เรียบง่าย และในช่วงเวลาที่งดงามที่สุด โดยไม่ต้องจัดวาง แรงบันดาลใจของเรามาจากธรรมชาติ ศิลปะ และอารมณ์ของผู้หญิงที่รู้จักคุณค่าของความนิ่ง เราผสมความศิลป์และความร่วมสมัยเข้าด้วยกันจนเกิดเป็นสไตล์ที่อบอุ่น ละเมียด และมีชีวิต - ศราลักษณ์ รัตนวัน
                </p>
                <p className="text-muted-foreground leading-relaxed">
                  แรงบันดาลใจของเธอเริ่มต้นจากความหลงใหลในเส้นใยธรรมชาติ และศิลปะแห่งการออกแบบและตัดเย็บ
                  ที่ผสมผสานระหว่างความเรียบง่ายและความร่วมสมัยได้อย่างลงตัว
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
                เส้นทางแห่งแฟชั่นและความมุ่งมั่น
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
              ด้วยประสบการณ์กว่า 30 ปีในวงการแฟชั่น คุณศราลักษณ์ รันตะวัน คือผู้อยู่เบื้องหลังการสร้างสรรค์เสื้อผ้าคุณภาพ ที่สะท้อนทั้งความงาม ความประณีต และความใส่ใจในทุกขั้นตอนของการผลิต
แรงบันดาลใจของเธอเริ่มต้นจาก ความหลงใหลในเส้นใยธรรมชาติ และ ศิลปะแห่งการออกแบบและตัดเย็บ ที่ผสมผสานระหว่างความเรียบง่ายและความร่วมสมัยได้อย่างลงตัว
เส้นทางสู่โลกแฟชั่นของเธอเริ่มต้นที่ สถานบันตักศ์ศิลาแฟชั่น สถาบันสอนออกแบบเสื้อผ้า ดีไซน์เนอร์ สถาบันออกแบบแฟชั่นชั้นนำของประเทศไทย ซึ่งเป็นจุดเริ่มต้นในการวางรากฐานความรู้ด้านการออกแบบ และการผลิตเสื้อผ้าอย่างมืออาชีพ ต่อมาเธอได้ต่อยอดความรู้ผ่านการเข้าร่วม Workshop กับหลากหลายสถาบันแฟชั่นทั้งในและต่างประเทศ เพื่อเปิดมุมมองและเรียนรู้เทรนด์ระดับสากลอย่างต่อเนื่อง
นอกจากนี้ เธอยังได้ร่วมเป็นส่วนหนึ่งของสมาคมส่งเสริมผู้ผลิต นำเข้า และส่งออก (SME) ซึ่งช่วยเติมเต็มประสบการณ์ และวิสัยทัศน์ระดับนานาชาติ ด้วยความมุ่งมั่นและความรักในงานแฟชั่น คุณศราลักษณ์ ได้ยกระดับการผลิตเสื้อผ้าไทยจากเส้นใยธรรมชาติ ให้ก้าวสู่มาตรฐานสากล ภายใต้ชื่อ SARANYA clothing - แบรนด์ที่ความเรียบง่ายกลายเป็นศิลปะ

              </p>
             
            </div>
          </div>
          
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-20"> 
          
          <div className="order-1 md:order-2">
            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                ประสบการณ์ที่ต่อยอดสู่ความเป็นมืออาชีพ
              </h3>
            </div>
            <p className="text-muted-foreground leading-relaxed mb-4">
            ประสบการณ์อันยาวนานและความทุ่มเทในเส้นทางแฟชั่น คุณศราลักษณ์ รัตนวัน ได้พัฒนาแนวคิดจากความหลงใหลในเส้นใยธรรมชาติ ผสมผสานเข้ากับศิลปะแห่งการออกแบบ และกระบวนการตัดเย็บที่พิถีพิถันในทุกรายละเอียดเธอได้นำประสบการณ์ทั้งหมดถ่ายทอดสู่การสร้างแบรนด์ "SARANYA clothing" โรงงานผู้ผลิตเสื้อผ้าสำเร็จรูปที่สะท้อนถึงความประณีต คุณภาพ และความเป็นมืออาชีพในทุกขั้นตอนของการผลิต ด้วยความเชี่ยวชาญทั้งในระบบ ODM (Original Design Manufacturer) และ OEM (Original Equipment Manufacturer)
แบรนด์ SARANYA clothing จึงไม่เพียงเป็นผู้ผลิตเสื้อผ้า แต่ยังเป็น พันธมิตรทางแฟชั่น ที่พร้อมร่วมสร้างสรรค์ผลงานระดับสากลไปกับลูกค้าทุกแบรนด์

ODM (Original Design Manufacturing)
ออกแบบและผลิตครบวงจร — จากแนวคิดดีไซน์ การเลือกผ้า จนถึงสินค้าสำเร็จรูป พร้อมให้คำปรึกษาอย่างมืออาชีพ
	
OEM (Original Equipment Manufacturing)
ผลิตตามแบบและมาตรฐานของลูกค้า — ใส่ใจทุกขั้นตอนเพื่อให้ได้ผลงานที่ตรงตามภาพลักษณ์ของแต่ละแบรนด์

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
                <p className="text-sm">ปีประสบการณ์</p>
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
                มาตรฐานและความไว้วางใจระดับสากล
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-4">
              การบริหารงานของ "คุณศราลักษณ์ รัตนวัน"
แห่งแบรนด์ SARANYA clothing

	
เรามุ่งมั่นยกระดับมาตรฐานการผลิตสู่ระดับสากล ด้วยกระบวนการผลิตที่ผ่านการตรวจสอบอย่างเข้มงวดในทุกขั้นตอน ตั้งแต่การคัดสรร วัตถุดิบจากเส้นใยธรรมชาติที่เป็นมิตรต่อสิ่งแวดล้อม ไปจนถึงการตัดเย็บที่ พิถีพิถันโดยช่างผู้ชำนาญเฉพาะด้าน ด้วยระบบ การควบคุมคุณภาพที่ได้มาตรฐานระดับสากล เราดำเนินการผลิตด้วยความละเอียดรอบคอบในทุกชิ้นงาน เพื่อให้แต่ละชุดสะท้อนถึงความงดงาม ความคงทน และคุณค่าของแฟชั่นที่เหนือกาลเวลา
	
ความไว้วางใจจากลูกค้าทั้งในประเทศและต่างประเทศ คือเครื่องยืนยันถึงความเป็นมืออาชีพ และความมุ่งมั่นของเราในการส่งมอบเสื้อผ้าที่มีคุณภาพและมาตรฐานระดับสากล

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
          items={[{ key: '1', label: 'Experience', children: <p>{highlights.map((item, idx) => (
            <a href={`#${item.title}`}><p key={idx} className="text-muted-foreground text-sm">{item.title}</p></a>
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
    
  );
};

export default About;
