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

function postUrl(obj, header){
    const promis = axios.post(`${URL}urls/shorten`, obj, header);
    return promis;
}

function getRanking(){
    const promise = axios.get(`${URL}ranking`);
    return promise;    
}


function getUserValidation(header){
    const promise = axios.get(`${URL}sign`,header);
    return promise;    

}

function deletShortly(id,header){
    const promise = axios.delete(`${URL}urls/${id}`, header);
    return promise;    
}

function getOpen(short){
    const promise= axios.get(`${URL}urls/open/${short}`);
    return promise
}

export{ getOpen, getUserValidation, getRanking, postUrl, postLogin, postCreat, deletShortly };