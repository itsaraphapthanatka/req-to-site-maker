import { Card } from "@/components/ui/card";
import founderImage from "@/assets/founder-portrait.jpg";
import workshopImage from "@/assets/workshop.jpg";
import { Award, Users, Heart, TrendingUp } from "lucide-react";

const About = () => {
  const highlights = [
    { icon: Award, title: "ประสบการณ์ 30+ ปี", desc: "ในวงการแฟชั่น" },
    { icon: Users, title: "ทีมมืออาชีพ", desc: "เชี่ยวชาญทุกขั้นตอน" },
    { icon: Heart, title: "เส้นใยธรรมชาติ", desc: "เป็นมิตรต่อสิ่งแวดล้อม" },
    { icon: TrendingUp, title: "มาตรฐานสากล", desc: "คุณภาพระดับส่งออก" },
  ];

  return (
    <section id="about" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">เกี่ยวกับเรา</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ประวัติและความน่าเชื่อถือของโรงงาน
          </p>
        </div>

        {/* Founder Section */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-20">
          <div className="order-2 md:order-1">
            <div className="text-center md:text-left">
              <p className="text-sm uppercase tracking-wider text-primary mb-4">
                Founder & Director
              </p>
              <h3 className="text-3xl md:text-4xl font-bold mb-4">
                คุณศราลักษณ์ รัตนวัน
              </h3>
              <blockquote className="text-xl italic text-muted-foreground mb-6 border-l-4 border-primary pl-6">
                "เสื้อผ้าที่เรียบง่าย เพื่อส่งต่อคุณค่าของความงามที่ยั่งยืน"
              </blockquote>
              <p className="text-muted-foreground leading-relaxed mb-4">
                ด้วยประสบการณ์กว่า 30 ปีในวงการแฟชั่น คุณศราลักษณ์ คือผู้อยู่เบื้องหลังการสร้างสรรค์เสื้อผ้าคุณภาพ
                ที่สะท้อนทั้งความงาม ความประณีต และความใส่ใจในทุกขั้นตอนของการผลิต
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
              <div className="absolute -bottom-6 -left-6 bg-primary text-primary-foreground p-6 rounded-xl shadow-elegant hidden md:block">
                <p className="text-4xl font-bold">30+</p>
                <p className="text-sm">ปีประสบการณ์</p>
              </div>
            </div>
          </div>
        </div>

        {/* Highlights */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {highlights.map((item, idx) => (
            <Card key={idx} className="p-6 text-center hover:shadow-elegant transition-smooth bg-card">
              <div className="flex justify-center mb-4">
                <div className="p-4 rounded-full bg-primary/10">
                  <item.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              <h4 className="font-bold text-lg mb-2">{item.title}</h4>
              <p className="text-muted-foreground text-sm">{item.desc}</p>
            </Card>
          ))}
        </div>

        {/* Workshop Image */}
        <div className="relative rounded-2xl overflow-hidden shadow-elegant">
          <img
            src={workshopImage}
            alt="โรงงานผลิตเสื้อผ้า SARANYA CLOTHING"
            className="w-full h-96 object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-foreground/80 to-transparent flex items-end">
            <div className="p-8 text-background">
              <h3 className="text-3xl font-bold mb-2">มาตรฐานการผลิตระดับสากล</h3>
              <p className="text-lg opacity-90">
                กระบวนการผลิตที่ผ่านการตรวจสอบอย่างเข้มงวดในทุกขั้นตอน
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
