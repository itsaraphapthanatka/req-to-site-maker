import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export interface Quote {
    id: number;
    name: string;
    email: string;
    phone: string;
    product_type: string;
    qty_size: string;
    addition_details: string;
}

export type CreateQuoteInput = Omit<Quote, 'id'>;

interface QuoteResponse {
    data: Quote[];
}

export const getQuote = async () => {
    const response = await axios.get(`${API_URL}/customer_request`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createQuote = async (quote: CreateQuoteInput) => {
    const response = await axios.post(`${API_URL}/customer_request`, quote, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateQuote = async (id: number, quote: Quote) => {
    const response = await axios.put<QuoteResponse>(`${API_URL}/customer_request/${id}`, quote, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteQuote = async (id: number) => {
    const response = await axios.delete(`${API_URL}/customer_request/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}   