import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Review {
    id: number;
    title: string;
    title_th: string;
    desc: string;
    desc_th: string;
    reviewstatus: string;
    src: string;
    position: string;

}



interface ReviewResponse {
    data: Review[];
}

export const getReview = async () => {
    const response = await axios.get(`${API_URL}/reviews`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getReviewById = async (id: number) => {
    const response = await axios.get(`${API_URL}/reviews/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createReview = async (review: Review) => {
    const response = await axios.post(`${API_URL}/reviews`, review, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateReview = async (id: number, review: Review) => {
    const response = await axios.put<ReviewResponse>(`${API_URL}/reviews/${id}`,
        {
            title: review.title,
            title_th: review.title_th,
            desc: review.desc,
            desc_th: review.desc_th,
            reviewstatus: review.reviewstatus,
            src: review.src,
            position: 0,
            editBy: "admin",
            editAt: new Date().toISOString(),
        },
        {
            headers: {
                "Content-Type": "application/json",
            },
        });
    return response.data;
}

export const deleteReview = async (id: number) => {
    const response = await axios.delete(`${API_URL}/reviews/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}
