import styled from "styled-components";
import { AiOutlineHeart } from 'react-icons/ai';
// import urlMetaData from "url-metadata";
import { useEffect } from "react";

const objetoPTesteUsuario = {
    username: "Juvencio",
    userPicture: "https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221"
};
const objetoPTesteLink = {
    url: "https://www.figma.com/file/EzaDbiWc5y0qb8idmXQt0V/linkr-T4?node-id=5390%3A66",
    text: "Patati patata olha o link desse figma maneiroaaaaaaaaaaaaaaaaaaaaa asdasdasd asdasd adqwd as wwdas dqwd qwdqw dawdads qwdq wdas dqwdqwdqwdq wdasdawda w",
    likes: 123
}

export default function TimelineLinks() {

    return (
        <TimelineLinksStyle>
            <div className="userIconNLikesColumn">
                <img src={objetoPTesteUsuario.userPicture} alt="idoso nervoso" className="profileIcon" ></img>
                <h3><AiOutlineHeart className="icon" /></h3>
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