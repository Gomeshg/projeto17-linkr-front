import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import mql from "@microlink/mql";
import { useEffect, useState } from "react";

export default function TimelineLinks(links) {
    const [metadata, setMetadata] = useState({});

    useEffect(
        () =>
          async function getMetadata() {
            const { status, data, response } = await mql(links.links.url);
            console.log(data);
            setMetadata(data);
          },
        [links.links.url]
    );

    return (
        <TimelineLinksStyle>
            <div className="userIconNLikesColumn">
                <img src={links.links.pictureUrl} alt="idoso nervoso" className="profileIcon" ></img>
                <h3><AiOutlineHeart className="icon" /></h3>
                {/* <h3><AiFillHeart className="icon" /></h3> */}
                <h3 className="likes">{links.links.likes} likes</h3>
            </div>

            <div>
                <h2 className="username" >{links.links.userName}</h2>
                <h3>{links.links.text}</h3>
                <a href={links.links.url} target="_blank" rel="noopener noreferrer" className="metadataBox" >
                    <div className="metadataInfo">
                        <h1 className="metadataTitle">{metadata.title}</h1>
                        <span className="metadataSpan">{metadata.description}</span>
                        <h4 className="metadataUrl">{metadata.url}</h4>
                    </div>
                    <img src={metadata.image?.url} alt="" className="metadataImage" />
                </a>
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
    word-wrap: break-word;
    overflow: auto;
    
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
.metadataBox {
    width: 500px;
    height: 155px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 1px solid #4D4D4D;
    border-radius: 11px;
    display: flex;
    box-sizing: border-box;
    justify-content: space-between;
    align-items: center;
}
.metadataInfo {
    display: inline-block;
    padding: 15px;
}
.metadataTitle {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #cecece;
    padding-bottom: 15px;
}
.metadataSpan {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #9B9595;
}
.metadataUrl {
    font-family: 'Lato', sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #cecece;
    word-break: break-all;
    padding-top: 15px;
}
.metadataImage {
    width: 155px;
    height: 155px;
    border-radius: 0px 12px 13px 0px;
    margin-left: 10px;
}
`;