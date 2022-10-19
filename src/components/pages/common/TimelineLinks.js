import styled from "styled-components";
import { AiOutlineHeart } from 'react-icons/ai'

const profileIcon = "https://img.r7.com/images/meme-sorriso-forcado-hide-the-pain-harold-maurice-andras-arato-08112019141226221"

export default function TimelineLinks() {
    return (
        <TimelineLinksStyle>
            <div className="userIconNLikesColumn">
                <img src={profileIcon} alt="idoso nervoso" className="profileIcon" ></img>
                <h3><AiOutlineHeart /></h3>
                <h3>123 likes</h3>
            </div>

            <div className="userNameNlinkColumn">
                <h2>Juvencios post</h2>
                <h3>Patati patata link maneiro</h3>
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
.profileIcon {
    height: 50px;
    width: 50px;
    margin-right: 30px;
    border-radius: 50%;
}
`;