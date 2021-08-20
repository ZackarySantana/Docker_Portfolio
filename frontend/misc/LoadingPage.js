import React from "react";
import styled from "styled-components";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default function LoadingPage() {
  return (
    <>
      <Container>
        <h1>Loading</h1>
      </Container>
    </>
  );
}
