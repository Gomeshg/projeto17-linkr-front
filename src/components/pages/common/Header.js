import styled from "styled-components"
import { SlArrowDown } from 'react-icons/sl';

const profileIcon = "https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221"

export default function Header() {
    return (
        <HeaderStyle>
            <h1 className="linkrTitle" >linkr</h1>
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
    z-index: 1;
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