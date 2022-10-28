import styled from "styled-components";

export default function UserProfileLinks({ links, isUserProfile }) {
  // Falta entender porque o isUser funciona assim que da ctrl+s em userPage, mas ai quando testa atualizando a url nao funciona mais e fica sempre false

  // console.log(isUserProfile)
  // console.log(links)

  return (
    <>
      É O PERFIL DO USUARIO?
      {isUserProfile ? "É" : "NAO É"}
      {links.url}
    </>
  );
}

// {loading ? (
//   <h3 className="noLinks">Loading...</h3>
// ) : (
//   [
//     links.lenght === 0 ? (
//       <h3 className="noLinks">There are no posts yet</h3>
//     ) : (
//       links.map((link => (
//           <UserProfileLinks
//           isUserProfile={isUserProfile}
//           link={link}

//           />
//       ))
//     )),
//   ]
// )}
