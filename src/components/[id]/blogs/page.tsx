import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import oem from "@/assets/oemanodm.jpg";

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();

  const posts = [
    {
      id: 1,
      title: "ODM ต่างจาก OEM อย่างไร?",
      excerpt: "ทำความเข้าใจความแตกต่างระหว่าง ODM และ OEM เพื่อเลือกบริการที่เหมาะกับธุรกิจของคุณ",
      date: "15 มกราคม 2025",
      category: "บริการ",
      image: [
        {
          src: oem,
          alt: "ODM ต่างจาก OEM อย่างไร?",
        },
      ],
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
    <div>
      <Navbar />
      <section className="pt-32 pb-16 text-center">
        
        <p className="text-muted-foreground">
        </p>
        {posts.map((post) => (
          post.id.toString() === id ? (
            <>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
                <p className="text-sm text-muted-foreground mb-6">
                    Published on {post.date} | Category: {post.category}
                </p>
                {post.image && post.image.map((img, index) => (
                  <div key={index} className="mb-6">
                    <img src={img.src} alt={img.alt} className="mx-auto rounded-lg shadow-md" />
                  </div>
                ))}
                <div key={post.id} className="mt-8 max-w-3xl mx-auto text-left">
                <p className="text-base leading-relaxed">{post.excerpt}</p>
                </div>
            </>
          ) : null
        ))}
      </section>
      <Footer />
    </div>
  );
};

export default BlogDetail;
