import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { useState, useContext } from "react";
import { AiOutlineSearch } from 'react-icons/ai';
import axios from "axios";

import UserContext from "../../../parts/UserContext";
import RenderUserSearched from "./RenderUserSearched";

export default function Header() {
    const { user, setUser } = useContext(UserContext)
    const [boolean, setboolean] = useState(false);
    const [openSearchResults, setOpenSearchResults] = useState(false);
    const [usersFiltered, setUsersFiltered] = useState([]);

    const navigat = useNavigate()

    function logout() {
        localStorage.clear()
        setUser({})
        navigat('/');

    }

    function upDow() {
        setboolean(!boolean)
    }
    console.log(user)

    async function getUsersFiltered(usernameSearched){

        const body = {partOfUsername:usernameSearched};

        try {
            const res = await axios.get(`http://localhost:4000/users/search/${usernameSearched}`);
            setUsersFiltered(res.data)
        } catch(err) {
            console.error(err);
            alert("Erro ao carregar! Consulte os logs.")
        }
    }

    function openSearchBar(e){

        let usernameSearched = e.target.value;

        if (usernameSearched.length>=3){
            setOpenSearchResults(true);
            getUsersFiltered(usernameSearched);
        } else {
            setOpenSearchResults(false);
            setUsersFiltered([])
        }

    }

    /* return (
        <HeaderStyle boolean={boolean} >
            <h1 className="linkrTitle" >linkr</h1>
            <span onClick={upDow}>
                <div className="minBox">
                    {boolean ? <SlArrowUp className="icon" /> : <SlArrowDown className="icon" />}
                    <img src={user.pictureUrl} alt="idoso nervoso" className="profileIcon" ></img>
                    {boolean ? <div className={"scritBox"} onClick={()=>logout()} >
                        logout
                    </div> : ''}
                </div>
            </span>
        </HeaderStyle> */

    return ( openSearchResults ? 
        <HeaderStyle boolean={boolean}>
            <h1 className="linkrTitle" >linkr</h1>
            <Searchbar>
                <input placeholder="Search for people" onChange={openSearchBar} />
                <AiOutlineSearch class="searchIcon" />
                <ResultsSearchbar>
                    <RenderUserSearched usersFiltered={usersFiltered}/>
                </ResultsSearchbar>
            </Searchbar>
            <span onClick={upDow}>
                <div className="minBox">
                    {boolean ? <SlArrowUp className="icon" /> : <SlArrowDown className="icon" />}
                    <img src={user.pictureUrl} alt="idoso nervoso" className="profileIcon" ></img>
                    {boolean ? <div className={"scritBox"} onClick={()=>logout()} >
                        logout
                    </div> : ''}
                </div>
            </span>
        </HeaderStyle>
        :
        <HeaderStyle boolean={boolean}>
            <h1 className="linkrTitle" >linkr</h1>
            <Searchbar>
            <input placeholder="Search for people" onChange={openSearchBar} />
                <AiOutlineSearch class="searchIcon" />
            </Searchbar>
            <span onClick={upDow}>
                <div className="minBox">
                    {boolean ? <SlArrowUp className="icon" /> : <SlArrowDown className="icon" />}
                    <img src={user.pictureUrl} alt="idoso nervoso" className="profileIcon" ></img>
                    {boolean ? <div className={"scritBox"} onClick={()=>logout()} >
                        logout
                    </div> : ''}
                </div>
            </span>
        </HeaderStyle>

    )
};

const HeaderStyle = styled.div`
    height: 75px;
    width: 100%;
    background-color: #151515;
    display: flex;
    align-items: center;
    justify-content: space-between;
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    
.minBox{
    background: #151515 ;
    position: fixed;
    right: 0;
    top: 0;
    display: flex;
    justify-content: center ;
    align-items: center ;
    flex-wrap: wrap ;
    width: 150px ;
    height:${(props) => props.boolean ? "110px" : "75px"} ;
    border-radius: 0px 0px 0px 20px ;


}
.scritBox{
    font-family: 'Lato';
    font-style: normal;
    font-weight: 700;
    font-size: 17px;
    color: #FFFFFF;
}

span {
    color: ${(props) => !props.boolean ? "transparent" : "#FFFFFF"}  ;
    background: #151515 ;
}
.linkrTitle {
    font-family: 'Passion One', cursive;
    font-weight: 700;
    font-size: 49px;
    color: #ffffff;
    margin-left: 30px;
}
.profileIcon {
    height: 55px;
    width: 55px;
    margin-right: 30px;
    border-radius: 50%;
}
.icon {
    width: 30px ;
    height: 20px;
    color: #ffffff;
    margin: 15px;
}
`

const Searchbar = styled.div`

    position: relative;
    z-index: 1;

    input {
        width: 560px;
        height: 45px;
        font-size: 19px;
        font-weight: 400;
        font-family: 'Lato';
        padding-left: 15px;
        border-radius: 8px;
    }

    input::placeholder{
        color: background: #C6C6C6;
    }

    .searchIcon{
        color: #C6C6C6;
        height: 30px;
        width: 30px;
        position: absolute;
        right: 10px;
    }

`

const ResultsSearchbar = styled.div`

    position: absolute;
    padding-top: 40px;
    padding-bottom: 15px;
    top: 0;
    left: 0;
    z-index:-1;
    background-color: #E7E7E7;
    width: 560px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    
`