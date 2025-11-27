import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useLang } from "@/context/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const { lang, setLang } = useLang();

  // 🌍 TEXT TRANSLATION
  const t = {
    en: {
      home: "Home",
      about: "About Us",
      services: "Services",
      products: "Products",
      blogs: "Blogs",
      contact: "Contact Us",
    },
    th: {
      home: "หน้าแรก",
      about: "เกี่ยวกับเรา",
      services: "บริการ",
      products: "สินค้า",
      blogs: "บทความ",
      contact: "ติดต่อเรา",
    },
  };

  // 🌍 LINKS CONFIG
  const navLinks = [
    { id: "home", label: t[lang].home, href: "/#home" },
    { id: "about", label: t[lang].about, href: "/#about" },
    { id: "services", label: t[lang].services, href: "/#services" },
    { id: "products", label: t[lang].products, href: "/#products" },
    { id: "blogs", label: t[lang].blogs, href: "/blogs" },
    { id: "contact", label: t[lang].contact, href: "/#contact" },
  ];

  // เช็คว่าเป็น hash-link หรือ page-link
  const isHash = (url: string) => url.startsWith("/#");

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <Link to="/">
            <img src={logo} alt="logo" className="w-32 h-32 object-contain" />
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((item) =>
              isHash(item.href) ? (
                <HashLink
                  key={item.id}
                  smooth
                  to={item.href}
                  className="text-foreground hover:text-primary text-sm font-medium transition-smooth"
                >
                  {item.label}
                </HashLink>
              ) : (
                <Link
                  key={item.id}
                  to={item.href}
                  className="text-foreground hover:text-primary text-sm font-medium transition-smooth"
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Language Dropdown */}
            {/* <div className="relative">
              <button
                onClick={() => setIsLangOpen(!isLangOpen)}
                className="text-foreground hover:text-primary text-sm font-medium flex items-center gap-1"
              >
                {lang === "en" ? "EN" : "TH"}
                <ChevronDown size={16} />
              </button>

              {isLangOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-background border border-border rounded-md shadow-lg py-1 z-20">
                  <button
                    onClick={() => {
                      setLang("en");
                      setIsLangOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent"
                  >
                    English
                  </button>

                  <button
                    onClick={() => {
                      setLang("th");
                      setIsLangOpen(false);
                    }}
                    className="w-full text-left px-4 py-2 text-sm hover:bg-accent"
                  >
                    ไทย
                  </button>
                </div>
              )}
            </div> */}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((item) =>
              isHash(item.href) ? (
                <HashLink
                  key={item.id}
                  smooth
                  to={item.href}
                  className="text-foreground hover:text-primary text-base font-medium transition-smooth"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </HashLink>
              ) : (
                <Link
                  key={item.id}
                  to={item.href}
                  className="text-foreground hover:text-primary text-base font-medium transition-smooth"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              )
            )}

            {/* Language Switch (Mobile) */}
            <div className="flex gap-4 pt-3">
              <button
                onClick={() => {
                  setLang("en");
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-md border ${lang === "en" ? "bg-primary text-white" : "bg-accent"
                  }`}
              >
                EN
              </button>
              <button
                onClick={() => {
                  setLang("th");
                  setIsOpen(false);
                }}
                className={`px-4 py-2 rounded-md border ${lang === "th" ? "bg-primary text-white" : "bg-accent"
                  }`}
              >
                TH
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
