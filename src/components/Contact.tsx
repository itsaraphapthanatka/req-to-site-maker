import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock } from "lucide-react";
import facebook from "@/assets/social/facebook.png";
import instagram from "@/assets/social/instagram.png";
import line from "@/assets/social/line.png";
import youtube from "@/assets/social/youtube.png";
import tiktok from "@/assets/social/tiktok.png";
import twitter from "@/assets/social/twitter.png";
import wechat from "@/assets/social/wechat.jpg";
import { createQuote, CreateQuoteInput } from "@/server/quote";
import { getContact } from "@/server/contact";
import { useState } from "react";
import { useEffect } from "react";
import { useLang } from "@/context/LanguageContext";
interface Contact {
  id: number;
  phone: string;
  email: string;
  factoryAddress: string;
  workinghour: string;
  googlemap: string;
  facebook: string;
  instagram: string;
  line: string;
  youtube: string;
  tiktok: string;
  wechat: string;
  x_twitter: string;
}

const translations = {
  en: {
    quoteRequest: "Quote Request",
    nameSurname: "Name-Surname *",
    email: "Email *",
    phoneNumber: "Phone Number *",
    productType: "Product Type *",
    quantitySize: "Quantity / Size *",
    serviceType: "Service Type *",
    additionalDetails: "Additional Details",
    sendMessage: "Send Quote Request",
    factoryAddress: "Factory Address",
    workinghour: "Working Hours",
    contactUs: "Contact Us",
    contactUsDescription: "We offer free consultations and quotations. Contact us via any channel.",
    selectService: "Select Service",
    contactViaOtherChannels: "Contact via other channels",
    map: "Map",
    productTypePlaceholder: "T-shirt, pants, dress, etc.",
    quantitySizePlaceholder: "e.g. 100-500 pieces",
    additionalDetailsPlaceholder: "Tell us about your project...",
  },
  th: {
    quoteRequest: "คำขอราคา",
    nameSurname: "ชื่อ - นามสกุล *",
    email: "อีเมล *",
    phoneNumber: "เบอร์โทรศัพท์ *",
    productType: "ประเภทสินค้า *",
    quantitySize: "จำนวน / ขนาด *",
    serviceType: "ประเภทบริการ *",
    additionalDetails: "รายละเอียดเพิ่มเติม",
    sendMessage: "ส่งคำขอราคา",
    factoryAddress: "ที่อยู่โรงงาน",
    workinghour: "ชั่วโมงทำการ",
    contactUs: "ติดต่อเรา",
    contactUsDescription: "เราให้คำปรึกษาและคำขอราคาฟรี ๆ ติดต่อเราผ่านช่องทางใดก็ได้",
    selectService: "เลือกบริการ",
    contactViaOtherChannels: "ติดต่อเราผ่านช่องทางอื่น ๆ",
    map: "แผนที่",
    productTypePlaceholder: "เสื้อยืด, กางเกง, ชุดเดรส ฯลฯ",
    quantitySizePlaceholder: "ตัวอย่าง: 100-500 ชิ้น",
    additionalDetailsPlaceholder: "บอกเราเกี่ยวกับโครงการของคุณ...",
  },
};

