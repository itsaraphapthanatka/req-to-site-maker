import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Col, Row } from "antd";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import tops from "@/assets/product-tops.jpg";
import pants from "@/assets/product-pants.jpg";
import skirts from "@/assets/product-skirts.jpg";
import dresses from "@/assets/product-dresses.jpg";

import { getStandard_product_set, getStandard_product_set_detail } from "@/server/collection";
const API_URL = import.meta.env.VITE_API_URL;
interface StandardProductSet {
    id: number;
    standid: number;          // 👈 แก้เป็น number ให้ตรงกับ response จริง
    standsetname: string;
    standsetdesc: string;     // มี HTML
    standsetimg: string | null;
}

const API_BASE_URL = ""; // ถ้า backend อยู่คนละโดเมน ใส่ base url ตรงนี้ เช่น "https://api.yourdomain.com"

const GalloryDetail = () => {
    const { id } = useParams<{ id: string }>(); // id = standid
    const navigate = useNavigate();

    const [standardProductSet, setStandardProductSet] = useState<StandardProductSet[]>([]);
    const [loading, setLoading] = useState(false);
    const [detailImages, setDetailImages] = useState<Record<number, string>>({});
    const standId = id ? parseInt(id, 10) : NaN;

    const normalizeImageUrl = (path: string | null) => {
        if (!path) return "";
        if (path.startsWith("http://") || path.startsWith("https://")) return path;
        return API_URL ? `${API_URL}${path}` : path;
    };

    const defaultImageByStandId: Record<number, string> = {
        1: tops,
        2: pants,
        3: skirts,
        4: dresses,
    };

    const standTitleMap: Record<number, string> = {
        1: "TOP",
        2: "PANTS",
        3: "SKIRT",
        4: "DERESSES",
    };

    const fetchDetailImages = async (sets: StandardProductSet[]) => {
        const results: Record<number, string> = {};

        for (const set of sets) {
            try {
                const res = await getStandard_product_set_detail(set.standid, set.id);

                // หา record ที่ s_set_chk_main == 1
                const main = (res as any).find((item: any) => item.s_set_chk_main === 1);

                if (main?.s_set_img) {
                    results[set.id] = API_URL + main.s_set_img;
                }
            } catch (e) {
                console.error("detail error:", e);
            }
        }

        setDetailImages(results);
    };


    const fetchStandardProductSet = async () => {
        try {
            setLoading(true);
            const response = await getStandard_product_set();
            const arr: StandardProductSet[] = Array.isArray(response)
                ? response
                : [response];

            setStandardProductSet(arr);
            return arr; // 👈 เพิ่ม return
        } catch (err) {
            console.error("Error fetching standard product set:", err);
            return [];
        } finally {
            setLoading(false);
        }
    };


    useEffect(() => {
        fetchStandardProductSet().then((arr) => {
            // filter เฉพาะ set ที่เป็น standId เดียวกับหน้า
            const filtered = arr.filter((item) => item.standid === standId);
            fetchDetailImages(filtered);
        });
    }, []);


    // filter ตาม standid (id จาก url)
    const filteredSets = standardProductSet.filter(
        (item) => item.standid === standId
    );

    const pageTitle = standTitleMap[standId] ?? "Standard Product";

    const { Meta } = Card;

    const handleReadMore = (standid: number, setId: number) => {
        // ยังใช้โครง URL เดิม: /gallorydetail/:postId/:itemId
        navigate(`/gallorydetail/${standid}/${setId}`);
    };

    // ถ้า id ไม่ใช่เลข หรือไม่มีข้อมูล และโหลดเสร็จแล้ว → 404
    if (!loading && (Number.isNaN(standId) || filteredSets.length === 0)) {
        return (
            <div>
                <Navbar />
                <section className="pt-32 pb-16 text-center">
                    <h1 className="text-4xl font-bold mb-6">404</h1>
                    <p className="text-lg mb-4">Oops! Page not found</p>
                    <p className="text-base text-gray-600">
                        The gallery you're looking for doesn't exist.
                    </p>
                </section>
                <Footer />
            </div>
        );
    }

    return (
        <div>
            <Navbar />
            <section className="pt-32 pb-16 text-center">
                <h1 className="text-4xl font-bold mb-6">{pageTitle}</h1>

                {loading && (
                    <p className="text-center text-gray-600 mb-6">
                        กำลังโหลดข้อมูล...
                    </p>
                )}

                {/* List รูปสินค้าในเซ็ต */}
                <Row
                    gutter={[16, 16]}
                    className="container-custom px-4 md:px-8 mx-auto"
                >
                    {filteredSets.map((set) => {
                        const fallbackImg = defaultImageByStandId[set.standid];
                        const mainImg = detailImages[set.id]
                            ? detailImages[set.id]                    // รูปหลักจาก detail
                            : API_URL + set.standsetimg || fallbackImg;

                        return (
                            <Col key={set.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                                <div className="mb-8">
                                    <Card
                                        hoverable
                                        style={{ width: "100%" }}
                                        onClick={() => handleReadMore(set.standid, set.id)}
                                        cover={
                                            <div
                                                style={{
                                                    position: "relative",
                                                    width: "100%",
                                                    // paddingBottom: "75%",
                                                    overflow: "hidden",
                                                }}
                                            >
                                                <img
                                                    draggable={false}
                                                    alt={set.standsetname}
                                                    src={mainImg}
                                                />
                                            </div>
                                        }
                                    >
                                        <Meta
                                            title={set.standsetname}
                                            description={pageTitle}
                                        />
                                    </Card>
                                </div>
                            </Col>
                        );
                    })}
                </Row>

                {/* เอา description ของตัวแรกมาโชว์ด้านล่าง (ถ้ามี) */}
                {/* {filteredSets[0]?.standsetdesc && (
                    <div className="mt-8 max-w-3xl mx-auto text-left">
                        <div
                            className="prose max-w-none"
                            // 👇 เพราะข้อความจาก API เป็น HTML
                            dangerouslySetInnerHTML={{
                                __html: filteredSets[0].standsetdesc,
                            }}
                        />
                    </div>
                )} */}
            </section>
            <Footer />
        </div>
    );
};

export default GalloryDetail;
