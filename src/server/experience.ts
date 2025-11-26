import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Experience {
    id: number;
    experience_image: string;
    experience_desc: string;
    position: number;
}

interface ExperienceResponse {
    id: number;
    img: string;
    experience_desc: string;
    position: number;
}

export const getExperience = async () => {
    const response = await axios.get<ExperienceResponse[]>(`${API_URL}/experience`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getExperienceById = async (id: number) => {
    const response = await axios.get(`${API_URL}/experience/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createExperience = async (experience: Experience) => {
    const response = await axios.post(`${API_URL}/experience`, experience, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateExperience = async (id: number, experience: Experience) => {
    const response = await axios.put(`${API_URL}/experience/${id}`, experience, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteExperience = async (id: number) => {
    const response = await axios.delete(`${API_URL}/experience/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadExperienceImage = async (data: FormData) => {
    const response = await axios.post(`${API_URL}/experience/upload-image/`, data, {
        headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const reorderExperience = async (data: any) => {
    const response = await axios.put(`${API_URL}/experience/reorder`, data, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}
