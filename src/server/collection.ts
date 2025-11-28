import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Collection {
    id: number;
    collection_name: string;
    collection_name_th: string;
}

interface StandardResponse {
    id: number;
    standname: string;
    standname_th: string;
}

interface StandardSetResponse {
    id: number;
    standsetname: string;
    standsetname_th: string;

}

interface StandardSetResponse {
    id: number;
    standid: number;
    standsetname: string;
    standsetname_th: string;
    standsetdesc: string;
    standsetimg: string;

}

interface StandardSetResponse {
    id: number;
    standid: number;
    standsetname: string;
    standsetname_th: string;
    standsetdesc: string;
    standsetdesc_th: string;
    standsetimg: string;
    position: number;
}

interface StandardSetDetailResponse {
    id: number;
    s_set_id: number;
    s_set_title: string;
    s_set_title_th: string;
    s_set_desc: string;
    s_set_desc_th: string;
    s_set_chk_main: number;
    s_set_img: string;
}

export const getCollection = async () => {
    const response = await axios.get(`${API_URL}/collection`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getCollectionById = async (id: number) => {
    const response = await axios.get(`${API_URL}/collection/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createCollection = async (collection: Collection) => {
    const response = await axios.post(`${API_URL}/collection`, collection, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateCollection = async (id: number, collection: Collection) => {
    const response = await axios.put(`${API_URL}/collection/${id}`, collection, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteCollection = async (id: number) => {
    const response = await axios.delete(`${API_URL}/collection/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadCollectionImage = async (data: FormData) => {
    const response = await axios.post(`${API_URL}/collection/upload-image/`, data, {
        headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const reorderCollection = async (data: any) => {
    const response = await axios.put(`${API_URL}/collection/reorder`, data, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}


/// collection image
export const getCollectionImage = async (id: number) => {
    const response = await axios.get(`${API_URL}/collection_image/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadCollectionImageDetail = async (id: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(`${API_URL}/collection_image/?collection_id=${id}`, formData, {
        headers: {
            "accept": "application/json",
            "Content-Type": "multipart/form-data",
        },
    });
    return response.data;
}

export const updateCollectionImageOrder = async (id: number, orderIds: number[]) => {
    const response = await axios.put(`${API_URL}/collection_image/reorder/?collection_id=${id}`, { orderIds }, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteCollectionImage = async (id: number) => {
    const response = await axios.delete(`${API_URL}/collection_image/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

/// Standard product
export const getStandard_product = async () => {
    const response = await axios.get(`${API_URL}/standard_product`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getStandard_product_by_standard_id = async (id: number) => {
    const response = await axios.get<StandardResponse>(`${API_URL}/standard_product/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createStandard_product = async (standard_product: any) => {
    const response = await axios.post(`${API_URL}/standard_product`, standard_product, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateStandard_product = async (id: number, standard_product: any) => {
    const response = await axios.put(`${API_URL}/standard_product/${id}`, standard_product, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteStandard_product = async (id: number) => {
    const response = await axios.delete(`${API_URL}/standard_product/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

///// standard product Set
export const getStandard_product_set = async () => {
    const response = await axios.get<StandardSetResponse[]>(`${API_URL}/standardset/`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getStandard_product_set_by_id = async (id: number) => {
    console.log("getStandard_product_set_by_id", id);
    const response = await axios.get<StandardSetResponse>(`${API_URL}/standardset/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getStandard_product_set_by_standard_id = async (id: number) => {
    const response = await axios.get<StandardSetResponse[]>(`${API_URL}/standardset/standard/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createStandard_product_set = async (standard_product_set: any) => {
    console.log("standard_product_set", standard_product_set);
    const response = await axios.post(`${API_URL}/standardset/`, standard_product_set, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateStandard_product_set = async (id: number, standard_product_set: any) => {
    console.log("standard_product_set", standard_product_set);
    const response = await axios.put<StandardSetResponse>(`${API_URL}/standardset/${id}`, standard_product_set, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteStandard_product_set = async (id: number) => {
    const response = await axios.delete(`${API_URL}/standardset/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

// standard product set detail
export const getStandard_product_set_detail = async (id: number, standard_id: number) => {
    const response = await axios.get(`${API_URL}/standard_set_detail/standard_set?s_id=${id}&s_set_id=${standard_id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createStandard_product_set_detail = async (data: FormData) => {
    console.log("FormData values:");
    for (let pair of data.entries()) {
        console.log(pair[0], pair[1]);
    }

    const response = await axios.post(`${API_URL}/standard_set_detail/`, data, {
        headers: {
            "Accept": "application/json",
        },
    });

    return response.data;
};

export const deleteStandard_product_set_detail = async (id: number) => {
    const response = await axios.delete(`${API_URL}/standard_set_detail/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateStandard_product_set_main = async (id: number) => {
    const response = await axios.put(
        `${API_URL}/standard_set_detail/${id}`,
        { s_set_chk_main: 1 },   // ส่งค่าที่ backend ต้องการ
        {
            headers: {
                "accept": "application/json",
            },
        }
    );
    return response.data;
};