const Contact = () => {
  const { lang } = useLang();
  const [contact, setContact] = useState<Contact | null>(null);

  const fetchContact = async () => {
    const contact = await getContact();
    const item = Array.isArray(contact) ? contact[0] : contact;
    console.log(item);
    setContact(item);
  };

  useEffect(() => {
    fetchContact();
  }, []);

  const contactInfo = [
    {
      icon: MapPin,
      title: translations[lang].factoryAddress,
      details: [contact?.factoryAddress],
    },
    {
      icon: Phone,
      title: translations[lang].phoneNumber,
      details: [contact?.phone],
    },
    {
      icon: Mail,
      title: translations[lang].email,
      details: [contact?.email],
    },
    {
      icon: Clock,
      title: translations[lang].workinghour,
      details: [contact?.workinghour],
    },
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formElement = e.target as HTMLFormElement | null;
    if (!formElement) {
      console.warn("Form element is null - cannot reset");
      return;
    }

    const formData = new FormData(formElement);

    const quote: CreateQuoteInput = {
      name: formData.get("name") as string,
      email: formData.get("email") as string,
      phone: formData.get("phone") as string,
      product_type: formData.get("type") as string,
      qty_size: formData.get("quantity") as string,
      addition_details: `${formData.get("service")}\n${formData.get("message")}`,
    };

    await createQuote(quote);
    alert("Quote request sent successfully!");

    formElement.reset(); // <-- ปลอดภัยแน่นอน
  };


  return (
    <section id="contact" className="py-24 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">{translations[lang].contactUs}</h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            {translations[lang].contactUsDescription}
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          {/* Contact Form */}
          <Card className="p-8 shadow-elegant">
            <h3 className="text-2xl font-bold mb-6">{translations[lang].quoteRequest}</h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="flex flex-col">
                <Label htmlFor="name">{translations[lang].nameSurname}</Label>
                <Input id="name" name="name" placeholder={translations[lang].nameSurname} className="mt-2" required />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="email">{translations[lang].email}</Label>
                <Input id="email" name="email" type="email" placeholder="example@email.com" className="mt-2" required />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="phone">{translations[lang].phoneNumber}</Label>
                <Input id="phone" name="phone" type="tel" placeholder="+66 8X-XXX-XXXX" className="mt-2" required />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="type">{translations[lang].productType}</Label>
                <Input id="type" name="type" placeholder={translations[lang].productType} className="mt-2" required />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="quantity">{translations[lang].quantitySize}</Label>
                <Input id="quantity" name="quantity" placeholder={translations[lang].quantitySize} className="mt-2" required />
              </div>
              <div className="flex flex-col">
                <Label htmlFor="service">{translations[lang].serviceType}</Label>
                <select id="service" name="service" className="w-full mt-2 px-3 py-2 border border-input rounded-lg bg-background">
                  <option value="">{translations[lang].selectService}</option>
                  <option value="odm">ODM - Design and produce full cycle</option>
                  <option value="oem">OEM - Produce according to the customer's model</option>
                </select>
              </div>
              <div className="flex flex-col">
                <Label htmlFor="message">{translations[lang].additionalDetails}</Label>
                <Textarea id="message" name="message" placeholder={translations[lang].additionalDetails} className="mt-2 min-h-32" />
              </div>
              <Button type="submit" size="lg" className="w-full">
                {translations[lang].sendMessage}
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
                      <p key={i} className="text-muted-foreground">{detail}</p>
                    ))}
                  </div>
                </div>
              </Card>
            ))}

            {/* Social Links */}
            <Card className="p-6">
              <h4 className="font-bold text-lg mb-4">{translations[lang].contactViaOtherChannels}</h4>
              <div className="mt-4 flex flex-wrap gap-3">
                {contact?.facebook && (
                  <a href={contact?.facebook} target="_blank" rel="noopener noreferrer">
                    <img src={facebook} alt="Facebook" className="w-8 h-8" />
                  </a>
                )}
                {contact?.instagram && (
                  <a href={contact?.instagram} target="_blank" rel="noopener noreferrer">
                    <img src={instagram} alt="Instagram" className="w-8 h-8" />
                  </a>
                )}
                {contact?.line && (
                  <a href={contact?.line} target="_blank" rel="noopener noreferrer">
                    <img src={line} alt="Line" className="w-8 h-8" />
                  </a>
                )}
                {contact?.youtube && (
                  <a href={contact?.youtube} target="_blank" rel="noopener noreferrer">
                    <img src={youtube} alt="YouTube" className="w-8 h-8" />
                  </a>
                )}
                {contact?.tiktok && (
                  <a href={contact?.tiktok} target="_blank" rel="noopener noreferrer">
                    <img src={tiktok} alt="TikTok" className="w-8 h-8" />
                  </a>
                )}
                {contact?.x_twitter && (
                  <a href={contact?.x_twitter} target="_blank" rel="noopener noreferrer">
                    <img src={twitter} alt="Twitter" className="w-8 h-8" />
                  </a>
                )}
                {contact?.wechat && (
                  <a href={contact?.wechat} target="_blank" rel="noopener noreferrer">
                    <img src={wechat} alt="Wechat" className="w-8 h-8" />
                  </a>
                )}
              </div>
            </Card>

            {/* Map Placeholder */}
            <Card className="p-6">
              <h4 className="font-bold text-lg mb-4">{translations[lang].map}</h4>
              <div className="w-full h-64 rounded-lg overflow-hidden">
                <iframe
                  src={contact?.googlemap}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                ></iframe>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;
