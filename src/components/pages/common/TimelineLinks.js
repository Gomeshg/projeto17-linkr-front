import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from 'react-icons/ai';
import mql from "@microlink/mql";
import { useEffect, useState } from "react";
import { postDisLike, postLike } from "../../services/linkr";
import Tippy from '@tippyjs/react';
import 'tippy.js/dist/tippy.css'


export default function TimelineLinks(links) {
    const [likes, setLikes] = useState({});
    const [metadata, setMetadata] = useState({});

    const token = JSON.parse(localStorage.getItem('linkr'))
    let name = [];
    let tippName;

    useEffect(() => {

        tippiString()

    }, [])

    useEffect(
        () =>
          async function getMetadata() {
            const { status, data, response } = await mql(links.links.url);
            setMetadata(data);
          },
        [links.links.url]

    );


    function tippiString(sum) {


        name = likes.list ? likes.list.filter(value => value !== links.links.userName) : links.links.likeUser.filter(value => value !== links.links.userName)

        tippName = name.join(' e ') + ' and other x peoples'
        if (name.length === 1) {
            tippName =  name.join(' e ') + " like this"
        }
        if (name.length === 0) {
            tippName =  "like this" 
        }

        if (likes.list ? !likes.boolean : links.boolean) {
            name = likes.list ? likes.list.filter((value, i) => value !== links.links.userName && i < 2) : links.links.likeUser.filter((value, i) => value !== links.links.userName && i < 2)
            tippName = 'You , ' + name[0] + ' and other x peoples'

            if (name.length ===0 ) {
                tippName = 'You liked'
            }
        }

        setLikes({ ...likes, name: tippName, boolean: likes.list ? !likes.boolean : links.boolean , list: links.links.likeUser, cont: likes.list ? sum : Number(links.links.likes) })
    }

    function like() {
        console.log(links.links)
        postLike({
            id: links.links.id,
        },
            token.token
        ).catch((value) => console.log(value))
        tippiString(likes.cont + 1)
    }
    function dislike() {
        console.log(links.links)
        postDisLike({
            linkId: links.links.id
        },
            token.token
        ).catch((value) => console.log(value))
        tippiString(likes.cont - 1)
    }


    return (
        <TimelineLinksStyle>
            <div className="userIconNLikesColumn">
                <img src={links.links.pictureUrl} alt="idoso nervoso" className="profileIcon" ></img>
                {likes.boolean ? <h3 onClick={dislike} ><AiFillHeart className="icon" color="red" /></h3>
                    : <h3 onClick={like} ><AiOutlineHeart className="icon" /></h3>}
                <Tippy content={likes.name}>
                    <h3 className="likes" >{likes.list ? likes.cont : links.links.likes} likes</h3>
                </Tippy>
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