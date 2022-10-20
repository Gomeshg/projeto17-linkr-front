import { useState } from "react";
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import styled from 'styled-components';

import UserContext from '../parts/UserContext';
import ResetStyled from '../reset/reset';
import GlobalStyle from "../styles/GlobalStyles";

import CreatCont from '../CreatCont';
import Initial from '../Initial';
import Enter from '../Enter';
import Timeline from "./pages/timelinePage/Timeline";

export default function App() {
    const [user, setUser] = useState([]); 
    
    useEffect( () => {
        const token = JSON.parse(localStorage.getItem('linkr'))

        if(token) console.log(token)

    }, []);

   
    return (
        <>
            <UserContext.Provider value={{ user, setUser }}>
                <ResetStyled />
                <GlobalStyle />
                <Wrapper>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Enter/>} />
                            <Route path="/signup" element={<CreatCont />} />
                            <Route path="/timeline" element={<Timeline />} />
                            {/*<Route path='/Novo-recebido' element={<NewValue optional={true} />} /> 
                            <Route path='/Editar-entrada' element={<ModifiValue optional={true} />} /> 
                            <Route path='/Editar-saida' element={<ModifiValue optional={false} />} />  */}
                        </Routes>
                    </BrowserRouter>
                </Wrapper>
            </UserContext.Provider>
        </>
    );
}
const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    height: 100vh;
    background-color: #333333;
`;