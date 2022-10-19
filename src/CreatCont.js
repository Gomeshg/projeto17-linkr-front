import { Button, Input, Linkers, Container } from './parts/Subparts';
import { useNavigate } from 'react-router-dom';
import { postCreat } from './parts/linker';
import styled from 'styled-components';
import { useState } from 'react';

export default function CreatCont() {
    const [personalDate, setPersonalDate] = useState({});
    const [boolean, setBoolean] = useState(false);
    const navigat = useNavigate()
    function submitobj(event) {
        event.preventDefault();
        if(boolean) return 
        const { name, email, password, pictureUrl } = personalDate;
        setBoolean(!boolean);
        const i = postCreat({ name: name, email: email, password: password, pictureUrl: pictureUrl });
        i.then(sucess);
        i.catch(err);
    }


    function err(value) {
        setBoolean(boolean)
        return alert(value.response.data === "Conflict" ? "Email já cadastrado" :  value.response.data );
    }
    function sucess() {
        alert("Parabéns, cadastro concluído");
        navigat("/")
        return;
    }

    return (
        <AllContainer>
            <p> Shortly <img src={''} /> </p>
            <form onSubmit={submitobj}>
                <Input type={"email"} background={boolean} placeholder={"E-mail"} onChange={e => setPersonalDate({ ...personalDate, email: e.target.value })} readOnly={boolean} required="required" />
                <Input type={"password"} background={boolean} placeholder={"Password"} onChange={e => setPersonalDate({ ...personalDate, password: e.target.value })} readOnly={boolean} required="required" />
                <Input type={"text"} background={boolean} placeholder={"Username"} onChange={e => setPersonalDate({ ...personalDate, name: e.target.value })} readOnly={boolean} required="required" />
                <Input type={"url"} background={boolean} placeholder={"Picture url"} onChange={e => setPersonalDate({ ...personalDate, pictureUrl: e.target.value })} readOnly={boolean} required="required"/>
                <Button type={"submit"} width={"200px"} bolean={boolean} heigt={"50px"} > Sign Up  </Button> 
                <Linkers to={"/signin"}> Switch back to Log In</Linkers> 
            </form>
             
        </AllContainer>
    )
}
const AllContainer = styled.div`
    padding: 50px ;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    form{
        margin: 30px ;
        width: 80%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    
    }
    span{
    width: 100% ;
    display:flex ;
    justify-content: flex-end ;
}
    p{
        font-size: 64px ;
        color: #000000;
        display: flex;
        align-items: center;
}


    `;