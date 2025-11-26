import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface LoginInput {
    email: string;
    password: string;
}

export const login = async (loginInput: LoginInput) => {
    try {
        const response = await axios.post(`${API_URL}/users/login?email=${loginInput.email}&password=${loginInput.password}`);
        return response.data;
    } catch (error) {
        console.error("Login failed:", error);
        throw error;
    }
};  