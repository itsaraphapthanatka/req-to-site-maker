const Footer = () => {
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
              <li className="opacity-80">ODM - ออกแบบและผลิต</li>
              <li className="opacity-80">OEM - ผลิตตามแบบ</li>
              <li className="opacity-80">คำปรึกษาแบรนด์</li>
              <li className="opacity-80">ผลิตสินค้าตัวอย่าง</li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-bold mb-4">ติดต่อเรา</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>02-XXX-XXXX</li>
              <li>info@saranyaclothing.com</li>
              <li>กรุงเทพมหานคร ประเทศไทย</li>
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
