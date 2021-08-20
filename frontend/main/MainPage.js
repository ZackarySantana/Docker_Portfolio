import React from "react";
import styled from "styled-components";

import TopBar from "./TopBar";
import MainContent from "./MainContent";

const Wrapper = styled.div`
  width: 100vw;
  max-width: 100vw;
  height: 100vh;
  max-height: 100vh;
  background-color: gray;
`;

export default function MainPage() {
  return (
    <Wrapper>
      <TopBar />
      <MainContent />
    </Wrapper>
  );
}
