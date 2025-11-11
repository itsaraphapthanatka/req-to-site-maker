import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { HashLink } from "react-router-hash-link";

const Blog = () => {
  const posts = [
    {
      id: 1,
      title: "ODM ต่างจาก OEM อย่างไร?",
      excerpt: "ทำความเข้าใจความแตกต่างระหว่าง ODM และ OEM เพื่อเลือกบริการที่เหมาะกับธุรกิจของคุณ",
      date: "15 มกราคม 2025",
      category: "บริการ",
    },
    {
      id: 2,
      title: "5 เทรนด์แฟชั่นปี 2025",
      excerpt: "อัพเดทเทรนด์แฟชั่นล่าสุดที่จะมาแรงในปี 2025 สำหรับแบรนด์เสื้อผ้าไทย",
      date: "10 มกราคม 2025",
      category: "แฟชั่น",
    },
    {
      id: 3,
      title: "เลือกผ้าแบบไหนให้เสื้อผ้าขายดี",
      excerpt: "คู่มือการเลือกเนื้อผ้าที่เหมาะสมกับสินค้าแต่ละประเภท เพื่อความพึงพอใจของลูกค้า",
      date: "5 มกราคม 2025",
      category: "เทคนิค",
    },
    {
      id: 4,
      title: "รับผลิตเสื้อผ้า ODM คืออะไร",
      excerpt: "ทำความรู้จักกับบริการ ODM และประโยชน์ที่จะได้รับสำหรับผู้ประกอบการมือใหม่",
      date: "1 มกราคม 2025",
      category: "บริการ",
    },
    {
      id: 5,
      title: "รับผลิตเสื้อผ้า OEM คืออะไร",
      excerpt: "เจาะลึกบริการ OEM และเหมาะสมกับแบรนด์ประเภทไหน",
      date: "28 ธันวาคม 2024",
      category: "บริการ",
    },
    {
      id: 6,
      title: "โรงงานผลิตเสื้อผ้าแฟชั่น เลือกอย่างไร",
      excerpt: "7 เคล็ดลับในการเลือกโรงงานผลิตเสื้อผ้าที่เหมาะสมกับแบรนด์ของคุณ",
      date: "20 ธันวาคม 2024",
      category: "คู่มือ",
    },
  ];

  return (
    <div className="min-h-screen">
      <Navbar />
      {/* Hero Section */}
      <section className="pt-32 pb-16 bg-gradient-to-b from-secondary/20 to-background">
        <div className="container-custom px-4 md:px-8">
          <div className="text-center max-w-3xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">Articles and news</h1>
            <p className="text-xl text-muted-foreground">
              Techniques, knowledge and fashion trends for entrepreneurs
            </p>
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="section-padding bg-secondary/5 pb-32 m-10">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.slice(1).map((post) => (
              <article 
                key={post.id}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div className="h-48 bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center group-hover:from-primary/30 group-hover:to-accent/30 transition-all duration-300">
                  <div className="text-center p-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      {post.id}
                    </div>
                    <div className="text-sm text-muted-foreground">{post.category}</div>
                  </div>
                </div>
                <div className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    <Calendar size={14} className="mr-2 text-primary" />
                    <span>{post.date}</span>
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Button variant="ghost" className="p-0 h-auto font-semibold text-primary hover:text-primary/80">
                    อ่านต่อ
                    <ArrowRight className="ml-2" size={16} />
                  </Button>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;
