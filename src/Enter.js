import {Button , Input, Linkers} from "./parts/Subparts";
import { useNavigate } from "react-router-dom";
import UserContext from './parts/UserContext';
import { useState, useContext } from "react";
import { postLogin } from "./parts/linker";
import styled from "styled-components";


export default function Enter(){
    const {user ,setUser} = useContext(UserContext);
    const [loginDate , setLogindate] = useState({});
    const [boolean , setBoolean] = useState(false);
    const navigat = useNavigate()

   

    function login(event){
        event.preventDefault();
        if(boolean) return 
        setBoolean(!boolean)
        const obj= {
            email: loginDate.email,
            password: loginDate.password
        } 
        postLogin(obj).catch(err).then(sucess);
        
    }
    function sucess(value){
        localStorage.setItem('linkr', JSON.stringify(value.data));
        
        setUser(value.data);

        return navigat('/')
    }
    function err(value){
        setBoolean(boolean);
        return alert(value);
    }
    return(

        <Container>   
            <p> Linker </p>
            <form onSubmit={login} >      
                <Input type={"email"} background={boolean} placeholder={"E-mail"} onChange={e => setLogindate({...loginDate, email: e.target.value })} required readOnly={boolean}/> 
                <Input type={"password"} background={boolean} placeholder={"Senha"} onChange={e => setLogindate({...loginDate, password: e.target.value }) }  required readOnly={boolean}/>
                <Button type={"submit"} width={"200px"} bolean={boolean} heigt={"50px"} > Entrar </Button>
                <Linkers to={"/signup"}> First time? Create an account!</Linkers>
            </form>
        </Container> 
    )

}

const Container = styled.div`
    padding: 20px ;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    
    form{
        margin-top: 15px;
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

