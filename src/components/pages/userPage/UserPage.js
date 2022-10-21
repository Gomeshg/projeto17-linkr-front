import styled from "styled-components";
import axios from 'axios';
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import Header from "../common/Header";
import RenderUserPosts from "./RenderUserPosts";
import Trendings from "../common/Trendings";

//Falta usar a middleware pra verificar se o usuario ta logado

export default function UserPage() {

    const params = useParams();
    const id = params.id

    const [postsFiltered, setPostsFiltered] = useState([]);
    const [userInfo, setUserInfo] = useState([]);

    async function getUserInfo(){

        try {
            const res = await axios.get(`http://localhost:4000/user/${id}`);
            setUserInfo(...res.data)
        } catch(err) {
            console.error(err);
            alert("Erro ao carregar! Consulte os logs.")
        }
    }

    async function getUserPosts(){

        try {
            const res = await axios.get(`http://localhost:4000/posts/user/${id}`);
            setPostsFiltered(...res.data)
        } catch(err) {
            console.error(err);
            alert("Erro ao carregar! Consulte os logs.")
        }
    }

    useEffect(()=>{
        getUserInfo();
        getUserPosts();
    },[])
    

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