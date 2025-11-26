import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

interface Contact {
    id: number;
    factoryAddress: string;
    phone: string;
    email: string;
    workinghour: string;
    facebook: string;
    instagram: string;
    x_twitter: string;
    youtube: string;
    line: string;
    tiktok: string;
    googlemap: string;
    linkedin: string;
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
        phone: contact.phone,
        email: contact.email,
        workinghour: contact.workinghour,
        facebook: contact.facebook,
        instagram: contact.instagram,
        x_twitter: contact.x_twitter,
        youtube: contact.youtube,
        line: contact.line,
        tiktok: contact.tiktok,
        googlemap: contact.googlemap,
        linkedin: contact.linkedin
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
