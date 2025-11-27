import React, { useEffect, useState } from 'react'
import { getContact } from '@/server/contact';
import { useLang } from '@/context/LanguageContext';
interface Contact {
  id: number;
  phone: string;
  email: string;
  address: string;
}

const Footer = () => {
  const [contact, setContact] = useState<Contact | null>(null);
  const { lang } = useLang();

  const translations = {
    en: {
      menu: "Menu",
      services: "Services",
      contact: "Contact",
      home: "Home",
      about: "About",
      products: "Products",
      odm: "ODM",
      oem: "OEM",
      brand: "Brand",
      title: "SARANYA CLOTHING",
      desc: "ODM & OEM Full Process with Export Quality",
    },
    th: {
      menu: "เมนู",
      services: "บริการ",
      contact: "ติดต่อเรา",
      home: "หน้าแรก",
      about: "เกี่ยวกับเรา",
      products: "สินค้า",
      odm: "ODM",
      oem: "OEM",
      brand: "แบรนด์",
      title: "SARANYA CLOTHING",
      desc: "ผลิตเสื้อผ้า ODM & OEM ครบวงจร ด้วยคุณภาพมาตรฐานส่งออก",
    },
  };

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
            <h3 className="text-xl font-bold mb-4 text-primary">{translations[lang].title}</h3>
            <p className="text-sm opacity-80">
              {translations[lang].desc}
            </p>
          </div>

          <div>
            <h4 className="font-bold mb-4">{translations[lang].menu}</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="#home" className="opacity-80 hover:opacity-100 transition-smooth">{translations[lang].home}</a></li>
              <li><a href="#about" className="opacity-80 hover:opacity-100 transition-smooth">{translations[lang].about}</a></li>
              <li><a href="#services" className="opacity-80 hover:opacity-100 transition-smooth">{translations[lang].services}</a></li>
              <li><a href="#products" className="opacity-80 hover:opacity-100 transition-smooth">{translations[lang].products}</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{translations[lang].services}</h4>
            <ul className="space-y-2 text-sm">
              <li className="opacity-80"><a href="#services" className="opacity-80 hover:opacity-100 transition-smooth">{translations[lang].odm}</a></li>
              <li className="opacity-80"><a href="#services" className="opacity-80 hover:opacity-100 transition-smooth">{translations[lang].oem}</a></li>
              <li className="opacity-80"><a href="#contact" className="opacity-80 hover:opacity-100 transition-smooth">{translations[lang].brand}</a></li>
              {/* <li className="opacity-80">ผลิตสินค้าตัวอย่าง</li> */}
            </ul>
          </div>

          <div>
            <h4 className="font-bold mb-4">{translations[lang].contact}</h4>
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
