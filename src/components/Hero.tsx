import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/hero-fashion.jpg";

const Hero = () => {
  return (
    <section id="home" className="relative h-screen flex items-center">
      <div
        className="absolute inset-0 z-0"
        style={{
          backgroundImage: `url(${heroImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 gradient-hero" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 leading-tight text-background">
            ผลิตเสื้อผ้า <span className="text-primary">ODM & OEM</span> ครบวงจร
          </h1>
          <p className="text-xl md:text-2xl mb-4 text-background/90">
            สร้างแบรนด์ของคุณให้เกิดขึ้นจริง
          </p>
          <p className="text-lg mb-8 text-background/80 max-w-2xl">
            จากทีมผู้เชี่ยวชาญด้านแฟชั่น ที่ดูแลตั้งแต่ไอเดีย ออกแบบ ไปจนถึงผลิตและจัดส่ง
            งานคุณภาพมาตรฐานส่งออก พร้อมให้คำปรึกษาแบรนด์เสื้อผ้าใหม่
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <Button size="lg" className="text-lg shadow-warm">
              ขอใบเสนอราคา <ArrowRight className="ml-2" />
            </Button>
            <Button size="lg" variant="secondary" className="text-lg">
              ดูบริการของเรา
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
