import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import heroImage from "@/assets/2.png";
import heroVideo from "@/assets/Saranya_1.mp4";
import heroVideo2 from "@/assets/Saranya_2.mp4";
import { Carousel } from "antd";
import workshopImage from "@/assets/workshop.jpg";
import img1 from "@/assets/img1.png";
import img2 from "@/assets/img2.png";
import img5 from "@/assets/img5.png";
import img6 from "@/assets/img6.png";  

const Hero = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleCarouselChange = (current: number) => {
    setCurrentIndex(current);
  };

  return (
    <section id="home" className="relative h-screen flex items-center">
      <div className="absolute inset-0 z-0">
        <Carousel autoplay={true} autoplaySpeed={10000} afterChange={handleCarouselChange}>
          <div className="h-screen">
            <video 
              src={heroVideo}
              autoPlay
              loop
              muted
              className="w-full h-screen object-cover"
              title="Saranya_1"
            />
          </div>
          <div className="h-screen">
            <img src={img2} alt="Saranya_2" className="w-full h-screen object-cover" />
          </div>
          <div className="h-screen">
            <img src={img5} alt="Saranya_3" className="pt-20 w-full h-screen  object-cover" />
          </div>
          <div className="h-screen">
            <img src={img6} alt="Saranya_3" className="pt-20 w-full h-screen  object-cover" />
          </div>
        </Carousel>
        <div className="absolute inset-0" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-3xl">
          <h4 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6 leading-tight text-background">
            {currentIndex === 0 ? (
              <>
               
              </>
            ) : currentIndex === 1 ? (
              <>
              {/* Producing brand-level fashion with international standards. */}
              </>
            ) : currentIndex === 2 ? (
              <>
                {/* Where simplicity becomes art. */}
              </>
            ) : null
            }
          </h4>
          <p className="text-xl md:text-2xl mb-4 text-background/90">
            {currentIndex === 0
              ? ""
              : ""}
          </p>
          <p className="text-lg mb-8 text-background/80 max-w-2xl">
            {currentIndex === 0
              ? ""
              : ""}
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            {currentIndex === 0 ? (
              <>
               
              </>
            ) : (
              <>
              
              </>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
