import axios from "axios";

const URL = "http://localhost:4000/";


function postCreat(obj){
    const promise = axios.post(`${URL}signup`,obj);
    return promise;
}

function postLogin(obj){
    const promise = axios.post(`${URL}signin`,obj);
    return promise;
}

// function postUrl(obj, token){
//     const promis = axios.post(`${URL}urls/shorten`, obj, token);
//     return promis;
// }

// function getRanking(){
//     const promise = axios.get(`${URL}ranking`);
//     return promise;    
// }


function getUserValidation(token){
    const header = { headers: { Authorization: `Bearer ${token}`} }
    const promise = axios.get(`${URL}signvalid`,header);
    return promise;    

}

// function deletShortly(id,token){
//     const promise = axios.delete(`${URL}urls/${id}`, token);
//     return promise;    
// }

// function getOpen(short){
//     const promise= axios.get(`${URL}urls/open/${short}`);
//     return promise
// }

export{  getUserValidation,  postLogin, postCreat };