import styled from "styled-components";
import { useEffect, useState } from "react";
import { getLink } from "../../services/linkr";

import Header from "../common/Header";
import TimelineLinks from "../common/TimelineLinks";
import { useParams } from "react-router-dom";

export default function Hashtag() {
  const [links, setLinks] = useState(null);

  useEffect(() => {
    getLink()
      .then((res) => {
        setLinks(res.data);
      })
      .catch((e) => {
        alert(
          "An error occured while trying to fetch the posts, please refresh the page"
        );
      });
  }, []);

  const { hashtag } = useParams();

  return (
    <Screen>
      <Header />
      <PageTitle># {hashtag}</PageTitle>
      {links !== null
        ? links.map((link, index) => <TimelineLinks key={index} links={link} />)
        : "Loading..."}
    </Screen>
  );
}

const Screen = styled.div``;

const PageTitle = styled.div`
  width: 925px;
  height: 160px;
  padding: 130px 0 15px 0;
  font-family: "Oswald", sans-serif;
  font-weight: 700;
  font-size: 45px;
  color: #ffffff;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;