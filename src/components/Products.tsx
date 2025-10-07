import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Products = () => {
  const categories = [
    { name: "TOPS", desc: "เสื้อ", count: 25, color: "from-primary/20 to-primary/40" },
    { name: "PANTS", desc: "กางเกง", count: 18, color: "from-secondary/30 to-secondary/50" },
    { name: "SKIRT", desc: "กระโปรง", count: 15, color: "from-accent/20 to-accent/40" },
    { name: "DRESSES", desc: "เดรส", count: 22, color: "from-muted/30 to-muted/50" },
    { name: "TWO PIECE SETS", desc: "ชุดเซต", count: 12, color: "from-primary/30 to-accent/30" },
  ];

  return (
    <section id="products" className="py-24 gradient-sunset">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-widest text-primary mb-4 font-semibold">
            #WHERE SIMPLICITY BECOME ART
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ที่ความเรียบง่ายกลายเป็นศิลปะ
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            เสื้อผ้าสำเร็จรูปที่เราออกแบบและผลิตมาเพื่อให้คุณนำไปใช้สร้างเอกลักษณ์ให้แบรนด์ได้ทันที
          </p>
          <p className="text-lg text-primary italic font-medium">
            "แฟชั่นพร้อมเสิร์ฟ สู่ธุรกิจคุณ"
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-6 mb-12">
          {categories.map((category, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden aspect-[3/4] cursor-pointer hover:shadow-warm transition-smooth border-2 hover:border-primary/50"
            >
              <div className={`absolute inset-0 bg-gradient-to-br ${category.color}`} />
              <div className="absolute inset-0 bg-background/0 group-hover:bg-background/10 transition-smooth" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-2 text-foreground group-hover:scale-105 transition-smooth">{category.name}</h3>
                <p className="text-base md:text-lg text-foreground/80 mb-2">{category.desc}</p>
                <p className="text-sm text-primary font-semibold bg-background/80 px-3 py-1 rounded-full">{category.count} แบบ</p>
              </div>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="default">
            ดูผลงานทั้งหมด <ArrowRight className="ml-2" />
          </Button>
        </div>

        {/* Portfolio Grid Preview */}
        <div className="mt-20">
          <h3 className="text-3xl md:text-4xl font-bold text-center mb-12">ตัวอย่างงานที่ผ่านมา</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Card
                key={item}
                className="group relative overflow-hidden aspect-[3/4] cursor-pointer hover:shadow-warm transition-smooth border hover:border-primary/50"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-secondary/30 to-muted/70" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/20 transition-smooth" />
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                  <div className="text-center bg-background/90 px-6 py-3 rounded-lg shadow-warm">
                    <p className="text-foreground text-sm font-semibold">
                      {item % 2 === 0 ? "ODM Collection" : "OEM - Client Project"}
                    </p>
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/60 to-transparent opacity-100 group-hover:opacity-0 transition-smooth">
                  <p className="text-background text-sm font-medium">
                    {item % 2 === 0 ? "ODM Collection" : "OEM - Client Project"}
                  </p>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Products;
