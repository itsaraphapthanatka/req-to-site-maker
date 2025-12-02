import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, Col, Row } from "antd";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import tops from "@/assets/product-tops.jpg";
import pants from "@/assets/product-pants.jpg";
import skirts from "@/assets/product-skirts.jpg";
import dresses from "@/assets/product-dresses.jpg";
import { useLang } from "@/context/LanguageContext";
import { getStandard_product_set, getStandard_product_set_detail } from "@/server/collection";

const API_URL = import.meta.env.VITE_API_URL;

interface StandardProductSet {
    id: number;
    standid: number;
    standsetname: string;
    standsetname_th: string;
    standsetdesc: string;
    standsetdesc_th: string;
    standsetimg: string | null;
}

const GalloryDetail = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const { lang } = useLang(); // ✅ แก้ตรงนี้
    const [standardProductSet, setStandardProductSet] = useState<StandardProductSet[]>([]);
    const [loading, setLoading] = useState(false);
    const [detailImages, setDetailImages] = useState<Record<number, string>>({});
    const standId = id ? parseInt(id, 10) : NaN;

    // const defaultImageByStandId: Record<number, string> = {
    //     1: tops,
    //     2: pants,
    //     3: skirts,
    //     4: dresses,
    // };

    const standTitleMap: Record<number, string> = {
        1: "TOP",
        2: "PANTS",
        3: "SKIRT",
        4: "DRESSES",
    };

    const fetchDetailImages = async (sets: StandardProductSet[]) => {
        const results: Record<number, string> = {};

        for (const set of sets) {
            try {
                const res = await getStandard_product_set_detail(set.standid, set.id);
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
            const arr: StandardProductSet[] = Array.isArray(response) ? response : [response];
            setStandardProductSet(arr);
            return arr;
        } catch (err) {
            console.error("Error fetching standard product set:", err);
            return [];
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStandardProductSet().then((arr) => {
            const filtered = arr.filter((item) => item.standid === standId);
            fetchDetailImages(filtered);
        });
    }, [standId]);

    const filteredSets = standardProductSet.filter((item) => item.standid === standId);
    const pageTitle = standTitleMap[standId] ?? (lang === "en" ? "Standard Product" : "สินค้ามาตรฐาน");

    const { Meta } = Card;

    const handleReadMore = (standid: number, setId: number) => {
        navigate(`/gallorydetail/${standid}/${setId}`);
    };

    if (!loading && (Number.isNaN(standId) || filteredSets.length === 0)) {
        return (
            <div>
                <Navbar />
                <section className="pt-32 pb-16 text-center">
                    <h1 className="text-4xl font-bold mb-6">404</h1>
                    <p className="text-lg mb-4">Oops! Page not found</p>
                    <p className="text-base text-gray-600">
                        {lang === "en"
                            ? "The gallery you're looking for doesn't exist."
                            : "ไม่พบหน้ากลุ่มสินค้าที่คุณค้นหา"}
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
                        {lang === "en" ? "Loading..." : "กำลังโหลดข้อมูล..."}
                    </p>
                )}

                <Row gutter={[16, 16]} className="container-custom px-4 md:px-8 mx-auto">
                    {filteredSets.map((set) => {
                        const mainImg = detailImages[set.id]
                            ? detailImages[set.id]
                            : set.standsetimg
                                ? API_URL + set.standsetimg
                                : "";

                        return (
                            <Col key={set.id} xs={24} sm={12} md={8} lg={6} xl={6}>
                                <div className="mb-8">
                                    <Card
                                        hoverable
                                        style={{ width: "100%" }}
                                        onClick={() => handleReadMore(set.standid, set.id)}
                                        cover={
                                            <div style={{ position: "relative", width: "100%", overflow: "hidden" }}>
                                                {mainImg ? (
                                                    <img draggable={false} alt={set.standsetname} src={mainImg} />
                                                ) : (
                                                    <div style={{ height: 250, background: "#f0f0f0" }} />
                                                )}
                                            </div>
                                        }
                                    >
                                        <Meta
                                            title={lang === "en" ? set.standsetname : set.standsetname_th}
                                            description={pageTitle}
                                        />
                                    </Card>

                                </div>
                            </Col>
                        );
                    })}
                </Row>
            </section>
            <Footer />
        </div>
    );
};

export default GalloryDetail;
