import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, MessageCircle } from "lucide-react";

const Contact = () => {
  const contactInfo = [
    {
      icon: MapPin,
      title: "ที่อยู่โรงงาน",
      details: ["โรงงานผลิตเสื้อผ้า SARANYA CLOTHING", "กรุงเทพมหานคร ประเทศไทย"],
    },
    {
      icon: Phone,
      title: "โทรศัพท์",
      details: ["02-XXX-XXXX", "089-XXX-XXXX"],
    },
    {
      icon: Mail,
      title: "อีเมล",
      details: ["info@saranyaclothing.com", "sales@saranyaclothing.com"],
    },
    {
      icon: Clock,
      title: "เวลาทำการ",
      details: ["จันทร์ - ศุกร์: 8:00 - 17:00", "เสาร์: 8:00 - 12:00"],
    },
  ];

  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">ติดต่อเรา</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            พร้อมให้คำปรึกษาและตอบทุกคำถามของคุณ
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="p-8 shadow-elegant">
            <h3 className="text-2xl font-bold mb-6">ขอใบเสนอราคา</h3>
            <form className="space-y-6">
              <div>
                <Label htmlFor="name">ชื่อ-นามสกุล *</Label>
                <Input id="name" placeholder="กรอกชื่อของคุณ" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="email">อีเมล *</Label>
                <Input id="email" type="email" placeholder="example@email.com" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="phone">เบอร์โทรศัพท์ *</Label>
                <Input id="phone" type="tel" placeholder="08X-XXX-XXXX" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="type">ประเภทเสื้อผ้าที่ต้องการผลิต *</Label>
                <Input id="type" placeholder="เสื้อ, กางเกง, ชุดเดรส ฯลฯ" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="quantity">จำนวน / ขนาดโดยประมาณ *</Label>
                <Input id="quantity" placeholder="เช่น 100-500 ชิ้น" className="mt-2" />
              </div>
              <div>
                <Label htmlFor="service">เลือกประเภท *</Label>
                <select
                  id="service"
                  className="w-full mt-2 px-3 py-2 border border-input rounded-lg bg-background"
                >
                  <option value="">เลือกบริการ</option>
                  <option value="odm">ODM - ออกแบบและผลิตครบวงจร</option>
                  <option value="oem">OEM - ผลิตตามแบบของลูกค้า</option>
                </select>
              </div>
              <div>
                <Label htmlFor="message">รายละเอียดเพิ่มเติม</Label>
                <Textarea
                  id="message"
                  placeholder="บอกเล่าเกี่ยวกับโปรเจกต์ของคุณ..."
                  className="mt-2 min-h-32"
                />
              </div>
              <Button type="submit" size="lg" className="w-full">
                ส่งคำขอใบเสนอราคา
              </Button>
            </form>
          </Card>

          {/* Contact Information */}
          <div className="space-y-6">
            {contactInfo.map((info, idx) => (
              <Card key={idx} className="p-6 hover:shadow-soft transition-smooth">
                <div className="flex items-start">
                  <div className="p-3 rounded-full bg-primary/10 mr-4">
                    <info.icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-bold text-lg mb-2">{info.title}</h4>
                    {info.details.map((detail, i) => (
                      <p key={i} className="text-muted-foreground">
                        {detail}
                      </p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            {/* Social Links */}
            <Card className="p-6">
              <h4 className="font-bold text-lg mb-4">ติดต่อผ่านช่องทางอื่น</h4>
              <div className="flex flex-wrap gap-3">
                <Button variant="outline" size="sm">
                  <MessageCircle className="w-4 h-4 mr-2" /> LINE
                </Button>
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Instagram
                </Button>
                <Button variant="outline" size="sm">
                  WhatsApp
                </Button>
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card className="p-6">
              <h4 className="font-bold text-lg mb-4">แผนที่</h4>
              <div className="w-full h-64 bg-muted rounded-lg flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <MapPin className="w-12 h-12 mx-auto mb-2" />
                  <p>แผนที่ Google Maps</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
