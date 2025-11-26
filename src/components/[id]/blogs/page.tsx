import { useParams } from "react-router-dom";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { getBlogById } from "@/server/blog";
import React, { useEffect, useState } from "react";
const API_URL = import.meta.env.VITE_API_URL;
const BlogDetail = () => {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<any>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await getBlogById(Number(id));
        setPost(response);
      } catch (error) {
        console.error("Error fetching post:", error);
      }
    };
    fetchPost();
  }, [id]);

  if (!post) return null;

  return (
    <div>
      <Navbar />

      <section className="pt-32 pb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">{post.title}</h1>

        <p className="text-sm text-muted-foreground mb-6">
          Published on {post.created_at || "Unknown"} | Category: {post.blogsType}
        </p>

        {/* รูปภาพ */}
        {post.img && (
          <div className="mb-6">
            <img
              src={API_URL + post.img}
              alt={post.title}
              className="mx-auto rounded-lg shadow-md"
              width={500}
              height={500}
            />
          </div>
        )}

        {/* เนื้อหา ReactQuill (HTML) */}
        <div
          className="mt-8 max-w-3xl mx-auto text-left prose"
          dangerouslySetInnerHTML={{ __html: post.content }}
        ></div>
      </section>

      <Footer />
    </div>
  );
};

export default BlogDetail;
