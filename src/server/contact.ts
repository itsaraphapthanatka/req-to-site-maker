import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Contact {
    id: number;
    factoryAddress: string;
    factoryAddress_th: string;
    phone: string;
    email: string;
    workinghour: string;
    workinghour_th: string;
    facebook: string;
    instagram: string;
    x_twitter: string;
    youtube: string;
    line: string;
    tiktok: string;
    googlemap: string;
    linkedin: string;
    wechat: string;
}

interface ContactResponse {
    data: Contact[];
}

export const getContact = async () => {
    const response = await axios.get(`${API_URL}/contact`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const createContact = async (contact: Contact) => {
    const response = await axios.post(`${API_URL}/contact`, contact, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const updateContact = async (id: number, contact: Contact) => {
    const response = await axios.put<ContactResponse>(`${API_URL}/contact/${id}`, {
        factoryAddress: contact.factoryAddress,
        factoryAddress_th: contact.factoryAddress_th,
        phone: contact.phone,
        email: contact.email,
        workinghour: contact.workinghour,
        workinghour_th: contact.workinghour_th,
        facebook: contact.facebook,
        instagram: contact.instagram,
        x_twitter: contact.x_twitter,
        youtube: contact.youtube,
        line: contact.line,
        tiktok: contact.tiktok,
        googlemap: contact.googlemap,
        linkedin: contact.linkedin,
        wechat: contact.wechat
    }, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}

export const deleteContact = async (id: number) => {
    const response = await axios.delete(`${API_URL}/contact/${id}`, {
        headers: {
            "accept": "application/json",
        },
    });
    return response.data;
}
