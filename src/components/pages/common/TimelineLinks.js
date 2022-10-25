import styled from "styled-components";
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai";
import { BiTrash } from "react-icons/bi";
import { BsPencilSquare } from "react-icons/bs";
import mql from "@microlink/mql";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../../parts/UserContext";
import { postDisLike, postLike, deleteLink } from "../../services/linkr";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";
import { useNavigate } from "react-router-dom";

export default function TimelineLinks(links) {
  const { user, setUser } = useContext(UserContext);
  const [deleteLinkScreen, setDeleteLinkScreen] = useState(
    "whiteBackground hidden"
  );
  const [likes, setLikes] = useState({});
  const [metadata, setMetadata] = useState({});
  const [loading, setLoading] = useState(true);
  const token = JSON.parse(localStorage.getItem("linkr"));
  let name = [];
  let tippName;
  const navigate = useNavigate();
  async function getMetadata() {
    const { status, data, response } = await mql(links.links.url);
    setMetadata(data);
  }
  useEffect(() => {
    getMetadata();
  }, []);

  useEffect(() => {
    getMetadata();
    tippiString();
  }, []);
  function tippiString(sum) {
    name = likes.list
      ? likes.list.filter((value) => value !== links.links.userName)
      : links.links.likeUser.filter((value) => value !== links.links.userName);
    tippName = !name[1]
      ? name[0] + " and other x peoples"
      : name[0] + " , " + name[1] + " and other x peoples";
    if (name.length === 1) {
      tippName = name.join(" e ") + " like this";
    }
    if (name.length === 0) {
      tippName = "like this";
    }
    if (likes.list ? !likes.boolean : links.boolean) {
      name = likes.list
        ? likes.list.filter(
            (value, i) => value !== links.links.userName && i < 2
          )
        : links.links.likeUser.filter(
            (value, i) => value !== links.links.userName && i < 2
          );
      tippName = "You , " + name[0] + " , " + name[1] + " and other x peoples";

      if (name.length === 0) {
        tippName = "You liked";
      }
      if (name.length === 1) {
        tippName = "You , " + name[0] + " liked";
      }
    }
    setLikes({
      ...likes,
      name: tippName,
      boolean: likes.list ? !likes.boolean : links.boolean,
      list: links.links.likeUser,
      cont: likes.list ? sum : Number(links.links.likes),
    });
  }
  function like() {
    postLike(
      {
        id: links.links.id,
      },
      token.token
    ).catch((value) => console.log(value));
    tippiString(likes.cont + 1);
  }
  function dislike() {
    postDisLike(
      {
        linkId: links.links.id,
      },
      token.token
    ).catch((value) => console.log(value));
    tippiString(likes.cont - 1);
  }
  function openDeleteScreen() {
    setDeleteLinkScreen("whiteBackground");
  }
  function closeDeleteScreen() {
    setDeleteLinkScreen("whiteBackground hidden");
  }
  function deleteThisLink() {
    setLoading(false);
    const linkId = links.links.id;
    const postAuth = { headers: { Authorization: "Bearer " + token.token } };
    deleteLink(linkId, postAuth)
      .then(() => {
        window.location.reload(false);
      })
      .catch(() => {
        alert("Houve um erro ao deletar seu link");
      });
  }

  console.log(links);
  return (
    <TimelineLinksStyle>
      <div className={deleteLinkScreen}>
        {!loading ? (
          <div className="deleteBox">
            <h1 className="loading">Loading...</h1>
          </div>
        ) : (
          <div className="deleteBox">
            <h1 className="title">
              Are you sure you want to delete this post?
            </h1>
            <div className="buttons">
              <button className="button white" onClick={closeDeleteScreen}>
                No, go back
              </button>
              <button className="button blue" onClick={deleteThisLink}>
                Yes, delete it
              </button>
            </div>
          </div>
        )}
      </div>
      <div className="userIconNLikesColumn">
        <img
          onClick={() => navigate(`/user/${links.links.userId}`)}
          src={links.links.pictureUrl}
          alt="idoso nervoso"
          className="profileIcon"
        ></img>
        {likes.boolean ? (
          <h3 onClick={dislike}>
            <AiFillHeart className="icon" color="red" />
          </h3>
        ) : (
          <h3 onClick={like}>
            <AiOutlineHeart className="icon" />
          </h3>
        )}
        <Tippy content={likes.name}>
          <h3 className="likes">
            {likes.list ? likes.cont : links.links.likes} likes
          </h3>
        </Tippy>
      </div>
      <div>
        <div className="nameNIcons">
          <h2
            className="username"
            onClick={() => navigate(`/user/${links.links.userId}`)}
          >
            {links.links.userName}
          </h2>
          {links.links.userName === user.userName ? (
            <div>
              <BsPencilSquare className="miniIcon" />
              <BiTrash className="miniIcon" onClick={openDeleteScreen} />
            </div>
          ) : (
            ""
          )}
        </div>
        <h3>{links.links.text}</h3>
        <a
          href={links.links.url}
          target="_blank"
          rel="noopener noreferrer"
          className="metadataBox"
        >
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
}
const TimelineLinksStyle = styled.div`
  width: 600px;
  border-radius: 16px;
  background-color: #171717;
  color: #ffffff;
  display: flex;
  margin-top: 16px;
  padding: 15px;
  word-wrap: break-word;
  overflow: auto;
  .whiteBackground {
    display: flex;
    justify-content: center;
    height: 100vh;
    width: 100vw;
    background: #333333;
    position: fixed;
    left: 0;
    top: 0;
    overflow: auto;
    z-index: 2;
    background: rgba(255, 255, 255, 0.9);
  }
  .hidden {
    display: none;
  }
  .deleteBox {
    width: 600px;
    height: 260px;
    background: #333333;
    position: absolute;
    border-radius: 50px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-top: calc(50vh - 130px);
    padding: 60px;
    position: sticky;
    top: center;
    left: center;
  }
  .title {
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 34px;
    text-align: center;
    color: #ffffff;
    margin-bottom: 40px;
  }
  .button {
    width: 135;
    height: 40;
    border-radius: 5px;
    margin-left: 15px;
    margin-right: 15px;
    border-radius: 5px;
    border: none;
    padding: 5px 15px 5px 15px;
  }
  .blue {
    color: #ffffff;
    background-color: #1877f2;
  }
  .white {
    color: #1877f2;
    background-color: #ffffff;
  }
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
    cursor: pointer;
  }
  .icon {
    height: 25px;
    width: 25px;
    cursor: pointer;
  }
  .miniIcon {
    margin-left: 10px;
    height: 15px;
    width: 15px;
  }
  .likes {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 11px;
  }
  .username {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 20px;
    margin-bottom: 7px;
  }
  .text {
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 18px;
    margin-bottom: 7px;
  }
  .metadataBox {
    width: 500px;
    height: 155px;
    margin-top: 15px;
    margin-bottom: 15px;
    border: 1px solid #4d4d4d;
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
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 16px;
    color: #cecece;
    padding-bottom: 15px;
  }
  .metadataSpan {
    font-family: "Lato", sans-serif;
    font-weight: 400;
    font-size: 11px;
    color: #9b9595;
  }
  .metadataUrl {
    font-family: "Lato", sans-serif;
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
  .nameNIcons {
    display: flex;
    justify-content: space-between;
    cursor: pointer;
  }
  .loading {
    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 30px;
    color: #ffffff;
  }
`;
