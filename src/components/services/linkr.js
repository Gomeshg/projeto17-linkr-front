import axios from "axios";

const BASE_URL = "";

function postLink(link) {
    const promise = axios.post(`${BASE_URL}/timeline`, link);
    return promise;
};

export {
    postLink,
};