import axios from 'axios'
const url = "http://localhost:3000/api";


const getHeader = (token) => {
    return {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json',
    };
};

export const createEvent = async (token, data) => {

    const response = await axios.post(`${url}/event/create-event`, data, {
        headers: getHeader(token),
    });

    return response;
};

export const updateEvent = async (token, data, eventId) => {

    const response = await axios.put(`${url}/event/update-event/${eventId}`, data, {
        headers: getHeader(token),
    });

    return response;
};

export const deleteEvent = async (token, eventId) => {

    const response = await axios.delete(`${url}/event/delete-event/${eventId}`, {
        headers: getHeader(token),
    });

    return response;
};


export const getAllEvents = async (token) => {

    const response = await axios.get(`${url}/event/all-events`, {
        headers: getHeader(token),
    });

    return response;
};

export const getSingleEvent = async (token, eventId) => {

    const response = await axios.get(`${url}/event/single-event/${eventId}`, {
        headers: getHeader(token),
    });

    return response;
};

export const searchByQuery = async (token, query) => {

    const response = await axios.get(`${url}/event/search-events`, {
        headers: getHeader(token),
        params: {
            search: query
        }
    });

    return response;
};

export const makePaymentApi = async (token, data) => {

    const response = await axios.post(`${url}/event/buy-ticket/create-checkout-session`, data, {
        headers: getHeader(token),
    });

    return response;
};

export const paymentSuccessApi = async (token, eventId) => {

    const response = await axios.get(`${url}/event/buy-ticket/payment-sucess/${eventId}`, {
        headers: getHeader(token),
    });

    return response;
};

export const joinFreeEventApi = async (token, eventId) => {

    const response = await axios.get(`${url}/event/join/${eventId}`, {
        headers: getHeader(token),
    });

    return response;
};

export const userJoinedEventsApi = async (token) => {

    const response = await axios.get(`${url}/event/user-joined-events`, {
        headers: getHeader(token),
    });

    return response;
};

export const userOrganizedEventsApi = async (token) => {

    const response = await axios.get(`${url}/event/user-organized-events`, {
        headers: getHeader(token),
    });

    return response;
};