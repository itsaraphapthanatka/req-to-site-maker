import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Blog {
    id: number;
    title: string;
    content: string;
    img: string;
    blogsType: string;
    blogsStatus: string;
    createBy: string;
}

interface BlogResponse {
    id: number;
    title: string;
    content: string;
    blogsType: string;
    blogsStatus: string;
    img: string;
}

export const getBlog = async () => {
    const response = await axios.get<BlogResponse[]>(`${API_URL}/blogs`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getBlogById = async (id: number) => {
    const response = await axios.get<BlogResponse>(`${API_URL}/blogs/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createBlog = async (formData: FormData) => {
    const response = await axios.post<BlogResponse>(`${API_URL}/blogs/`, formData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
};



export const updateBlog = async (id: number, blog: Blog) => {
    const response = await axios.put<BlogResponse>(`${API_URL}/blogs/${id}`, blog, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteBlog = async (id: number) => {
    const response = await axios.delete<BlogResponse>(`${API_URL}/blogs/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadBlogImage = async (data: FormData) => {
    const response = await axios.post<BlogResponse>(`${API_URL}/blogs/upload-image/`, data, {
        headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const reorderBlog = async (data: any) => {
    const response = await axios.put<BlogResponse>(`${API_URL}/blogs/reorder`, data, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}
