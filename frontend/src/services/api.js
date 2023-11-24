import axios from 'axios';

const BASE_URL = 'http://127.0.0.1:8000/api';

export const sendName = async (name) => {
    const url = `${BASE_URL}/hello/${name}/`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const sendFullSpeed = async (speed, acceleration) => {
    const url = `${BASE_URL}/car/speed/${speed}/acceleration/${acceleration}/`;

    try {
        const response = await axios.get(url);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const insertStudent = async (data) => {
    const url = `${BASE_URL}/students/`;

    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};

export const sendText = async (data) => {
    const url = `${BASE_URL}/text/lines/`;

    try {
        const response = await axios.post(url, data);
        return response.data;
    } catch (error) {
        console.error('Request error:', error);
        throw error;
    }
};
