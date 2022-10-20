import styled from "styled-components"
import { SlArrowDown } from 'react-icons/sl';
import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from "react";


const profileIcon = "https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221"

export default function Header() {

    const [openSearchResults, setOpenSearchResults] = useState(false);

    function openSearchBar(e){

        let usernameSearched = e.target.value;

        if (usernameSearched.length>=3){
            setOpenSearchResults(true);
        } else {
            setOpenSearchResults(false);
        }

        console.log(usernameSearched);
        console.log(openSearchResults);

    }


    return ( openSearchResults ? 
        <HeaderStyle>
            <h1 className="linkrTitle" >linkr</h1>
            <Searchbar>
                <input placeholder="Search for people" onChange={openSearchBar} />
                <AiOutlineSearch class="searchIcon" />
                <ResultsSearchbar>
                    <UserListed>
                        <img src="https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221"/>
                        <h1>Fulano 1</h1>
                    </UserListed>
                    <UserListed>
                        <img src="https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221"/>
                        <h1>Fulano 2</h1>
                    </UserListed>
                </ResultsSearchbar>
            </Searchbar>
            <div>
                <SlArrowDown className="icon" />
                <img src={profileIcon} alt="idoso nervoso" className="profileIcon" ></img>
            </div>
        </HeaderStyle>
        :
        <HeaderStyle>
            <h1 className="linkrTitle" >linkr</h1>
            <Searchbar>
            <input placeholder="Search for people" onChange={openSearchBar} />
                <AiOutlineSearch class="searchIcon" />
            </Searchbar>
            <div>
                <SlArrowDown className="icon" />
                <img src={profileIcon} alt="idoso nervoso" className="profileIcon" ></img>
            </div>
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
    left: 0;
    top: 0;

div {
    display: flex;
    align-items: center;
    justify-content: space-between;
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
    height: 20px;
    color: #ffffff;
    margin-right: 10px;
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
    left:0;
    z-index: -1;
    background-color: #E7E7E7;
    width: 560px;
    display: flex;
    flex-direction: column;
    align-items: center;
    border-radius: 8px;
    }

`

const UserListed = styled.div`
    width: 530px;
    height: 40px;
    margin-top: 20px;
    display: flex;
    align-items: flex-start;
    justify-content: flex-start;
    position: relative;

    img{
        height: 40px;
        width: 40px;
        border-radius: 20px;
    }

    h1{
        font-size 19px;
        font-family: 'Lato';
        font-weight: 400;
        color: #515151;
        position: absolute;
        left: 60px;
    }
`