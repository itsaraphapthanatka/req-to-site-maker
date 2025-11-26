import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Slide {
    id: number;
    slide_image: string;
    slide_desc: string;
}

export const getSlide = async () => {
    const response = await axios.get(`${API_URL}/slides`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getSlideById = async (id: number) => {
    const response = await axios.get(`${API_URL}/slides/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createSlide = async (slide: Slide) => {
    const response = await axios.post(`${API_URL}/slides`, slide, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateSlide = async (id: number, slide: FormData) => {
    const response = await axios.put<Slide>(`${API_URL}/slides/${id}`, slide, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const deleteSlide = async (id: number) => {
    const response = await axios.delete(`${API_URL}/slides/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadSlideImage = async (data: FormData) => {
    const response = await axios.post(`${API_URL}/slides/upload`, data, {
        headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const reorderSlide = async (data: any) => {
    const response = await axios.put(`${API_URL}/slides/reorder`, data, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}


