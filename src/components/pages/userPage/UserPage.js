import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../common/Header";
import RenderUserPosts from "./RenderUserPosts";
import Trendings from "../common/Trendings";

//const userInfo = {id:1, username: "Juvenal Juvencio", email: "juvenal@driven.com", passwordHash: "abc123", pictureUrl: "https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221",createDate: "2022-10-19 20:00:00"};

//const postsFiltered = [{id: 30, userId: 1, likes: 124, url: "https://google.com",text: "Google", createDate: "2022-10-30"}, {id: 8, userId: 1, likes: 201, url: "https://globo.com",text: "Globo.com", createDate: "2022-10-25"},{id: 2, userId: 1, likes: 155, url: "https://driven.com.br",text: "Driven", createDate: "2022-10-12"}]
//const postsFiltered = [];

//const postsFilteredExample = []

export default function UserPage() {

    const params = useParams();
    const id = params.id

    const [postsFiltered, setPostsFiltered] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    async function getUserInfo(){

        //quando atualiza a pag ta renderizando com array vazio em vez da resposta do axios
        //tentar ver como conseguir que retorne o array certinho
        //tem que alterar esses urls q tao diferentes do requisito

        try {
            const res = await axios.get(`http://localhost:4000/user/${id}`);
            console.log(res.data)
            setUserInfo(res.data)
            console.log(userInfo)
        } catch(err) {
            console.error(err);
            alert("Erro ao carregar! Consulte os logs.")
        }
    }

    async function getUserPosts(){

        //quando atualiza a pag ta renderizando com array vazio em vez da resposta do axios
        //tentar ver como conseguir que retorne o array certinho
        //tem que alterar esses urls q tao diferentes do requisito

        try {
            const res = await axios.get(`http://localhost:4000/posts/user/${id}`);
            console.log(res.data)
            setPostsFiltered(res.data)
        } catch(err) {
            console.error(err);
            alert("Erro ao carregar! Consulte os logs.")
        }
    }

    useEffect(()=>{
        getUserInfo();
        getUserPosts();
    },[])
    

    /* useEffect(() => {

        const id = 1;

        //quando atualiza a pag ta renderizando com array vazio em vez da resposta do axios
        //tentar ver como conseguir que retorne o array certinho
        //tem que alterar esses urls q tao diferentes do requisito

        axios.get(`http://localhost:4000/user/${id}`)
        .then(ans=> {
            console.log(ans.data.username)
            setUserInfo(ans.data)
            console.log(userInfo)
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao carregar! Consulte os logss.")
        })

        axios.get(`http://localhost:4000/posts/user/${id}`)
        .then(ans=> {
            setPostsFiltered(ans.data)
            console.log(postsFiltered)
        })
        .catch(err => {
            console.error(err);
            alert("Erro ao carregar! Consulte os logs.")
        })

    },[]); */
    

    return ( (postsFiltered.length===0) ?
        <TimelineScreen>
            <Header />
            <div className="pageTitle"> {(userInfo===[]) ? "" : userInfo.userName}'s posts </div>
            <div className="timelineBody">
                <div className="postsBody">
                    <NoPostsText>
                        There are no posts yet
                    </NoPostsText>
                </div>                
                <Trendings />
            </div>            
        </TimelineScreen>
        :
        <TimelineScreen>
            <Header />
            <div className="pageTitle"> {(userInfo===[]) ? "" : userInfo.userName}'s posts </div>
            <div className="timelineBody">
                <div className="postsBody">
                    <RenderUserPosts userInfo={userInfo} postsFiltered={postsFiltered}/>
                </div>                
                <Trendings />
            </div>
        </TimelineScreen>
    );
};

const TimelineScreen = styled.div`
/* Rules to specify families:
font-family: 'Lato', sans-serif;
font-family: 'Oswald', sans-serif;
font-family: 'Passion One', cursive;
 */
`;

const NoPostsText = styled.div`
    margin-top: 50px;
    padding-left: 20px;
    width: 611px;
    font-size: 30px;
    font-weight: 700;
    color: #FFFFFF;
`;