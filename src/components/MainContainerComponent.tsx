import React from 'react';

import ContentComponent from './ContentComponent';
import FooterComponent from './FooterComponent';
import { styled } from './FoundationStyles';
import HeaderComponent from './HeaderComponent';
import MainComponent from './MainComponent';
import NavComponent from './NavComponent';

const MainContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100vw;
`;

const MainContainerComponent: React.FC = () => {
  return (
    <MainContainer>
      <HeaderComponent />
      <ContentComponent>
        <NavComponent />
        <MainComponent />
      </ContentComponent>
      <FooterComponent />
    </MainContainer>
  );
};

export default MainContainerComponent;
