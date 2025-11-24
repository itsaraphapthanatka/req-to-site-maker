import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface User {
    id: number;
    uname: string | null;
    upass: string | null;
    email: string | null;
    ustatus: string | null;
    createuser: string | null;
    createdate: string | null;
    edituser: string | null;
    editdate: string | null;
    deluser: string | null;
    deldate: string | null;
}

interface DeleteUserResponse {
    detail: string;
}

if (!API_URL) {
    throw new Error("VITE_API_URL is not defined");
}
export const getUsers = async () => {
    const response = await axios.get(`${API_URL}/users`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createUser = async (user: User) => {
    const response = await axios.post(`${API_URL}/users`,
        {
            email: user.email,
            password: user.upass,
            username: user.uname,
            status: user.ustatus,
            createuser: sessionStorage.getItem('userEmail'),
            createdate: new Date().toISOString(),
        },
        {
            headers: {
                "accept": "application/json",
            },
        });
    return { data: response.data, status: response.status };
}

export const getUserById = async (id: number) => {
    const response = await axios.get(`${API_URL}/users/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const editUser = async (id: number, user: User) => {
    const response = await axios.put<User>(`${API_URL}/users/${id}`,
        {
            email: user.email,
            password: user.upass,
            username: user.uname,
            status: user.ustatus,
            edituser: sessionStorage.getItem('userEmail'),
            editdate: new Date().toISOString(),
        },
        {
            headers: {
                "accept": "application/json",
            },
        });
    return { data: response.data, status: response.status };
}

export const deleteUser = async (id: number) => {
    const response = await axios.delete<DeleteUserResponse>(`${API_URL}/users/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

