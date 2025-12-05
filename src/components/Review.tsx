import React, { useState, useEffect } from 'react';
import { Layout, Typography, Table, Image, Form, Flex, Modal, Input, message, Card } from 'antd';
import { Button } from "@/components/ui/button";
import { useNavigate } from 'react-router-dom';
import { getReview, deleteReview } from '@/server/review';
import workshopImage from '@/assets/workshop.jpg';
import { PlusOutlined, PlayCircleOutlined } from '@ant-design/icons';
import { useLang } from "@/context/LanguageContext";
import VideoModal from './video_modal';


interface Review {
    id: number;
    title: string;
    title_th: string;
    desc: string;
    desc_th: string;
    src: string;
    reviewStatus: string;
    createBy: string;
}

const translations = {
    en: {
        title: "Testimonial",
        loading: "Loading...",
        notFound: "No reviews found.",
        more: "Load More",
    },
    th: {
        title: "คำวิจารณ์",
        loading: "กำลังโหลด...",
        notFound: "ไม่พบคำวิจารณ์",
        more: "โหลดเพิ่มเติม",
    },
};

const Review: React.FC = () => {
    const { lang } = useLang();
    const [reviews, setReviews] = useState<Review[]>([]);
    const [loading, setLoading] = useState(false);
    const [visibleCount, setVisibleCount] = useState(8);
    const [loadingCollections, setLoadingCollections] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedReview, setSelectedReview] = useState<Review | null>(null);
    const [form] = Form.useForm();
    const navigate = useNavigate();
    const API_URL = import.meta.env.VITE_API_URL;
    const fetchReview = async () => {
        setLoading(true);
        const response = await getReview();
        const item = Array.isArray(response) ? response : [];
        console.log(item);
        setReviews(item);
        setLoading(false);
    }
    useEffect(() => {
        fetchReview();
    }, []);
    const handleLoadMore = () => {
        setVisibleCount((prevCount) => prevCount + 8);
    };
    const handleCardClick = (item: Review) => {
        setSelectedReview(item);
        setModalVisible(true);
    };
    const handleModalClose = () => {
        setModalVisible(false);
        setSelectedReview(null);
    };
    return (
        <section id="testimonial" className="gradient-sunset relative py-24">
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
                    {translations[lang].title}
                </h3>


                {/* Loading text */}
                {loading && (
                    <p className="text-center text-muted-foreground mb-6">
                        {translations[lang].loading}
                    </p>
                )}

                {/* Portfolio Grid */}
                {reviews.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                        {reviews.map((item) => (

                            <Card
                                key={item.id}
                                className="group relative overflow-hidden aspect-[4/3] cursor-pointer hover:shadow-warm transition-smooth border hover:border-primary/50"
                                onClick={() => handleCardClick(item)}
                            >
                                {/* Media (Image / Video) Full Size */}
                                {item.src.endsWith(".mp4") ? (
                                    <video
                                        src={API_URL + item.src}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        muted
                                        playsInline
                                    />
                                ) : (
                                    <img
                                        src={API_URL + item.src}
                                        alt={item.desc}
                                        className="absolute inset-0 w-full h-full object-cover"
                                        loading="lazy"
                                    />
                                )}

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10" />

                                {/* Play button */}
                                <div className="absolute inset-0 flex items-center justify-center z-20">
                                    <div
                                        className="
                                            group-hover:bg-yellow-500/30
                                            transition-all duration-300
                                            rounded-full
                                            p-4
                                            shadow-lg
                                            transform group-hover:scale-110
                                        "
                                    >
                                        <PlayCircleOutlined
                                            style={{
                                                fontSize: "50px",
                                                color: "white",
                                                filter: "drop-shadow(0 0 6px rgba(0,0,0,0.6))",
                                            }}
                                        />
                                    </div>
                                </div>


                                {/* Title + Subtitle */}
                                <div
                                    className="absolute bottom-4 left-4 text-white z-30 max-w-[85%]"
                                >
                                    <p className="text-lime-300 font-bold leading-tight mb-2">
                                        {lang === "th" ? item.title_th : item.title}
                                    </p>

                                    <div
                                        className="text-sm text-gray-100 html-content"
                                        dangerouslySetInnerHTML={{
                                            __html: lang === "th" ? item.desc_th : item.desc,
                                        }}
                                    />
                                </div>

                            </Card>


                        ))}
                    </div>
                ) : (
                    !loading && (
                        <p className="text-center text-muted-foreground mb-6">
                            {translations[lang].notFound}
                        </p>
                    )
                )}

                {/* Load More */}
                {!loadingCollections && visibleCount < reviews.length && (
                    <div className="text-center py-8">
                        <Button size="lg" variant="default" onClick={handleLoadMore}>
                            {translations[lang].more}
                        </Button>
                    </div>
                )}



            </div>
            <div className="container mx-auto px-4 relative z-10">

                <VideoModal
                    open={modalVisible}
                    videoUrl={API_URL + (selectedReview?.src || "")}
                    onClose={handleModalClose}
                />
            </div>
        </section>
    );
};

export default Review;