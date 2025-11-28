import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface odmService {
    id: number;
    name: string;
    name_th: string;
}

export const getOdmService = async () => {
    const response = await axios.get(`${API_URL}/odm`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const addOdmService = async (data: odmService) => {
    const response = await axios.post(`${API_URL}/odm`,
        {
            name: data.name,
            name_th: data.name_th,
        },
        {
            headers: {
                "accept": "application/json",
            },
        });
    return response.data;
}

export const editOdmService = async (data: odmService) => {
    const response = await axios.put(`${API_URL}/odm/${data.id}`,
        {
            name: data.name,
        },
        {
            headers: {
                "accept": "application/json",
            },
        });
    return { data: response.data, status: response.status };
}

export const deleteOdmService = async (id: number) => {
    const response = await axios.delete(`${API_URL}/odm/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getOdmServiceById = async (id: number) => {
    const response = await axios.get(`${API_URL}/odm/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getOdmServiceDetail = async (id: number) => {
    const response = await axios.get(`${API_URL}/odm_detail/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadOdmServiceImage = async (odmId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
        `${API_URL}/odm_detail/upload-image/?odm_id=${odmId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};


export const deleteOdmServiceDetail = async (id: number) => {
    const response = await axios.delete(`${API_URL}/odm_detail/odm_detail/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return { data: response.data, status: response.status };
}

export const updateOdmServiceOrder = async (odmId: number, orderIds: number[]) => {
    const response = await axios.put(`${API_URL}/odm_detail/reorder/?odm_id=${odmId}`, {
        orderIds,
    }, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

interface oemService {
    id: number;
    name: string;
    name_th: string;
}

export const getOemService = async () => {
    const response = await axios.get(`${API_URL}/oem`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const addOemService = async (data: oemService) => {
    const response = await axios.post(`${API_URL}/oem`,
        {
            name: data.name,
            name_th: data.name_th,
        },
        {
            headers: {
                "accept": "application/json",
            },
        });
    return response.data;
}

export const editOemService = async (data: oemService) => {
    const response = await axios.put(`${API_URL}/oem/${data.id}`,
        {
            name: data.name,
        },
        {
            headers: {
                "accept": "application/json",
            },
        });
    return { data: response.data, status: response.status };
}

export const deleteOemService = async (id: number) => {
    const response = await axios.delete(`${API_URL}/oem/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getOemServiceById = async (id: number) => {
    const response = await axios.get(`${API_URL}/oem/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const getOemServiceDetail = async (id: number) => {
    const response = await axios.get(`${API_URL}/oem_detail/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const uploadOemServiceImage = async (oemId: number, file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
        `${API_URL}/oem_detail/upload-image/?oem_id=${oemId}`,
        formData,
        {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        }
    );

    return response.data;
};

export const deleteOemServiceDetail = async (id: number) => {
    const response = await axios.delete(`${API_URL}/oem_detail/oem_detail/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return { data: response.data, status: response.status };
}

export const updateOemServiceOrder = async (oemId: number, orderIds: number[]) => {
    const response = await axios.put(`${API_URL}/oem_detail/reorder/?oem_id=${oemId}`, {
        orderIds,
    }, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateOemServiceOrderTable = async (orderIds: number[]) => {
    const response = await axios.put(`${API_URL}/oem/reorder/`, {
        orderIds,
    }, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}
export const updateOdmServiceOrderTable = async (orderIds: number[]) => {
    const response = await axios.put(`${API_URL}/odm/reorder/`, {
        orderIds,
    }, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}
