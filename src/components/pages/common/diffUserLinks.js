import styled from "styled-components";

export default function UserProfileLinks({link, isUserProfile}) {

  // Falta entender porque o isUser funciona assim que da ctrl+s em userPage, mas ai quando testa atualizando a url nao funciona mais e fica sempre false

  console.log(isUserProfile)
  console.log(link)

  return (
    <>
    É O PERFIL DO USUARIO? 
    {isUserProfile ? "É" : "NAO É"}
    {link.url}
    </>
  )

}