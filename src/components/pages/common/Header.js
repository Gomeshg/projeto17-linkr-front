import styled from "styled-components"
import { useNavigate } from "react-router-dom";
import { SlArrowDown, SlArrowUp } from 'react-icons/sl';
import { useState, useContext } from "react";
import UserContext from "../../../parts/UserContext";


export default function Header() {
    const { user, setUser } = useContext(UserContext)
    const [boolean, setboolean] = useState(false);

    const navigat = useNavigate()

    function logout() {
        localStorage.clear()

        navigat('/');

    }

    function upDow() {
        setboolean(!boolean)
    }
    console.log(user)

    return (
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