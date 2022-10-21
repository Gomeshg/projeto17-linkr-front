import styled from "styled-components";

export default function Trendings() {
  const data = [
    {
      id: 1,
      tag: "react",
    },
    {
      id: 2,
      tag: "react",
    },
    {
      id: 3,
      tag: "react",
    },
    {
      id: 4,
      tag: "react",
    },
  ];

  return (
    <Screen>
      <section>
        <Title>trending</Title>
      </section>

      <section>
        {data.map((item) => (
          <Hashtag># {item.tag}</Hashtag>
        ))}
      </section>
    </Screen>
  );
}

const Screen = styled.div`
  width: 300px;
  height: 400px;
  border-radius: 16px;
  background-color: #171717;

  display: flex;
  flex-direction: column;
  gap: 10px;

  section {
    padding: 10px;
  }
  section:nth-child(1) {
    border-bottom: 1px solid white;
  }
  section:nth-child(2) {
    display: flex;
    flex-direction: column;
    gap: 5px;
  }
`;

const Title = styled.p`
  font-size: 23px;
  color: white;
  font-weight: 700;
  font-family: sans-serif;
`;

const Hashtag = styled.p`
  font-size: 13;
  color: white;
  font-weight: 400;

  font-family: sans-serif;
`;
