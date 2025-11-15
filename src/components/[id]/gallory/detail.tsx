import { useParams } from "react-router-dom";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

// ภาพทั้งหมดเหมือนในสินค้าของคุณ
import re01 from "@/assets/RE_01.jpg";
import re02 from "@/assets/RE_02.jpg";
import re03 from "@/assets/RE_03.jpg";
import re04 from "@/assets/RE_04.jpg";
import re05 from "@/assets/RE_05.jpg";
import re06 from "@/assets/RE_06.jpg";

const GalloryDetailID = () => {
 const { postId, imgId } = useParams();


  console.log("Post ID:", postId);
  console.log("Item ID:", imgId);

  // ข้อมูลแต่ละเซ็ต
  const posts = [
    {
      id: 1,
      title: "TOPS",
      description: "This is the detail page for TOP items.",
      items: [
        { id: 1, image: [re01, re02, re03, re04, re05] },
        { id: 2, image: [re02, re03, re04] },
        { id: 3, image: [re03, re04, re05] },
        { id: 4, image: [re04, re05, re06] },
      ],
    },
    {
      id: 2,
      title: "PANTS",
      description: "This is the detail page for PANTS items.",
      items: [
        { id: 1, image: [re02, re03, re04] },
        { id: 2, image: [re03, re04, re05] },
        { id: 3, image: [re04, re05, re06] },
      ],
    },
    {
      id: 3,
      title: "SKIRTS",
      description: "Detail about SKIRTS.",
      items: [
        { id: 1, image: [re01, re02] },
        { id: 2, image: [re02, re03] },
      ],
    },
    {
      id: 4,
      title: "DRESSES",
      description: "Detail about DRESSES.",
      items: [
        { id: 1, image: [re04, re05, re06] },
        { id: 2, image: [re05, re06] },
      ],
    },
  ];

  // หาโพสต์ + item
  const post = posts.find((p) => p.id.toString() === postId);
  const selectedItem = post?.items.find((i) => i.id.toString() === imgId);

  if (!post || !selectedItem) {
    return (
      <div>
        <Navbar />
        <section className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold">404 - Not Found</h1>
          <p className="text-gray-600">This item does not exist.</p>
        </section>
        <Footer />
      </div>
    );
  }

  // ตั้งค่ารูปภาพ
  const images = selectedItem.image.map((src, index) => ({
    id: index + 1,
    src: src,
  }));

  const [index, setIndex] = useState(0);

  const prevImage = () => {
    setIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const nextImage = () => {
    setIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div>
      <Navbar />

      <section className="container pt-32 pb-16 text-center">
        <h1 className="text-4xl font-bold mb-6">
          {post.title} — Set {imgId}
        </h1>

        {/* MAIN IMAGE + ARROWS */}
        <div className="relative flex justify-center items-center mb-8">

          {/* LEFT ARROW */}
          <button
            onClick={prevImage}
            className="absolute left-4 md:left-16 p-3 bg-white/80 hover:bg-white shadow rounded-full"
          >
            ◀
          </button>

          {/* MAIN IMAGE */}
          <img
            src={images[index].src}
            className="
              w-[90%]
              sm:w-[70%]
              md:w-[55%]
              lg:w-[50%]
              xl:w-[45%]
              rounded-lg shadow-lg transition-all duration-300
            "
            alt="main"
          />

          {/* RIGHT ARROW */}
          <button
            onClick={nextImage}
            className="absolute right-4 md:right-16 p-3 bg-white/80 hover:bg-white shadow rounded-full"
          >
            ▶
          </button>
        </div>

        {/* THUMBNAILS */}
        <div className="flex overflow-x-auto gap-4 px-4 justify-center">
          {images.map((img, i) => (
            <div
              key={img.id}
              onClick={() => setIndex(i)}
              className={`
                w-28 h-28 sm:w-32 sm:h-32 flex-shrink-0 
                cursor-pointer border rounded-lg overflow-hidden 
                transition-all duration-300
                ${index === i ? "border-blue-500 scale-105" : "border-gray-300"}
              `}
            >
              <img src={img.src} className="w-full h-full object-cover" alt="thumb" />
            </div>
          ))}
        </div>

        {/* DESCRIPTION */}
        <div className="mt-10 max-w-3xl mx-auto text-left">
          <p className="text-base leading-relaxed">{post.description}</p>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default GalloryDetailID;
