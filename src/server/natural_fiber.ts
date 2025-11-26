import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface NaturalFiber {
    id: number;
    natural_fiber_image: string;
    natural_fiber_desc: string;
}

export const getNaturalFiber = async () => {
    const response = await axios.get(`${API_URL}/naturalfibers`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getNaturalFiberById = async (id: number) => {
    const response = await axios.get(`${API_URL}/naturalfibers/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createNaturalFiber = async (natural_fiber: NaturalFiber) => {
    const response = await axios.post(`${API_URL}/naturalfibers`, natural_fiber, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateNaturalFiber = async (id: number, natural_fiber: NaturalFiber) => {
    const response = await axios.put(`${API_URL}/naturalfibers/${id}`, natural_fiber, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteNaturalFiber = async (id: number) => {
    const response = await axios.delete(`${API_URL}/naturalfibers/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadNaturalFiberImage = async (data: FormData) => {
    const response = await axios.post(`${API_URL}/naturalfibers/upload-image/`, data, {
        headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const reorderNaturalFiber = async (data: any) => {
    const response = await axios.put(`${API_URL}/naturalfibers/reorder`, data, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}
