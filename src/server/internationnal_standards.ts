import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface InternationalStandard {
    id: number;
    internationnal_image: string;
    internationnal_desc: string;
}

export const getInternationalStandard = async () => {
    const response = await axios.get(`${API_URL}/internationnal`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getInternationalStandardById = async (id: number) => {
    const response = await axios.get(`${API_URL}/internationnal/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createInternationalStandard = async (internationalStandard: InternationalStandard) => {
    const response = await axios.post(`${API_URL}/internationnal`, internationalStandard, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateInternationalStandard = async (id: number, internationalStandard: InternationalStandard) => {
    const response = await axios.put(`${API_URL}/internationnal/${id}`, internationalStandard, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteInternationalStandard = async (id: number) => {
    const response = await axios.delete(`${API_URL}/internationnal/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadInternationalStandardImage = async (data: FormData) => {
    const response = await axios.post(`${API_URL}/internationnal/upload-image/`, data, {
        headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const reorderInternationalStandard = async (data: any) => {
    const response = await axios.put(`${API_URL}/internationnal/reorder`, data, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}
