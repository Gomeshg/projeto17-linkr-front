import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
/* Rules to specify families:
font-family: 'Lato', sans-serif;
font-family: 'Oswald', sans-serif;
font-family: 'Passion One', cursive;
 */
.pageTitle {
    width: 925px;
    height: 160px;
    padding: 130px 0 15px 0;

    font-family: 'Oswald', sans-serif;
    font-weight: 700;
    font-size: 45px;
    color: #ffffff;

    display: flex;
    justify-content: flex-start;
    align-items: center;
}
.timelineBody {
    display: flex;
    justify-content: center;
    margin-top: 45px;
    position: absolute;
}
.postsBody {
    display: flex;
    flex-direction: column;
    position: relative;
    padding-right: 25px;
}
`;

export default GlobalStyle;
