import styled from "styled-components";
import { useEffect, useState, useContext } from "react";
import UserContext from "../../../parts/UserContext";
import { getLinksFilteredByUser, getUserName} from "../../services/linkr";
import { useParams } from "react-router-dom";

import Header from "../common/Header";
import UserProfileLinks from "../common/diffUserLinks.js";
import Trendings from "../common/Trendings";

export default function UserPage(){

    const [loading, setLoading] = useState(true);
    const { user } = useContext(UserContext)
    const [isUserProfile, setIsUserProfile] = useState(false);
    const [links, setLinks] = useState([]);
    const [username, setUsername] = useState([]);

    const params = useParams();
    const id = params.id;

    const token = JSON.parse(localStorage.getItem("linkr"));

    function isItUserProfile(){
        if (id==user.id){
            setIsUserProfile(true);
        } else {
            setIsUserProfile(false);
        }
    }

    useEffect(() => {

        isItUserProfile()

        getLinksFilteredByUser(token.token,id)
          .then((res) => {
            setLoading(false);
            setLinks(res.data);
          })
          .catch(() => {
            alert(
              "An error occured while trying to fetch the posts, please refresh the page"
            );
          });
        

        getUserName(token.token, id)
        .then((res) => {
            console.log(res.data[0].userName)
            setUsername(res.data[0])
        })
        .catch(() => {
          alert(
            "An error has occured while trying to fetch the posts, please refresh the page"
          );
        });
        
        console.log(links);
      }, []);

    return (
    <TimelineScreen>
      <Header />
      <div className="pageTitle"> {username.length===0?"Fulano":username.userName}'s posts </div>
      <Content>
        <Left>
          {loading ? (
            <h3 className="noLinks">Loading...</h3>
          ) : (
            [
              links.lenght === 0 ? (
                <h3 className="noLinks">There are no posts yet</h3>
              ) : (
                links.map((link => (
                    <UserProfileLinks
                    isUserProfile={isUserProfile} 
                    link={link}/>
                ))
              )),
            ]
          )}
        </Left>
        <Right>
          <Trendings />
        </Right>
      </Content>
    </TimelineScreen>
  )
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
