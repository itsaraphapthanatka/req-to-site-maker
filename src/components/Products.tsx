import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapse } from "antd";
import workshopImage from "@/assets/workshop.jpg";

import product1 from "@/assets/RE_01.jpg";
import product2 from "@/assets/RE_02.jpg";
import product3 from "@/assets/RE_03.jpg";
import product4 from "@/assets/RE_04.jpg";
import product5 from "@/assets/RE_05.jpg";
import product6 from "@/assets/RE_06.jpg";
import product7 from "@/assets/RE_07.jpg";
import product8 from "@/assets/RE_08.jpg";

const Products = () => {
  const [filter, setFilter] = useState<"all" | "new" | "season" | "original">("all");
  const [visibleCount, setVisibleCount] = useState(8); // ✅ แสดงเริ่มต้น 8 ชิ้น (2 แถว)
  const itemsPerRow = 4; // สมมติว่าหน้าจอใหญ่สุดแสดง 4 ต่อแถว
  const rowsPerLoad = 2; // โหลดเพิ่มทีละ 2 แถว
  const itemsPerLoad = itemsPerRow * rowsPerLoad;

  const portfolio = [
    { image: product1, desc: "New Collection", type: "new" },
    { image: product2, desc: "New Collection", type: "new" },
    { image: product3, desc: "Season Collection", type: "season" },
    { image: product4, desc: "New Collection", type: "new" },
    { image: product5, desc: "Original Collection", type: "original" },
    { image: product6, desc: "New Collection", type: "new" },
    { image: product7, desc: "New Collection", type: "new" },
    { image: product8, desc: "Original Collection", type: "original" },
    { image: product1, desc: "Season Collection", type: "season" },
    { image: product2, desc: "New Collection", type: "new" },
    { image: product3, desc: "Original Collection", type: "original" },
    { image: product4, desc: "New Collection", type: "new" },
  ];
  

  const filteredPortfolio =
    filter === "all"
      ? portfolio
      : portfolio.filter((item) => item.type === filter);

  const visiblePortfolio = filteredPortfolio.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerLoad);
  };

  return (
    <section id="products" className="gradient-sunset relative py-24">
      {/* BG */}
      <div className="absolute inset-0 z-0">
        <img
          src={workshopImage}
          alt="โรงงานผลิตเสื้อผ้า SARANYA CLOTHING"
          className="w-full h-full object-cover opacity-20"
        />
        <div className="absolute inset-0 bg-background/40 backdrop-blur-[1px]" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Collection
        </h3>

        {/* ปุ่ม Filter */}
        <div className="flex justify-center gap-3 mb-12">
          <Button
            variant={filter === "new" ? "default" : "outline"}
            onClick={() => {
              setFilter("new");
              setVisibleCount(8); // reset เมื่อเปลี่ยนหมวด
            }}
          >
            New Collection
          </Button>
          <Button
            variant={filter === "season" ? "default" : "outline"}
            onClick={() => {
              setFilter("season");
              setVisibleCount(8);
            }}
          >
            Season Collection
          </Button>
          <Button
            variant={filter === "original" ? "default" : "outline"}
            onClick={() => {
              setFilter("original");
              setVisibleCount(8);
            }}
          >
            Original Collection
          </Button>
          <Button
            variant={filter === "all" ? "default" : "outline"}
            onClick={() => {
              setFilter("all");
              setVisibleCount(8);
            }}
          >
            All
          </Button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
          {visiblePortfolio.map((item, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer hover:shadow-warm transition-smooth border hover:border-primary/50"
            >
              <img
                src={item.image}
                alt={item.desc}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-muted/70" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-smooth" />
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                <div className="text-center bg-background/90 px-6 py-3 rounded-lg shadow-warm">
                  <p className="text-foreground text-sm font-semibold">
                    {item.desc}
                  </p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* ปุ่ม Load More */}
        {visibleCount < filteredPortfolio.length && (
          <div className="text-center py-8">
            <Button size="lg" variant="default" onClick={handleLoadMore}>
              More
            </Button>
          </div>
        )}

        {/* ถ้าโหลดหมดแล้ว */}
        {visibleCount >= filteredPortfolio.length && (
          <div className="text-center py-8 text-muted-foreground text-sm italic">
            You've reached the end
          </div>
        )}

        {/* Collapse Section */}
        <div className="text-center mt-6 mb-6">
          <Collapse
            size="large"
            items={[
              {
                key: "1",
                label: "Standard Production",
                children: (
                  <div className="space-y-2">
                    {["TOPS", "PANTS", "SKIRT", "DRESSES"].map((cat, idx) => (
                      <a
                        key={idx}
                        href={`#${cat}`}
                        className="block hover:text-primary"
                      >
                        {cat}
                      </a>
                    ))}
                  </div>
                ),
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
};

export default Products;
