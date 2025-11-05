import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import logo from "@/assets/logo.png";
import { useState } from "react";
import { Link } from "react-router-dom";
import { HashLink } from "react-router-hash-link";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About Us", href: "#about" },
    { name: "Services", href: "#services" },
    { name: "Products", href: "#products" },
    { name: "Blogs", href: "/blogs", isPage: true },
    { name: "Contact Us", href: "#contact" },
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
                  to={`/${link.href}`}
                  className="text-foreground hover:text-primary transition-smooth text-sm font-medium"
                >
                  {link.name}
                </HashLink>
              )
            )}
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

      {/* ✅ Mobile Dropdown Menu */}
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
                  to={`/${link.href}`}
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
