import axios from "axios";

const BASE_URL = "http://localhost:4000";

function postLink(link) {
    const promise = axios.post(`${BASE_URL}/timeline`, link);
    return promise;
};

function getLink() {
    const promise = axios.get(`${BASE_URL}/timeline`);
    return promise;
};

export {
    postLink,
    getLink
};