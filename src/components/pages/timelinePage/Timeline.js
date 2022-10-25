import styled from "styled-components";
import { useEffect, useState } from "react";
import { getLink } from "../../services/linkr";

import LinkShare from "./LinkShare";
import Header from "../common/Header";
import TimelineLinks from "../common/TimelineLinks";
import Trendings from "../common/Trendings";

export default function Timeline() {
  const [loading, setLoading] = useState(true);
  const [links, setLinks] = useState([]);
  const token = JSON.parse(localStorage.getItem("linkr"));

  // async function reloading() {
  //   getLink(token.token)
  //     .then((res) => {
  //       setLoading(false);
  //       setLinks(res.data);
  //     })
  //     .catch(() => {
  //       alert(
  //         "An error occured while trying to fetch the posts, please refresh the page"
  //       );
  //     });
  // }
  useEffect(() => {

    getLink(token.token)
      .then((res) => {
        setLoading(false);
        setLinks(res.data);
      })
      .catch(() => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, []);

  console.log(links);
  
  return (
    <TimelineScreen>
      <Header />

      <div className="pageTitle"> timeline </div>

      <Content>
        <Left>
          <LinkShare />

          {loading ? (
            <h3 className="noLinks">Loading...</h3>
          ) : (
            [
              links.lenght === 0 ? (
                <h3 className="noLinks">There are no posts yet</h3>
              ) : (
                links.map((links) => (
                  <TimelineLinks
                    links={links}
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

const Left = styled.div``;

const Right = styled.div``;
