import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import Products from "@/components/Products";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md">
        <Navbar />
      </header>

      {/* Main content */}
      <main className="flex-1 w-full overflow-hidden">
        <section className="w-full">
          <Hero />
        </section>
          <About />
          <Services />
          <Products />
          <Contact />
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-muted/20">
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
