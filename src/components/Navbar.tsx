import { Menu, X, ChevronDown } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import { useLang } from "@/context/LanguageContext";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { lang, setLang } = useLang();
  const [isLanguageDropdownOpen, setIsLanguageDropdownOpen] = useState(false);

  // 🌍 MULTI-LANGUAGE TEXT
  const translations = {
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

  // 🌍 NAV LINKS WITH TRANSLATION
  const navLinks = [
    { name: translations[lang].home, href: "#home" },
    { name: translations[lang].about, href: "#about" },
    { name: translations[lang].services, href: "#services" },
    { name: translations[lang].products, href: "#products" },
    { name: translations[lang].blogs, href: "/blogs", isPage: true },
    { name: translations[lang].contact, href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <Link to="/">
            <img src={logo} alt="logo" className="w-32 h-32 object-contain" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-foreground hover:text-primary transition-smooth text-sm font-medium"
                >
                  {link.name}
                </Link>
              ) : (
                <HashLink
                  key={link.name}
                  smooth
                  to={link.href}
                  className="text-foreground hover:text-primary transition-smooth text-sm font-medium"
                >
                  {link.name}
                </HashLink>
              )
            )}

            {/* Language Dropdown */}
            {/* <div className="relative">
              <button
                onClick={() =>
                  setIsLanguageDropdownOpen(!isLanguageDropdownOpen)
                }
                className="text-foreground hover:text-primary transition-smooth text-sm font-medium flex items-center gap-1"
              >
                {lang === "en" ? "EN" : "TH"}
                <ChevronDown size={16} />
              </button>

              {isLanguageDropdownOpen && (
                <div className="absolute right-0 mt-2 w-24 bg-background border border-border rounded-md shadow-lg py-1 z-20">
                  <button
                    onClick={() => {
                      setLang("en");
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-accent"
                  >
                    English
                  </button>

                  <button
                    onClick={() => {
                      setLang("th");
                      setIsLanguageDropdownOpen(false);
                    }}
                    className="block w-full text-left px-4 py-2 text-sm hover:bg-accent"
                  >
                    ไทย
                  </button>
                </div>
              )}
            </div> */}
          </div>

          {/* Mobile Toggle Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {isOpen && (
        <div className="md:hidden bg-background border-t border-border shadow-md">
          <div className="flex flex-col space-y-4 p-4">
            {navLinks.map((link) =>
              link.isPage ? (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-foreground hover:text-primary transition-smooth text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </Link>
              ) : (
                <HashLink
                  key={link.name}
                  smooth
                  to={link.href}
                  className="text-foreground hover:text-primary transition-smooth text-base font-medium"
                  onClick={() => setIsOpen(false)}
                >
                  {link.name}
                </HashLink>
              )
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
