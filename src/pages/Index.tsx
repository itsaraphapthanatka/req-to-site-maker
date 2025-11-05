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

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <About />
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <Services />
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <Products />
        </section>

        <section className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12 xl:px-20">
          <Contact />
        </section>
      </main>

      {/* Footer */}
      <footer className="mt-auto bg-muted/20">
        <Footer />
      </footer>
    </div>
  );
};

export default Index;
