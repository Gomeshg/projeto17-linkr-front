import { useEffect, useContext, useState } from "react";
import UserContext from "../../../parts/UserContext";
import { getUsersFiltered } from "../../services/linkr";

export default function Comment(commentObj) {
    const { user } = useContext(UserContext);
    const comment = commentObj.commentObj.comment;
    const userName = commentObj.commentObj.userName;
    const pictureUrl = commentObj.commentObj.pictureUrl;
    const [usersFiltered, setUsersFiltered] = useState(false);

    useEffect(() => {
        renderUsersFiltered()
    })

    async function renderUsersFiltered(){
        try {
            const res = await getUsersFiltered(user.token,commentObj.commentObj.userName);
            
            setUsersFiltered(res.data[0].following);            
        } catch(err) {
            console.log(err);
        }
    }

    return (
        <>
            <div>
                <img src={pictureUrl} alt="idoso nervoso" className="miniProfileIcon" ></img>
                <div>
                    <span className="authorName">{userName}</span>
                    {(userName === commentObj.linkUserName) ? <span className="authorClass"> • Post`s author</span>
                        : ""}
                    {(user.userName != commentObj.linkUserName) ? 
                        [usersFiltered ? <span className="authorClass"> • Follower</span>
                            : ""] 
                        : ""
                    }
                    
                    <h3 className="authorComment">{comment}</h3>
                </div>
            </div>
            <span className="separationBar"/>
        </>
    )
};