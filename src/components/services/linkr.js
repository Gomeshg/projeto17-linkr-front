import axios from "axios";

//const BASE_URL = "https://linkrs.herokuapp.com"
const BASE_URL = "http://localhost:4000";

function postLink(link, postAuth) {
  const promise = axios.post(`${BASE_URL}/timeline`, link, postAuth);
  return promise;
}

function getLink(token) {
    const header = { headers: { Authorization: `Bearer ${token}`}}
    const promise = axios.get(`${BASE_URL}/timeline`, header);
    return promise;
};

function deleteLink(linkId, postAuth) {
  const promise = axios.delete(`${BASE_URL}/deleteTimeline/${linkId}`, postAuth);
  return promise;
}

function updateLink(textEdited, linkId, postAuth) {
  const promise = axios.put(`${BASE_URL}/updateTimeline/${linkId}`, textEdited, postAuth);
  return promise;
}

function postCreat(obj){
    const promise = axios.post(`${BASE_URL}/signup`,obj);
    return promise;
}

function postLogin(obj) {
  const promise = axios.post(`${BASE_URL}/signin`, obj);
  return promise;
}

function postDisLike(body ,token){
    const header = { headers: { Authorization: `Bearer ${token}`} }
    const promise = axios.post(`${BASE_URL}/dislike`,body ,header);
    return promise;    
}

function postLike(body ,token){
    const header = { headers: { Authorization: `Bearer ${token}`} }
    const promise = axios.post(`${BASE_URL}/like`,body,header);
    return promise;    
}
function getUserValidation(token) {
  const header = { headers: { Authorization: `Bearer ${token}` } };
  const promise = axios.get(`${BASE_URL}/signvalid`, header);
  return promise;
}

function getTrending() {
  const promise = axios.get(`${BASE_URL}/trending`);
  return promise;
}

function getLinksFilteredByHashtag(hashtag) {
  const promise = axios.get(`${BASE_URL}/hashtag/${hashtag}`);
  return promise;
}

function getLinksFilteredByUser(token,userId) {
  const header = { headers: { Authorization: `Bearer ${token}`}}
  const promise = axios.get(`${BASE_URL}/userPosts/${userId}`, header);
  return promise;
};

function getUserName(token,userId) {
  const header = { headers: { Authorization: `Bearer ${token}`}}
  const promise = axios.get(`${BASE_URL}/userInfo/${userId}`, header);
  return promise;
};


export {
  postLike,
  postDisLike,
  postLink,
  getLink,
  deleteLink,
  updateLink,
  getUserValidation,
  postLogin,
  postCreat,
  getTrending,
  getLinksFilteredByHashtag,
  getLinksFilteredByUser,
  getUserName
};
