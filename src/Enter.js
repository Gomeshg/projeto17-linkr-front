import {Button , Input, Linkers} from "./parts/Subparts";
import { useNavigate } from "react-router-dom";
import UserContext from './parts/UserContext';
import { useState, useContext, useEffect } from "react";
import { postLogin, getUserValidation } from "./parts/linker";
import styled from "styled-components";


export default function Enter(){
    const {user ,setUser} = useContext(UserContext);
    const [loginDate , setLogindate] = useState({});
    const [boolean , setBoolean] = useState(false);
    const navigat = useNavigate()

    useEffect( () => {
        const token = JSON.parse(localStorage.getItem('linkr'))

        if(token) getUserValidation(token.token).then((value)=>{setUser({...user, ...value.data}); navigat('/timeline') })

    }, []);



   

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
        console.log(value.data)
        getUserValidation(value.data.token).then((value)=>{setUser({...user, ...value.data}); navigat('/timeline') }).catch(err)
        
    }
    function err(value){
        setBoolean(boolean);
        return alert(value);
    }
    return(

        <Container>   
            <p> 
                <h1>
                    linkr
                    <h2>save, share and discover<br/> the best links on the web</h2>    
                </h1>
            </p>
            
            
            <form onSubmit={login} >      
                <Input type={"email"} background={boolean} placeholder={"e-mail"} onChange={e => setLogindate({...loginDate, email: e.target.value })} required readOnly={boolean}/> 
                <Input type={"password"} background={boolean} placeholder={"passoword"} onChange={e => setLogindate({...loginDate, password: e.target.value }) }  required readOnly={boolean}/>
                <Button type={"submit"} width={"100%"} bolean={boolean} heigt={"50px"} > Log In </Button>
                <Linkers to={"/signup"}> First time? Create an account!</Linkers>
            </form>
        </Container> 
    )

}

const Container = styled.div`
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    h1{

        font-family: 'Passion One';
        font-style: normal;
        font-weight: 700;
        font-size: 106px;
        line-height: 117px;
        letter-spacing: 0.05em;
        color: #FFFFFF;
        width: 80% ;
    }
    
    h2{
        font-family: 'Oswald';
        font-style: normal;
        font-weight: 700;
        font-size: 43px;
        line-height: 64px;
        color: #FFFFFF;


    }

    p{
        display: flex ;
        align-items: center ;
        justify-content: center ;
        background-color: #151515 ;
        height: 100% ;
        width:70% ;

    }

    
    
    form{
        padding: 20px ;
        margin-top: 15px;
        width: 30%;
        display: flex;
        justify-content: center;
        align-items: center;
        flex-wrap: wrap;
    
    }
   
    

    `;

