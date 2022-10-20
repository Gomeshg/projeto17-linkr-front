import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';

export default function RenderUserSearched({postsFiltered, userInfo}) {

    return postsFiltered.map(post=>
        <TimelineLinksStyle>
            <div className="userIconNLikesColumn">
                <img src={userInfo.pictureUrl} alt="user photo" className="profileIcon" ></img>
                <h3><AiOutlineHeart className="icon" /></h3>
                {/* <h3><AiFillHeart className="icon" /></h3> */}
                <h3 className="likes">{post.likes} likes</h3>
            </div>
            <div>
                <h2 className="username" >{userInfo.userName}</h2>
                <h3>{post.text}</h3>
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