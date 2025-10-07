import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Palette, Cog, ArrowRight, CheckCircle2 } from "lucide-react";

const Services = () => {
  const odmSteps = [
    "รับบรีฟความต้องการลูกค้า",
    "โรงงานนำเสนอแบบสำเร็จ (Catalog ODM)",
    "ปรับแบบให้เข้ากับแบรนด์ลูกค้า",
    "ผลิตตัวอย่าง (Sample)",
    "ลูกค้ายืนยันแบบ",
    "วางแผนการผลิต",
    "ผลิตจริง (Mass Production)",
    "ตรวจสอบคุณภาพ (QC)",
    "ติดแบรนด์ / บรรจุภัณฑ์",
    "จัดส่งสินค้าให้ลูกค้า",
  ];

  const oemSteps = [
    "รับแบบจากลูกค้า",
    "ผลิตตัวอย่าง (Sample)",
    "ลูกค้ายืนยันแบบ",
    "วางแผนการผลิต",
    "ผลิตจริง (Mass Production)",
    "ตรวจสอบคุณภาพ (QC)",
    "ติดแบรนด์ / บรรจุภัณฑ์",
    "จัดส่งสินค้าให้ลูกค้า",
  ];

  return (
    <section id="services" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">บริการของเรา</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            ครบวงจร ทั้ง ODM และ OEM ด้วยมาตรฐานระดับสากล
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 mb-16">
          {/* ODM Service */}
          <Card className="p-8 hover:shadow-elegant transition-smooth bg-gradient-elegant">
            <div className="flex items-center mb-6">
              <div className="p-4 rounded-full bg-primary mr-4">
                <Palette className="w-8 h-8 text-primary-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">ODM</h3>
                <p className="text-sm text-muted-foreground">Original Design Manufacturing</p>
              </div>
            </div>
            
            <p className="text-lg mb-6 text-muted-foreground">
              สำหรับผู้ที่ต้องการดีไซน์เสื้อผ้าพร้อมขายจากทีมเรา
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <p>บริการออกแบบดีไซน์และแพทเทิร์น</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <p>คัดผ้า สี และวัสดุให้เหมาะกับตลาด</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <p>ผลิตตัวอย่าง / ถ่ายภาพสินค้า / แพ็กเกจครบชุด</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <p>พร้อมให้คำแนะนำสร้างแบรนด์ตั้งแต่เริ่มต้น</p>
              </div>
            </div>

            <Button variant="default" className="w-full">
              ดูรายละเอียด ODM <ArrowRight className="ml-2" />
            </Button>
          </Card>

          {/* OEM Service */}
          <Card className="p-8 hover:shadow-elegant transition-smooth bg-gradient-elegant">
            <div className="flex items-center mb-6">
              <div className="p-4 rounded-full bg-muted mr-4">
                <Cog className="w-8 h-8 text-muted-foreground" />
              </div>
              <div>
                <h3 className="text-2xl font-bold">OEM</h3>
                <p className="text-sm text-muted-foreground">Original Equipment Manufacturing</p>
              </div>
            </div>
            
            <p className="text-lg mb-6 text-muted-foreground">
              สำหรับลูกค้าที่มีแบบเสื้อผ้าอยู่แล้ว และต้องการให้เราผลิตตามสเปก
            </p>

            <div className="space-y-3 mb-8">
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <p>ผลิตตามแพทเทิร์น / ตัวอย่างของลูกค้า</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <p>ทีม QC ตรวจคุณภาพทุกขั้นตอน</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <p>รองรับการผลิตจำนวนมาก</p>
              </div>
              <div className="flex items-start">
                <CheckCircle2 className="w-5 h-5 text-primary mr-3 mt-1 flex-shrink-0" />
                <p>ส่งมอบตรงเวลา พร้อมบริการจัดส่งทั่วประเทศและต่างประเทศ</p>
              </div>
            </div>

            <Button variant="outline" className="w-full">
              ดูรายละเอียด OEM <ArrowRight className="ml-2" />
            </Button>
          </Card>
        </div>

        {/* Process Comparison */}
        <div className="bg-secondary/20 rounded-2xl p-8 md:p-12">
          <h3 className="text-3xl font-bold text-center mb-12">ขั้นตอนการผลิต</h3>
          <div className="grid md:grid-cols-2 gap-8">
            {/* ODM Process */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-primary">ODM - บริการออกแบบและผลิตครบวงจร</h4>
              <div className="space-y-3">
                {odmSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-bold mr-3">
                      {idx + 1}
                    </span>
                    <p className="pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* OEM Process */}
            <div>
              <h4 className="text-xl font-bold mb-6 text-muted">OEM - บริการผลิตตามแบบ</h4>
              <div className="space-y-3">
                {oemSteps.map((step, idx) => (
                  <div key={idx} className="flex items-start">
                    <span className="flex-shrink-0 w-8 h-8 rounded-full bg-muted text-muted-foreground flex items-center justify-center text-sm font-bold mr-3">
                      {idx + 1}
                    </span>
                    <p className="pt-1">{step}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <p className="text-center mt-8 text-muted-foreground italic">
            ทุกขั้นตอนดูแลโดยทีมมืออาชีพ เพื่อคุณภาพที่สม่ำเสมอ
          </p>
        </div>
      </div>
    </section>
  );
};

export default Services;
