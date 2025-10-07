import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { name: "หน้าแรก", href: "#home" },
    { name: "เกี่ยวกับเรา", href: "#about" },
    { name: "บริการ", href: "#services" },
    { name: "สินค้า", href: "#products" },
    { name: "ติดต่อเรา", href: "#contact" },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border shadow-soft">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <div className="flex items-center">
            <h1 className="text-2xl font-bold text-primary">SARANYA CLOTHING</h1>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-foreground hover:text-primary transition-smooth text-sm font-medium"
              >
                {link.name}
              </a>
            ))}
            <Button variant="default" size="sm">
              ขอใบเสนอราคา
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2"
            onClick={() => setIsOpen(!isOpen)}
            aria-label="Toggle menu"
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden py-4 border-t border-border">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="block py-3 text-foreground hover:text-primary transition-smooth"
                onClick={() => setIsOpen(false)}
              >
                {link.name}
              </a>
            ))}
            <Button variant="default" size="sm" className="w-full mt-4">
              ขอใบเสนอราคา
            </Button>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
