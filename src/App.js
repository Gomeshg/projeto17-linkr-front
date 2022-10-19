import { BrowserRouter, Routes, Route } from 'react-router-dom';
import UserContext from './parts/UserContext';
import { useState } from "react";
import {useEffect } from "react";
import ResetStyled from './reset/reset';
import styled from 'styled-components';
import CreatCont from './CreatCont';
import Initial from './Initial';
import Enter from './Enter';

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
                <Wrapper>
                    <BrowserRouter>
                        <Routes>
                            <Route path='/' element={<Enter/>} />
                            <Route path="/signup" element={<CreatCont />} />
                            {/*<Route path="/" element={<Initial />} />
                            <Route path='/Novo-recebido' element={<NewValue optional={true} />} /> 
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
    justify-content: center ;
    height: 100vh;
`;