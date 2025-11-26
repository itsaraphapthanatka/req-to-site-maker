import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface Professional {
    id: number;
    professional_image: string;
    professional_desc: string;
}

export const getProfessional = async () => {
    const response = await axios.get(`${API_URL}/professionalteam`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getProfessionalById = async (id: number) => {
    const response = await axios.get(`${API_URL}/professionalteam/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createProfessional = async (professional: Professional) => {
    const response = await axios.post(`${API_URL}/professionalteam`, professional, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateProfessional = async (id: number, professional: Professional) => {
    const response = await axios.put(`${API_URL}/professionalteam/${id}`, professional, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteProfessional = async (id: number) => {
    const response = await axios.delete(`${API_URL}/professionalteam/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadProfessionalImage = async (data: FormData) => {
    const response = await axios.post(`${API_URL}/professionalteam/upload-image/`, data, {
        headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const reorderProfessional = async (data: any) => {
    const response = await axios.put(`${API_URL}/professionalteam/reorder`, data, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}
