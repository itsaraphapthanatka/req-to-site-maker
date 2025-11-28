import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface About {
    id: number;
    desc: string;
    desc_th: string;
    founderName: string;
    founderName_th: string;
    founderDesc: string;
    founderDesc_th: string;
    founderImg: string;
    sec2Desc: string;
    sec2Desc_th: string;
    sec2Img: string;
    sec3Desc: string;
    sec3Desc_th: string;
    sec3img: string;
    sec3Experience: string;
    sec4Desc: string;
    sec4Desc_th: string;
    sec4img: string;
}

interface AboutResponse {
    data: About[];
}

export const getAbout = async () => {
    const response = await axios.get(`${API_URL}/about`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createAbout = async (about: About) => {
    const response = await axios.post(`${API_URL}/about`, about, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateAbout = async (id: number, about: About) => {
    const response = await axios.put<AboutResponse>(`${API_URL}/about/${id}`, about, {
        headers: {
            // "accept": "application/json",
            "Content-Type": "application/json",
        },
    });
    return response.data;
}

export const deleteAbout = async (id: number) => {
    const response = await axios.delete(`${API_URL}/about/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

