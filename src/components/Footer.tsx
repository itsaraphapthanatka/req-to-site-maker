import React, { useEffect, useState } from 'react'
import { getContact } from '@/server/contact';

interface Contact {
  id: number;
  phone: string;
  email: string;
  address: string;
}

const Footer = () => {
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

  return (
    <footer className="bg-foreground text-background py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <h3 className="text-xl font-bold mb-4 text-primary">SARANYA CLOTHING</h3>
            <p className="text-sm opacity-80">
              ผลิตเสื้อผ้า ODM & OEM ครบวงจร ด้วยคุณภาพมาตรฐานส่งออก
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">เมนู</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="opacity-80 hover:opacity-100 transition-smooth">หน้าแรก</a></li>
              <li><a href="#about" className="opacity-80 hover:opacity-100 transition-smooth">เกี่ยวกับเรา</a></li>
              <li><a href="#services" className="opacity-80 hover:opacity-100 transition-smooth">บริการ</a></li>
              <li><a href="#products" className="opacity-80 hover:opacity-100 transition-smooth">สินค้า</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">บริการ</h4>
            <ul className="space-y-2 text-sm">
              <li className="opacity-80"><a href="#services" className="opacity-80 hover:opacity-100 transition-smooth">ODM - ออกแบบและผลิต</a></li>
              <li className="opacity-80"><a href="#services" className="opacity-80 hover:opacity-100 transition-smooth">OEM - ผลิตตามแบบ</a></li>
              <li className="opacity-80"><a href="#contact" className="opacity-80 hover:opacity-100 transition-smooth">คำปรึกษาแบรนด์</a></li>
              {/* <li className="opacity-80">ผลิตสินค้าตัวอย่าง</li> */}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">ติดต่อเรา</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li><a href="#contact" className="opacity-80 hover:opacity-100 transition-smooth">{contact?.phone}</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 transition-smooth">{contact?.email}</a></li>
              <li><a href="#contact" className="opacity-80 hover:opacity-100 transition-smooth">{contact?.address}</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-background/20 pt-8 text-center text-sm opacity-60">
          <p>© {new Date().getFullYear()} SARANYA CLOTHING. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
