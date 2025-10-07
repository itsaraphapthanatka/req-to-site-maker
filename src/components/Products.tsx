import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const Products = () => {
  const categories = [
    { name: "TOPS", desc: "เสื้อ", count: 25 },
    { name: "PANTS", desc: "กางเกง", count: 18 },
    { name: "SKIRT", desc: "กระโปรง", count: 15 },
    { name: "DRESSES", desc: "เดรส", count: 22 },
    { name: "TWO PIECE SETS", desc: "ชุดเซต", count: 12 },
  ];

  return (
    <section id="products" className="py-24 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <p className="text-sm uppercase tracking-wider text-primary mb-4">
            #WHERE SIMPLICITY BECOME ART
          </p>
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            ที่ความเรียบง่ายกลายเป็นศิลปะ
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-4">
            เสื้อผ้าสำเร็จรูปที่เราออกแบบและผลิตมาเพื่อให้คุณนำไปใช้สร้างเอกลักษณ์ให้แบรนด์ได้ทันที
          </p>
          <p className="text-lg text-primary italic">
            "แฟชั่นพร้อมเสิร์ฟ สู่ธุรกิจคุณ"
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 mb-12">
          {categories.map((category, idx) => (
            <Card
              key={idx}
              className="group relative overflow-hidden h-80 cursor-pointer hover:shadow-elegant transition-smooth"
            >
              <div className="absolute inset-0 bg-gradient-to-b from-muted/40 to-muted" />
              <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-smooth" />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
                <h3 className="text-2xl font-bold mb-2 text-foreground">{category.name}</h3>
                <p className="text-lg text-muted-foreground mb-3">{category.desc}</p>
                <p className="text-sm text-primary font-medium">{category.count} แบบ</p>
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
          <h3 className="text-3xl font-bold text-center mb-12">ตัวอย่างงานที่ผ่านมา</h3>
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <Card
                key={item}
                className="group relative overflow-hidden aspect-[3/4] cursor-pointer hover:shadow-elegant transition-smooth"
              >
                <div className="absolute inset-0 bg-gradient-to-b from-muted/20 to-muted/60" />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/10 transition-smooth" />
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-foreground/80 to-transparent">
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
