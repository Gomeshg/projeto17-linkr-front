import axios from "axios";

const BASE_URL = "http://localhost:4000";

function postLink(link, postAuth) {
  const promise = axios.post(`${BASE_URL}/timeline`, link, postAuth);
  return promise;
}

function getLink() {
  const promise = axios.get(`${BASE_URL}/timeline`);
  return promise;
}

function postCreat(obj) {
  const promise = axios.post(`${BASE_URL}/signup`, obj);
  return promise;
}

function postLogin(obj) {
  const promise = axios.post(`${BASE_URL}/signin`, obj);
  return promise;
}

function getUserValidation(token){
    const header = { headers: { Authorization: `Bearer ${token}`} }
    const promise = axios.get(`${BASE_URL}/signvalid`,header);
    return promise;    
}

// function getUserValidation(token) {
//   const header = { headers: { Authorization: `Bearer ${token}` } };
//   const promise = axios.get(`${BASE_URL}/signvalid`, header);
//   return promise;
// }

function getTrending() {
  const promise = axios.get(`${BASE_URL}/trending`);
  return promise;
}

export {
  postLink,
  getLink,
  getUserValidation,
  postLogin,
  postCreat,
  getTrending,
};