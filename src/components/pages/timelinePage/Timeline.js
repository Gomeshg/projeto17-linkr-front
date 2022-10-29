import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import { getAllFollow, getLink } from "../../services/linkr";

import LinkShare from "./LinkShare";
import Header from "../common/Header";
import TimelineLinks from "../common/TimelineLinks";
import Trendings from "../common/Trendings";
import useInterval from "use-interval";
import { AiFillAlert } from "react-icons/ai";
import UserContext from "../../../parts/UserContext";

export default function Timeline() {
  const { user, setUser } = useContext(UserContext);
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const [newLinks, setNewLinks] = useState(0);

  const token = JSON.parse(localStorage.getItem("linkr"));

  useInterval(() => {
    if (token) setUser({ ...user, ...token });

    getLink(token.token)
      .then((res) => {
        if (res.data[0]) {
          if (
            Date.parse(res.data[0].createDate) > Date.parse(links[0].createDate)
          )
            setNewLinks(
              res.data.length > links.length
                ? res.data.length - links.length
                : links.length - res.data.length
            );
        }
      })
      .catch(() => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
    getAllFollow(token.token, user.id)
      .then(({ data }) => {
        data.length > 0 || links.length > 0
          ? setLoading(false)
          : setLoading(true);
      })
      .catch((e) => console.error(e));
  }, 1500);

  async function reloading() {
    getLink(token.token)
      .then((res) => {
        setLoading(res.data.lenght === 0 ? true : false);
        setLinks(res.data);
      })
      .catch(() => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }
  useEffect(() => {
    reloading();
  }, []);

  return (
    <TimelineScreen>
      <Header />

      <div className="pageTitle"> timeline </div>

      <Content>
        <Left>
          <div className={"alert"}>
            {newLinks > 0 ? (
              <AiFillAlert
                className={"alertItem"}
                onClick={() => {
                  if (
                    window.confirm(
                      newLinks > 0
                        ? `you have ${newLinks} update`
                        : `you have ${newLinks} new updates`
                    )
                  ) {
                    setNewLinks(0);
                    reloading();
                  }
                }}
              />
            ) : (
              ""
            )}
          </div>
          <LinkShare />

          {loading ? (
            <h3 className="noLinks">
              You don't follow anyone yet. Search for new friends!
            </h3>
          ) : (
            [
              links.length === 0 ? (
                <h3 className="noLinks">No posts found from your friends</h3>
              ) : (
                links.map((links) => (
                  <TimelineLinks
                    links={links}
                    reloading={reloading}
                    boolean={links.boolean ? links.boolean : false}
                  />
                ))
              ),
            ]
          )}
        </Left>
        <Right>
          <Trendings />
        </Right>
      </Content>
    </TimelineScreen>
  );
}

const TimelineScreen = styled.div`
  /* Rules to specify families:
font-family: 'Lato', sans-serif;
font-family: 'Oswald', sans-serif;
font-family: 'Passion One', cursive;
 */

  .noLinks {
    display: flex;
    justify-content: center;
    margin-top: 20px;
    font-family: "Lato", sans-serif;
    font-weight: 400;
    color: #ffffff;
  }
`;

const Content = styled.div`
  display: flex;
  justify-content: space-between;
`;

const Left = styled.div`
  .alert {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    padding: 10px;
    .alertItem {
      font-size: 20px;
      color: red;
    }
  }
`;

const Right = styled.div``;
