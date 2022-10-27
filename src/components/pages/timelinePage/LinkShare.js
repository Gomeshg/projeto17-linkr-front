import { useState, useContext } from "react";
import styled from "styled-components";

import UserContext from "../../../parts/UserContext";
import {
  postLink,
  postHashtag,
  getLastHashtagId,
  getLastLinkId,
  relationateLinkWithHashtag,
} from "../../services/linkr";

import getHashtags from "../hashtagPage/getHashtags.js";
import { sleep } from "../../services/functions.js";

export default function LinkShare() {
  const { user, setUser } = useContext(UserContext);

  const [loading, setLoading] = useState(true);
  const [url, setUrl] = useState("");
  const [text, setText] = useState("");

  function validation() {
    const expression =
      /(([a-z]+:\/\/)?(([a-z0-9\-]+\.)+([a-z]{2}|aero|arpa|biz|com|coop|edu|gov|info|int|jobs|mil|museum|name|nato|net|org|pro|travel|local|internal))(:[0-9]{1,5})?(\/[a-z0-9_\-\.~]+)*(\/([a-z0-9_\-\.]*)(\?[a-z0-9+_\-\.%=&amp;]*)?)?(#[a-zA-Z0-9!$&'()*+.=-_~:@/?]*)?)(\s+|$)/gi;
    const regex = new RegExp(expression);

    if (text === "") {
      setText(null);
    }

    if (url.match(regex)) {
      return true;
    } else {
      alert("Please insert a valid link that you would like to share.");
    }
    return false;
  }

  function postUrl(e) {
    e.preventDefault();
    const validate = validation();
    const token = JSON.parse(localStorage.getItem("linkr"));
    const postAuth = { headers: { Authorization: "Bearer " + token.token } };

    const link = {
      url: url,
      text: text,
    };

    if (validate === true) {
      setLoading(false);
      let linkId;
      postLink(link, postAuth)
        .then((res) => {
          getLastLinkId(token.token)
            .then((res) => {
              linkId = res.data.rows[0].id;
              console.log(linkId);
            })
            .catch((e) => {
              alert("Erro do servidor");
            });

          const hashtags = getHashtags(link.text);
          hashtags.forEach(async (hashtag) => {
            await sleep(1000);
            postHashtag(hashtag, token.token)
              .then(() => {
                getLastHashtagId(token.token)
                  .then((res) => {
                    const hashtagId = res.data.rows[0].id;
                    console.log(hashtagId);
                    relationateLinkWithHashtag(linkId, hashtagId, token.token)
                      .then((res) => {})
                      .catch((e) => {
                        alert("Erro do servidor");
                      });
                  })
                  .catch((e) => {
                    alert("Erro do servidor!");
                  });
              })
              .catch((e) => {
                alert("Houve um erro para inserir as hashtags");
              });
          });

          // window.location.reload(false);
        })
        .catch((error) => {
          alert("Houve um erro ao publicar seu link");
        });
      setLoading(true);
    }
  }

  return (
    <LinkShareStyle>
      <div>
        <img
          src={user.pictureUrl}
          alt="idoso nervoso"
          className="profileIcon"
        ></img>
      </div>
      <div>
        <h2 className="shareTitle">What are you going to share today?</h2>
        <form onSubmit={postUrl} id="myForm">
          <input
            className="inputBar"
            placeholder="http://..."
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            disabled={loading ? "" : "disabled"}
          />

          <textarea
            className="inputBar bigInputBar"
            placeholder="url information over here..."
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={loading ? "" : "disabled"}
          />

          {loading ? (
            <button type="submit" className="button">
              Publish
            </button>
          ) : (
            <button className="button">Publishing...</button>
          )}
        </form>
      </div>
    </LinkShareStyle>
  );
}

const LinkShareStyle = styled.div`
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  border-radius: 16px;
  color: #707070;
  word-break: break-all;

  width: 600px;
  height: 200px;
  background-color: #ffffff;
  margin-bottom: 13px;
  padding: 15px;

  display: flex;
  margin-top: 16px;
  @media screen and (max-width: 900px) {
    width: 100%;
  }
  .profileIcon {
    height: 50px;
    width: 50px;
    margin-bottom: 20px;
    margin-right: 15px;
    border-radius: 50%;
  }
  .shareTitle {
    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 20px;
    margin-bottom: 5px;
  }
  .inputBar {
    width: 500px;
    height: 30px;
    border: none;
    border-radius: 5px;
    background: #efefef;
    margin: 5px 0 5px 0;

    font-family: "Lato", sans-serif;
    font-weight: 300;
    font-size: 15px;
    padding: 5px 15px 5px 15px;

    ::-webkit-input-placeholder {
      /* WebKit, Blink, Edge */
      color: #949494;
    }
    :-moz-placeholder {
      /* Mozilla Firefox 4 to 18 */
      color: #949494;
      opacity: 1;
    }
    ::-moz-placeholder {
      /* Mozilla Firefox 19+ */
      color: #949494;
      opacity: 1;
    }
    :-ms-input-placeholder {
      /* Internet Explorer 10-11 */
      color: #949494;
    }
    ::-ms-input-placeholder {
      /* Microsoft Edge */
      color: #949494;
    }

    ::placeholder {
      /* Most modern browsers support this now. */
      color: #949494;
    }
  }
  .bigInputBar {
    height: 65px;
  }
  .button {
    width: 115px;
    height: 30px;
    border: none;
    border-radius: 5px;
    margin-left: 385px;
    background-color: #1877f2;

    font-family: "Lato", sans-serif;
    font-weight: 700;
    font-size: 15px;
    color: #ffffff;
  }
`;
