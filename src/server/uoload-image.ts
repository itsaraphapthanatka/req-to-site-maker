import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface UploadImageResponse {
    data: {
        url: string;
    };
}

export const uploadImage = async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const res = await axios.post<UploadImageResponse>(`${API_URL}/upload/upload-image/`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
    });

    return res.data;
};
