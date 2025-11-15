import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import oem from "@/assets/oemanodm.jpg";
import { title } from "process";
import { Card, Col, Row } from "antd";
import tops from "@/assets/product-tops.jpg";
import pants from "@/assets/product-pants.jpg";
import skirts from "@/assets/product-skirts.jpg";
import dresses from "@/assets/product-dresses.jpg";
import { Item } from "@radix-ui/react-accordion";

const GalloryDetail = () => {
  const { id } = useParams<{ id: string }>();

const posts = [
    {
        id: 1,
        title: "TOP",
        item: [
            {
                    id: 1,
                    title: "TOPS Sets 1",
                    image: tops,
            },
            {
                    id: 2,
                    title: "TOPS Sets 2",
                    image: tops,
            },
            {
                    id: 3,
                    title: "TOPS Sets 3",
            },
            {
                    id: 4,
                    title: "TOPS Sets 4",
            }
        ],
    },
    {
        id: 2,
        title: "PANTS",
        excerpt: "อัพเดทเทรนด์แฟชั่นล่าสุดที่จะมาแรงในปี 2025 สำหรับแบรนด์เสื้อผ้าไทย",
        date: "10 มกราคม 2025",
        category: "แฟชั่น",
        item: [
            {
                    id: 1,
                    title: "PANTS Sets 1",
                    image: pants,
            },
            {
                    id: 2,
                    title: "PANTS Sets 2",
                    image: pants,
            },
            {
                    id: 3,
                    title: "PANTS Sets 3",
                    image: pants,
            },
            {
                    id: 4,
                    title: "PANTS Sets 4",
                    image: pants,
            }
        ],
    },
    {
        id: 3,
        title: "SKIRT",
        item: [
            {
                    id: 1,
                    title: "Skort Sets 1",
                    image: skirts,
            },
            {
                    id: 2,
                    title: "Skort Sets 2",
                    image: skirts,
            },
            {
                    id: 3,
                    title: "Skort Sets 3",
                    image: skirts,
            },
            {
                    id: 4,
                    title: "Skort Sets 4",
                    image: skirts,
            }
        ],
    },
    {
        id: 4,
        title: "DERESSES",
        item: [
            {
                    id: 1,
                    title: "DERESSES Sets 1",
                    image: dresses,
            },
            {
                    id: 2,
                    title: "DERESSES Sets 2",
                    image: dresses,
            },
            {
                    id: 3,
                    title: "DERESSES Sets 3",
                    image: dresses,
            },
            {
                    id: 4,
                    title: "DERESSES Sets 4",
                    image: dresses,
            }
        ],
    }
];

const foundPost = posts.find((p) => p.id.toString() === id);

if (!foundPost) {
    return (
        <div>
            <Navbar />
            <section className="pt-32 pb-16 text-center">
                <h1 className="text-4xl font-bold mb-6">404</h1>
                <p className="text-lg mb-4">Oops! Page not found</p>
                <p className="text-base text-gray-600">The gallery you're looking for doesn't exist.</p>
            </section>
            <Footer />
        </div>
    );
}

  const {Meta} = Card;

  const handleReadMore = (postId: number, itemId: number) => {
    const url = `/gallorydetail/${postId}/${itemId}`;
    window.location.href = url;
  };

  return (
    <div>
      <Navbar />
      <section className="pt-32 pb-16 text-center">
        
        {posts.map((post) => (
          post.id.toString() === id ? (
            <>
              <h1 className="text-4xl font-bold mb-6">{post.title}</h1>
              
            <Row gutter={[16, 16]} className="container-custom px-4 md:px-8 mx-auto">
                {post.item && post.item.map((img, index) => (
                    <Col key={img.id ?? index} xs={24} sm={12} md={8} lg={6} xl={6}>
                        <div className="mb-8">
                            <Card
                                hoverable
                                style={{ width: '100%' }}
                                onClick={() => handleReadMore(post.id, img.id)}
                                cover={
                                    <div style={{ position: 'relative', width: '100%', paddingBottom: '75%', overflow: 'hidden' }}>
                                        <img
                                            draggable={false}
                                            alt={img.title}
                                            src={img.image || "https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"}
                                            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                                        />
                                    </div>
                                }
                            >
                                <Meta title={img.title} description={post.category || ''} />
                            </Card>
                        </div>
                    </Col>
                ))}
            </Row>
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

export default GalloryDetail;
