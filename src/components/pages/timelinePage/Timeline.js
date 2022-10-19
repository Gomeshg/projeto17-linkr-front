import styled from "styled-components";

import LinkShare from "./LinkShare";
import Header from "../common/Header";
import TimelineLinks from "../common/TimelineLinks";
import Trendings from "../common/Trendings";

export default function Timeline() {
    return (
        <TimelineScreen>
            <Header />

            <div className="pageTitle"> timeline </div>

            <div className="timelineBody">
                <div className="postsBody">

                    <LinkShare />
                    <TimelineLinks />

                </div>
                
                <Trendings />
            </div>
            
        </TimelineScreen>
    );
};

const TimelineScreen = styled.div`
/* Rules to specify families:
font-family: 'Lato', sans-serif;
font-family: 'Oswald', sans-serif;
font-family: 'Passion One', cursive;
 */


`;