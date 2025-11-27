import Footer from "@/components/Footer";
import { Calendar, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";
import { HashLink } from "react-router-hash-link";
import { getBlog } from "../server/blog";
import { useEffect, useState } from "react";
import { Image } from "antd"
import { useLang } from "@/context/LanguageContext";
const API_URL = import.meta.env.VITE_API_URL;
const Blog = () => {
  const [posts, setPosts] = useState([]);
  const { lang } = useLang();

  const translations = {
    en: {
      more: "More ",
    },
    th: {
      more: "อ่านต่อ",
    },
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = (await getBlog()).filter((post) => post.blogsStatus === "active");
        setPosts(response);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };
    fetchPosts();
  }, []);


  const handleReadMore = (id: number) => {
    const url = `/blogs/${id}`;
    window.location.href = url;

  }

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
            {posts.map((post) => (
              console.log("ssss", API_URL + post.img),
              <article
                key={post.id}
                className="bg-card rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 group"
              >
                <div
                  className="h-48 bg-cover bg-center group-hover:brightness-90 transition-all duration-300"
                  style={{ backgroundImage: `url(${encodeURI(API_URL + post.img)})` }}
                >
                </div>



                <div className="p-6">
                  <div className="flex items-center text-sm text-muted-foreground mb-3">
                    {/* <Calendar size={14} className="mr-2 text-primary" /> */}
                    {/* <span>{post.date}</span> */}
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-2">
                    {post.excerpt}
                  </p>
                  <Button onClick={() => handleReadMore(post.id)} variant="ghost" className="p-0 h-auto font-semibold text-primary hover:text-primary/80">
                    {translations[lang].more}
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
