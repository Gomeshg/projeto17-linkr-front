import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
// import urlMetaData from "url-metadata";

const objetoPTesteUsuario = {
    username: "Juvencio",
    userPicture: "https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221"
};
const objetoPTesteLink = [{id: 30, userId: 1, likes: 124, url: "https://google.com",text: "Google", createDate: "2022-10-30"}, {id: 8, userId: 1, likes: 201, url: "https://globo.com",text: "Globo.com", createDate: "2022-10-25"},{id: 2, userId: 1, likes: 155, url: "https://driven.com.br",text: "Driven", createDate: "2022-10-12"}]

export default function TimelineLinks() {

    return (
        <TimelineLinksStyle>
            <div className="userIconNLikesColumn">
                <img src={objetoPTesteUsuario.userPicture} alt="idoso nervoso" className="profileIcon" ></img>
                <h3><AiOutlineHeart className="icon" /></h3>
                {/* <h3><AiFillHeart className="icon" /></h3> */}
                <h3 className="likes">{objetoPTesteLink.likes} likes</h3>
            </div>

            <div>
                <h2 className="username" >{objetoPTesteUsuario.username}</h2>
                <h3>{objetoPTesteLink.text}</h3>
            </div>
        </TimelineLinksStyle>
    );
};

const TimelineLinksStyle = styled.div`
    width: 600px;
    border-radius: 16px;
    background-color: #171717;
    color: #ffffff;

    display:flex;
    margin-top: 16px;
    padding: 15px;

.userIconNLikesColumn {
    width: 50px;
    margin-right: 15px;

    display: flex;
    flex-direction: column;
    align-items: center;
}
.profileIcon {
    height: 50px;
    width: 50px;
    margin-bottom: 20px;
    border-radius: 50%;
}
.icon {
    height: 25px;
    width: 25px;
}
.likes {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 11px;
}
.username {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 20px;
    margin-bottom: 7px;
}
.text {
    font-family: 'Lato', sans-serif;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 7px;
}
`;