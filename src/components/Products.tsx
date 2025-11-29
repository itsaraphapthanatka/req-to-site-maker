import React, { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Collapse, Modal, Carousel, Image, CollapseProps } from "antd";
import workshopImage from "@/assets/workshop.jpg";

// รูปสำหรับ Standard Production (ยังใช้ local)
import product1 from "@/assets/RE_01.jpg";
import product2 from "@/assets/RE_02.jpg";
import product3 from "@/assets/RE_03.jpg";
import product4 from "@/assets/RE_04.jpg";
import product5 from "@/assets/RE_05.jpg";
import product6 from "@/assets/RE_06.jpg";
import product7 from "@/assets/RE_07.jpg";
import product8 from "@/assets/RE_08.jpg";

import {
  getCollection,
  getCollectionImage,
  getStandard_product,
} from "@/server/collection";
import { useNavigate } from "react-router-dom";
import { useLang } from "@/context/LanguageContext";

const API_URL = import.meta.env.VITE_API_URL;





// ----------------- Types -----------------
interface Collection {
  id: number;
  collec_name: string;
  collec_name_th: string;
}

interface CollectionImage {
  id: number;
  collection_id: number;
  collection_img: string;
  position: number;
}

interface PortfolioItem {
  id: number;
  image: string;
  desc: string;
  collectionId: number;
}

interface StandardItem {
  id: number;
  title: string;
  title_th: string;
  image: { src: string; alt: string }[];
}

interface StandardProductApi {
  id: number;
  standname: string;
  standname_th: string;
}

const API_BASE_URL = ""; // ถ้า backend อยู่คนละโดเมน ให้ใส่เช่น "https://api.yourdomain.com"

