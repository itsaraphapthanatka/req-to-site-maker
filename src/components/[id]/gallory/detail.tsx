import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import {
  getStandard_product_set_detail,
  getStandard_product_set_by_id,
} from "@/server/collection";

const API_URL = import.meta.env.VITE_API_URL;
interface StandardProductSet {
  id: number;
  standid: number;
  standsetname: string;
  standsetdesc: string; // HTML
  standsetimg: string | null;
}

interface StandardProductSetDetail {
  id: number;
  s_id: number;
  s_set_id: number;
  s_set_title: string;
  s_set_desc: string;
  s_set_img: string;
  s_set_chk_main: number;
  position: number;
}

const API_BASE_URL = ""; // ถ้า backend คนละโดเมน ให้ใส่ เช่น "https://api.yourdomain.com"

const GalloryDetailID = () => {
  const { postId, imgId } = useParams<{ postId: string; imgId: string }>();
  // postId = standid (1–4), imgId = s_set_id (id ของเซ็ต)

  const [details, setDetails] = useState<StandardProductSetDetail[]>([]);
  const [productSet, setProductSet] = useState<StandardProductSet[]>([]);
  const [loading, setLoading] = useState(false);
  const [index, setIndex] = useState(0);

  const normalizeImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return API_URL ? `${API_URL}${path}` : path;
  };

  useEffect(() => {
    const fetchData = async () => {
      if (!postId || !imgId) return;

      try {
        setLoading(true);

        // 1) รูปในเซ็ต (detail)
        const resDetail = await getStandard_product_set_detail(
          Number(postId),
          Number(imgId)
        );
        const arrDetail: StandardProductSetDetail[] = Array.isArray(resDetail)
          ? resDetail
          : [resDetail];

        arrDetail.sort((a, b) => a.position - b.position);
        setDetails(arrDetail);

        // 2) ข้อมูลเซ็ต (ชื่อ + description HTML)
        const resSet = await getStandard_product_set_by_id(Number(imgId));
        const arrSet: StandardProductSet[] = Array.isArray(resSet)
          ? resSet
          : [resSet];

        setProductSet(arrSet);
        setIndex(0);
      } catch (err) {
        console.error("Error fetching standard product set:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [postId, imgId]);

  const images = details.map((d) => ({
    id: d.id,
    src: normalizeImageUrl(d.s_set_img),
  }));

  // ✅ title และ description จาก getStandard_product_set_by_id
  const title = productSet[0]?.standsetname ?? `Set ${imgId ?? ""}`;
  const descriptionHtml = productSet[0]?.standsetdesc ?? "";

  const prevImage = () => {
    setIndex((prev) =>
      images.length === 0 ? 0 : prev === 0 ? images.length - 1 : prev - 1
    );
  };

  const nextImage = () => {
    setIndex((prev) =>
      images.length === 0 ? 0 : prev === images.length - 1 ? 0 : prev + 1
    );
  };

  // ถ้าโหลดเสร็จแล้วแต่ไม่พบรูปเลย
  if (!loading && images.length === 0) {
    return (
      <div>
        <Navbar />
        <section className="pt-32 pb-16 text-center">
          <h1 className="text-4xl font-bold mb-4">404 - Not Found</h1>
          <p className="text-gray-600">
            This product set does not exist or no images found.
          </p>
        </section>
        <Footer />
      </div>
    );
  }

  return (
    <div>
      <Navbar />

      <section className="container pt-32 pb-16 text-center">
        <h1 className="text-3xl md:text-4xl font-bold mb-6">{title}</h1>

        {loading && (
          <p className="text-gray-600 mb-6">กำลังโหลดข้อมูล...</p>
        )}

        {/* MAIN IMAGE + ARROWS */}
        {images.length > 0 && (
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
              alt={`image-${images[index].id}`}
            />

            {/* RIGHT ARROW */}
            <button
              onClick={nextImage}
              className="absolute right-4 md:right-16 p-3 bg-white/80 hover:bg-white shadow rounded-full"
            >
              ▶
            </button>
          </div>
        )}

        {/* THUMBNAILS */}
        {images.length > 1 && (
          <div className="flex overflow-x-auto gap-4 px-4 justify-center mb-6">
            {images.map((img, i) => (
              <div
                key={img.id}
                onClick={() => setIndex(i)}
                className={`
                  w-24 h-24 sm:w-28 sm:h-28 flex-shrink-0 
                  cursor-pointer border rounded-lg overflow-hidden 
                  transition-all duration-300
                  ${index === i
                    ? "border-blue-500 scale-105"
                    : "border-gray-300"
                  }
                `}
              >
                <img
                  src={img.src}
                  className="w-full h-full object-cover"
                  alt={`thumb-${img.id}`}
                />
              </div>
            ))}
          </div>
        )}

        {/* ✅ DESCRIPTION จาก getStandard_product_set_by_id (HTML เต็ม) */}
        {descriptionHtml && (
          <div className="mt-10 max-w-3xl mx-auto text-left">
            <h2 className="text-2xl font-bold mb-4">{title}</h2>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: descriptionHtml }}
            />
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default GalloryDetailID;
