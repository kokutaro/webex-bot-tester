import React from 'react';

import { styled } from './FoundationStyles';

const Header = styled.header`
  background-color: ${(p): string => p.theme['$color-primary-0']};
  color: ${(p): string => p.theme.FOREGROUND_REVERSE};
  height: 55px;
  box-shadow: 0px 0px 5px 1px rgb(90, 90, 90);
  flex-direction: row;
  z-index: 10;
`;

const HeaderText = styled.h1`
  font-size: 150%;
`;

const HeaderComponent: React.FC = () => {
  return (
    <Header>
      <HeaderText>Header</HeaderText>
    </Header>
  );
};

export default HeaderComponent;