const translations = {
  en: {
    collection: "Collection",
    standard: "Standard Production",
    endload: "You've reached the end",
    notFound: "No products found in this category",
    loading: "Loading Collection...",
    all: "All",
    more: "More",
  },
  th: {
    collection: "สินค้า",
    standard: "สินค้ามาตรฐาน",
    endload: "คุณได้ถึงจุดสุดท้ายแล้ว",
    notFound: "ไม่พบสินค้าในหมวดนี้",
    loading: "กำลังโหลดสินค้า...",
    all: "ทั้งหมด",
    more: "เพิ่มเติม",
  },
};
const Products = () => {
  // ✅ filter เป็น id ของ collection หรือ "all"
  const { lang } = useLang();
  const [filter, setFilter] = useState<number | "all">("all");
  const [visibleCount, setVisibleCount] = useState(8);
  const [openModal, setOpenModal] = useState(false);
  const [modalContent, setModalContent] = useState<React.ReactNode>(null);
  const navigate = useNavigate();
  const [collections, setCollections] = useState<Collection[]>([]);
  const [collectionImages, setCollectionImages] = useState<
    Record<number, CollectionImage[]>
  >({});
  const [loadingCollections, setLoadingCollections] = useState(false);
  // --------- Standard Product (from API) ----------
  const [standardProducts, setStandardProducts] = useState<
    StandardProductApi[]
  >([]);

  const [openModalStandard, setOpenModalStandard] = useState(false);
  const [selectedStandard, setSelectedStandard] = useState<StandardItem | null>(
    null
  );

  const itemsPerRow = 4;
  const rowsPerLoad = 2;
  const itemsPerLoad = itemsPerRow * rowsPerLoad;

  const normalizeImageUrl = (path: string) => {
    if (!path) return "";
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return API_URL ? `${API_URL}${path}` : path;
  };

  // ---------- Fetch Collections + Images ----------
  const fetchCollectionsWithImages = async () => {
    try {
      setLoadingCollections(true);

      const collectionRes = await getCollection();
      const collectionList: Collection[] = Array.isArray(collectionRes)
        ? collectionRes
        : [collectionRes];

      setCollections(collectionList);
      console.log("collections", collectionList);

      const imagesMap: Record<number, CollectionImage[]> = {};

      await Promise.all(
        collectionList.map(async (col) => {
          try {
            const imgRes = await getCollectionImage(col.id);
            const imgArr: CollectionImage[] = Array.isArray(imgRes)
              ? imgRes
              : [imgRes];
            imagesMap[col.id] = imgArr;
            console.log(`images for collection ${col.id}`, imgArr);
          } catch (err) {
            console.error(`Error fetching images for collection ${col.id}`, err);
            imagesMap[col.id] = [];
          }
        })
      );

      setCollectionImages(imagesMap);
    } catch (err) {
      console.error("Error fetching collections:", err);
    } finally {
      setLoadingCollections(false);
    }
  };

  // ---------- Fetch Standard Product ----------
  const fetchStandardProducts = async () => {
    try {
      const res = await getStandard_product();
      const list: StandardProductApi[] = Array.isArray(res) ? res : [res];
      setStandardProducts(list);
      console.log("standard products", list);
    } catch (err) {
      console.error("Error fetching standard products:", err);
    }
  };

  useEffect(() => {
    fetchCollectionsWithImages();
    fetchStandardProducts();
  }, []);

  // ---------- Build portfolio from API ----------
  const buildPortfolioFromApi = (): PortfolioItem[] => {
    const result: PortfolioItem[] = [];

    collections.forEach((col) => {
      const imgs = collectionImages[col.id] || [];

      imgs.forEach((img) => {
        result.push({
          id: img.id,
          image: normalizeImageUrl(img.collection_img),
          desc: col.collec_name,
          collectionId: col.id,
        });
      });
    });

    return result;
  };

  const fullPortfolio = buildPortfolioFromApi();

  const filteredPortfolio: PortfolioItem[] =
    filter === "all"
      ? fullPortfolio
      : fullPortfolio.filter((item) => item.collectionId === filter);

  const visiblePortfolio = filteredPortfolio.slice(0, visibleCount);

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + itemsPerLoad);
  };

  const handleCardClick = (item: PortfolioItem) => {
    setModalContent(
      <div>
        <Image
          src={item.image}
          alt={item.desc}
          className="w-full h-auto mb-4"
        />
        <p className="text-center">{item.desc}</p>
      </div>
    );
    setOpenModal(true);
  };

  // ------------------- Standard Production (ใช้ API + local image map) -------------------

  // map ชื่อจาก backend → กลุ่มรูป local
  const standardImageMap: Record<string, { src: string; alt: string }[]> = {
    TOP: [
      { src: product1, alt: "TOPS - เสื้อยืดแฟชั่น" },
      { src: product4, alt: "TOPS - เสื้อเชิ้ตลำลอง" },
    ],
    PANTS: [
      { src: product2, alt: "PANTS - กางเกงยีนส์" },
      { src: product5, alt: "PANTS - กางเกงชิโน่" },
    ],
    SKIRT: [
      { src: product3, alt: "SKIRT - กระโปรงสั้น" },
      { src: product6, alt: "SKIRT - กระโปรงยาว" },
    ],
    DRESSES: [
      { src: product7, alt: "DRESSES - เดรสลำลอง" },
      { src: product8, alt: "DRESSES - เดรสงานเลี้ยง" },
    ],
  };

  // แปลงจาก API → StandardItem ที่ UI ใช้
  const standardProductionItems: StandardItem[] = standardProducts.map(
    (prod) => {
      const key = (prod.standname ?? "").toUpperCase(); // <-- ป้องกัน null
      const normalizedKey = key === "DERESSES" ? "DRESSES" : key;

      return {
        id: prod.id,
        title: prod.standname ?? "Unnamed",
        title_th: prod.standname_th ?? "Unnamed",
        image: standardImageMap[normalizedKey] ?? [],
      };
    }
  );


  const handleOpenModalStandard = (step: StandardItem) => {
    setSelectedStandard(step);
    setOpenModalStandard(true);
  };

  const ContentProductStandard = selectedStandard?.image ? (
    <Carousel
      autoplay
      autoplaySpeed={5000}
      slidesToShow={1}
      slidesToScroll={1}
      dots
      arrows
    >
      {selectedStandard.image.map((img, idx) => (
        <div key={idx} className="flex justify-center items-center">
          <Image.PreviewGroup
            items={selectedStandard.image.map((x) => ({
              src: x.src,
              alt: x.alt,
            }))}
          >
            <Image src={API_URL + img.src} alt={img.alt} />
          </Image.PreviewGroup>
          {img.alt && (
            <p className="text-center mt-2 text-muted-foreground">
              {img.alt}
            </p>
          )}
        </div>
      ))}
    </Carousel>
  ) : (
    <p className="text-center py-10 text-muted-foreground">
      {translations[lang].notFound}
    </p>
  );

  const standardCollapseItems: CollapseProps["items"] = [
    {
      key: "1",
      label: translations[lang].standard,

      children: (
        <div className="space-y-2">
          {standardProductionItems.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => navigate(`/gallorys/${cat.id}`)}
              className="block hover:text-primary"
            >
              {lang === "en" ? cat.title : cat.title_th}
            </button>
          ))}
        </div>
      ),
    },
  ];

  return (
    <>
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
            {translations[lang].collection}
          </h3>

          {/* Filter Buttons */}
          <div className="flex justify-center gap-3 mb-12 flex-wrap">
            {collections.map((collection) => (
              <Button
                key={collection.id}
                variant={filter === collection.id ? "default" : "outline"}
                onClick={() => {
                  setFilter(collection.id);
                  setVisibleCount(8);
                }}
              >
                {collection.collec_name}
              </Button>
            ))}
            <Button
              variant={filter === "all" ? "default" : "outline"}
              onClick={() => {
                setFilter("all");
                setVisibleCount(8);
              }}
            >
              {translations[lang].all}
            </Button>


          </div>

          {/* Loading text */}
          {loadingCollections && (
            <p className="text-center text-muted-foreground mb-6">
              {translations[lang].loading}
            </p>
          )}

          {/* Portfolio Grid */}
          {visiblePortfolio.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
              <Image.PreviewGroup
                preview={{
                  onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
                }}
              >
                {visiblePortfolio.map((item) => (

                  <Card
                    key={item.id}
                    // onClick={() => handleCardClick(item)}
                    className="group relative overflow-hidden aspect-[3/4] cursor-pointer hover:shadow-warm transition-smooth border hover:border-primary/50"
                  >

                    <Image
                      src={item.image}
                      alt={item.desc}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />

                    {/* <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-smooth">
                    <div className="text-center bg-background/90 px-6 py-3 rounded-lg shadow-warm">
                      <p className="text-foreground text-sm font-semibold">
                        {item.desc}
                      </p>
                    </div>
                  </div> */}
                  </Card>
                ))}
              </Image.PreviewGroup>
            </div>
          ) : (
            !loadingCollections && (
              <p className="text-center text-muted-foreground mb-6">
                {translations[lang].notFound}
              </p>
            )
          )}

          {/* Load More */}
          {!loadingCollections && visibleCount < filteredPortfolio.length && (
            <div className="text-center py-8">
              <Button size="lg" variant="default" onClick={handleLoadMore}>
                {translations[lang].more}
              </Button>
            </div>
          )}

          {!loadingCollections &&
            visiblePortfolio.length > 0 &&
            visibleCount >= filteredPortfolio.length && (
              <div className="text-center py-8 text-muted-foreground text-sm italic">
                {translations[lang].endload}
              </div>
            )}

          {/* Collapse Section - Standard Production */}
          <div className="text-center mt-6 mb-6">
            <Collapse size="large" items={standardCollapseItems} />
          </div>
        </div>
      </section >

      {/* Modal Collection */}
      < Modal
        centered
        open={openModal}
        onCancel={() => setOpenModal(false)}
        footer={null}
      >
        {modalContent}
      </Modal >

      {/* Modal Standard Production */}
      < Modal
        centered
        open={openModalStandard}
        onCancel={() => setOpenModalStandard(false)}
        footer={null}
      >
        {ContentProductStandard}
      </Modal >
    </>
  );
};

export default Products;
